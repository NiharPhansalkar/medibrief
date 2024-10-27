import json
import os
import subprocess
import string
import textwrap
import numpy as np
import pandas as pd
from pyspark.ml import Pipeline, PipelineModel
from pyspark.sql import SparkSession
import pytesseract
from PIL import Image
import openai as openai_api  # Alias for OpenAI to avoid namespace conflicts
import base64

import sparknlp
import sparknlp_jsl

from sparknlp.annotator import *
from sparknlp_jsl.annotator import *
from sparknlp.base import *
from sparknlp.util import *
from sparknlp.pretrained import ResourceDownloader
from pyspark.sql import functions as F

from flask import Flask, request, jsonify
from flask_cors import CORS

# Load license keys from local JSON file
with open("C:/Users/HP/Desktop/TextSummarization/license_keys.json") as f:
    license_keys = json.load(f)

# Get the values from the loaded JSON
PUBLIC_VERSION = license_keys["PUBLIC_VERSION"]
JSL_VERSION = license_keys["JSL_VERSION"]
SECRET = license_keys["SECRET"]

# Defining license key-value pairs as local variables
locals().update(license_keys)

# Adding license key-value pairs to environment variables
os.environ.update(license_keys)

# List of packages to install
packages = [
    "pyspark==3.2.3",
    f"spark-nlp=={PUBLIC_VERSION}",
    f"spark-nlp-jsl=={JSL_VERSION}"
]

# Additional index URL
extra_index_url = f"https://pypi.johnsnowlabs.com/{SECRET}"

# Install each package using pip
for package in packages:
    if "spark-nlp-jsl" in package:
        # Construct the pip install command with the extra index URL
        install_command = f"py.exe -m pip install --upgrade {package} --extra-index-url {extra_index_url}"
    else:
        install_command = f"py.exe -m pip install --upgrade {package}"
    # Run the pip install command using subprocess
    subprocess.run(install_command, shell=True)

# Install Spark NLP Display Library for visualization
subprocess.run(["py.exe", "-m", "pip", "install", "spark-nlp-display"])

pd.set_option('display.max_columns', None)
pd.set_option('display.expand_frame_repr', False)
pd.set_option('max_colwidth', None)

params = {"spark.driver.memory":"16G",
          "spark.kryoserializer.buffer.max":"2000M",
          "spark.serializer": "org.apache.spark.serializer.KryoSerializer",
          "spark.driver.maxResultSize":"2000M"}

# Initialize Spark Session
spark = sparknlp_jsl.start(license_keys['SECRET'], params=params)
print ("Spark NLP Version :", sparknlp.version())
print ("Spark NLP_JSL Version :", sparknlp_jsl.version())

# Initialize Spark-NLP components
document_assembler = DocumentAssembler() \
    .setInputCol('text') \
    .setOutputCol('document')

med_summarizer = MedicalSummarizer() \
    .pretrained("summarizer_clinical_jsl_augmented") \
    .setInputCols("document") \
    .setOutputCol("summary") \
    .setMaxNewTokens(300) \
    .setMaxTextLength(1500)

pipeline = Pipeline(stages=[document_assembler, med_summarizer])

model = pipeline.fit(spark.createDataFrame([[""]]).toDF("text"))

# Create Flask app
app = Flask(__name__)
CORS(app)

# Folder to store uploaded files
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Path to Tesseract-OCR executable
pytesseract.pytesseract.tesseract_cmd = r"C:/Program Files/Tesseract-OCR/tesseract.exe"

# OpenAI API key using alias `openai_api`
openai_api.api_key = ""

# Function to encode image to base64
def encode_image(image_data):
    return base64.b64encode(image_data).decode('utf-8')

# Function to process the OpenAI response and clean it
def process_response(response):
    text_content = response.choices[0].message.content.strip()
    cleaned_text = text_content.replace('\n', ' ')  # Replace newline with a space
    return cleaned_text

@app.route('/handwritten-summarize', methods=['POST'])
def handwritten_summ():
    file = request.files['file']  # Changed 'image' to 'file'
    if file:
        image_data = file.read()
        base64_img = f"data:image/png;base64,{encode_image(image_data)}"

        # Call OpenAI API (using alias `openai_api`)
        response = openai_api.chat.completions.create(
            model='gpt-4o',
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "Return the extracted text from the image. Only return text, no JSON."},
                        {"type": "image_url", "image_url": {"url": base64_img}}
                    ],
                }
            ],
            max_tokens=500,
        )

        # Process response and return plain text
        extracted_text = process_response(response)
        return extracted_text, 200  # Return text directly
    return jsonify({'error': 'No image uploaded'}), 400

# Route to handle file upload
@app.route('/noteUpload', methods=['POST'])
def note_upload():
    print("Received a POST request to /noteUpload")

    # Check if a file was uploaded
    if 'file' not in request.files:
        print("Error: No file part in the request")
        return jsonify({'error': 'No file part in the request'}), 400
    
    file = request.files['file']
    print(f"File received: {file.filename}")

    # Check if the file has a valid filename
    if file.filename == '':
        print("Error: No selected file")
        return jsonify({'error': 'No selected file'}), 400

    # Save the file to the upload folder
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    try:
        file.save(file_path)
        print(f"File saved at: {file_path}")
    except Exception as e:
        print(f"Error saving file: {str(e)}")
        return jsonify({'error': f"Error saving file: {str(e)}"}), 500

    try:
        # Use Tesseract OCR to extract text from the image
        print("Attempting to extract text using Tesseract OCR")
        extracted_text = pytesseract.image_to_string(Image.open(file_path))
        print("Text extraction successful")

        # Return the extracted text as a response
        print("Sending response with extracted text")
        return jsonify({'extracted_text': extracted_text}), 200

    except Exception as e:
        print(f"Error during text extraction: {str(e)}")
        return jsonify({'error': str(e)}), 500

    finally:
        # Clean up the saved file
        if os.path.exists(file_path):
            try:
                os.remove(file_path)
                print(f"File {file_path} removed successfully")
            except Exception as e:
                print(f"Error removing file {file_path}: {str(e)}")

# Define endpoint for summarization
@app.route('/summarize', methods=['POST'])
def summarize_text():
    print(request)
    data = request.get_json()
    text = data['text']

    # Use the pre-trained model to summarize the input text
    light_model = model.transform(spark.createDataFrame([(text,)]).toDF("text"))
    light_result = light_model.select("document", "summary").collect()

    # Extract the summarized result
    result_text = light_result[0]['summary']
    return jsonify({"result": result_text})

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=False)
