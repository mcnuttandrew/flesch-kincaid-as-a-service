from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def static_serve():
    return render_template('index.html')

@app.route('/analyze')
def analyze():
    return 'Hello, World!'
