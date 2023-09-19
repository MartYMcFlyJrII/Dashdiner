from flask import Flask, jsonify
from flask_cors import CORS
from database import db

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:''@localhost/dashdiner'


@app.route('/')
def home():
    return jsonify('hola mundo')

def main():
    db.init_app(app)
    
    # antes de correr la aplicacion, se debe crear la base de datos
    # correr el comando en mysql:
    # create database dashdiner;
    with app.app_context():
        db.create_all()
    app.run()


if __name__ == "__main__":
    main()