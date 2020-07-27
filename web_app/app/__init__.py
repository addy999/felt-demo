import logging
import os
from flask import Flask

app = Flask(__name__)
app.config['DEBUG'] = True

from app import routes


log = logging.getLogger('werkzeug')
log.disabled = True

if __name__ == "__main__":
  os.environ["FLASK_ENV"] = "development"
  app.run()