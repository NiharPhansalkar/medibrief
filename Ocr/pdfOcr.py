import pytesseract
from pdf2image import convert_from_path
from PIL import Image

# Update the path to where Tesseract is installed on your system
pytesseract.pytesseract.tesseract_cmd = r"C:/Program Files/Tesseract-OCR/tesseract.exe"  # For Windows
# pytesseract.pytesseract.tesseract_cmd = '/usr/local/bin/tesseract'  # For macOS
# pytesseract.pytesseract.tesseract_cmd = '/usr/bin/tesseract'  # For Linux

# Function to extract text from an image
def extract_text_from_image(image_path):
    image = Image.open(image_path)
    text = pytesseract.image_to_string(image)
    return text

# Function to extract text from a PDF
def extract_text_from_pdf(pdf_path):
    pages = convert_from_path(pdf_path, 300)  # 300 is the resolution in DPI
    text = ""
    for page in pages:
        text += pytesseract.image_to_string(page) + "/n"
    return text

# Example usage
# image_text = extract_text_from_image('C:/Users/HP/Desktop/TextSummarization/Ocr/image1.png')
# print("Text from image:")
# print(image_text)

pdf_text = extract_text_from_pdf("C:/Users/HP/Downloads/medicalNotes.pdf")
print("Text from PDF:")
print(pdf_text)