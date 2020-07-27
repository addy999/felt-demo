import os
import json
from app import app
from flask import render_template, session, request
from .db import *

build_default_db()

@app.route('/')
@app.route('/index')
def index():    
    return render_template('index.html')

@app.route('/getdata', methods = ['GET'])
def get():
    data = get_data()
    return json.dumps(data)

@app.route('/savedata', methods = ['POST'])
def save():
    data = request.form['data']
    print("RX", data)
    write_db(list(data))
    return {}