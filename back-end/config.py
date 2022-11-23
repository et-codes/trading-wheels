import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SECRET_KEY= os.environ.get('SECRET_KEY') or 'GetYourOwnSecretKey'

    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Flask-sessionstore variables
    SESSION_TYPE = "sqlalchemy"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_SQLALCHEMY_TABLE = "sessions"
