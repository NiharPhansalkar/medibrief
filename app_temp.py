from flask import Flask, request, jsonify
from flask_cors import CORS
import pytesseract
from PIL import Image
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Ensure the upload folder exists
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
pytesseract.pytesseract.tesseract_cmd = r"C:/Program Files/Tesseract-OCR/tesseract.exe"
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

if __name__ == '__main__':
    print("Starting Flask server on http://localhost:5000")
    app.run(host='localhost', port=5000, debug=True)
