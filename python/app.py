from flask import Flask
from flask import request
from main import convert_epub

app = Flask(__name__)

@app.route("/", methods=['POST'])
def hello_world():
  file =  request.files['uploadedFile']
  print(request.args['filename'])
  file.save(file.filename)
  return convert_epub(file.filename)