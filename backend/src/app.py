from flask import Flask, jsonify, request
from flask_cors import CORS
from database import db, Usuario
from passlib.hash import sha256_crypt
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:''@localhost/dashdiner'


@app.route('/')
def home():
    return jsonify('hola mundo')


@app.route('/login', methods=['POST'])
def login():
    """
    Este método sirve para checar si el usuario que se quiere
    logear exista en la base de datos
    """
    data = request.get_json()
    correo = data.get('correo')
    password = data.get('password')
    usuario_existente = Usuario.query.filter_by(correo=correo).first()
    print('Correo Electrónico:', correo)
    print('Contraseña:', password)
    if usuario_existente:
        if sha256_crypt.verify(usuario_existente.password, password):            
            return jsonify({'mensaje': 'El usuario existe y contraseña correcta'})
        else:
            return jsonify({'mensaje': 'El usuario existe pero contraseña incorrecta'})
    else:
        return jsonify({'mensaje': 'El usuario no existe'})


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