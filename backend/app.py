from flask import Flask, jsonify, redirect, request, session
from flask_cors import CORS
from database import *
from passlib.hash import sha256_crypt
app = Flask(__name__)
app.secret_key = 'tostitosconquesotostitosconyogurt'
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:''@localhost/dashdiner'


@app.route('/')
def home():
    return jsonify('hola mundo')

# GET all restaurantes
@app.route('/restaurantes', methods=['GET'])
def get_all_restaurant():
    restaurantes = db.session.execute(db.select(Restaurante)).all()
    lista_restaurantes = []
    for r in restaurantes:
        restaurante = convertir_a_dict(r[0])
        lista_restaurantes.append(restaurante)
    return jsonify(lista_restaurantes)   

# GET all restaurantes por id
@app.route('/restaurante/<int:id>', methods=['GET'])
def get_restaurante_by_id(id):
    restaurante = db.get_or_404(Restaurante, id)
    restaurante = convertir_a_dict(restaurante)
    return jsonify(restaurante)   

@app.route('/menu/<int:id_restaurante>', methods=['GET'])
def get_menu(id_restaurante):
    productos = db.session.execute(db.select(Producto).where(Producto.id_restaurante == id_restaurante)).all()
    menu = []
    for p in productos:
        prod = convertir_a_dict(p[0])
        menu.append(prod)
    return jsonify(menu)

@app.route('/promociones/<int:id_restaurante>', methods=['GET'])
def get_promociones(id_restaurante):
    productos = db.session.execute(db.select(Producto).where(Producto.id_restaurante == id_restaurante,Producto.promocion == True)).all()
    menu = []
    for p in productos:
        prod = convertir_a_dict(p[0])
        menu.append(prod)
    return jsonify(menu)

@app.route('/menu/<int:id_restaurante>/<int:id_categoria>', methods=['GET'])
def get_menu_por_cateogria(id_restaurante,id_categoria):
    productos = db.session.execute(db.select(Producto).where(Producto.id_restaurante == id_restaurante,Producto.id_categoria==id_categoria)).all()
    menu = []
    for p in productos:
        prod = convertir_a_dict(p[0])
        menu.append(prod)
    return jsonify(menu)
@app.route('/categorias/<int:id_restaurante>', methods=['GET'])
def get_categorias(id_restaurante):
    categorias = db.session.execute(db.select(Categoria).where(Categoria.id_restaurante == id_restaurante)).all()
    lista_categorias = []
    for c in categorias:
        categoria = convertir_a_dict(c[0])
        lista_categorias.append(categoria)
        
    return jsonify(lista_categorias)

@app.route('/categoria/<int:id>', methods=['GET'])
def get_categoria_by_id(id):
    categoria = db.get_or_404(Categoria, id)
    categoria = convertir_a_dict(categoria)
    return jsonify(categoria)   
# GET producto
@app.route('/productos/<int:id_administrador>', methods=['GET'])
def get_all_producto(id_administrador):
    restaurante = db.session.execute(db.select(Restaurante).where(Restaurante.id_usuario == id_administrador)).first()
    restaurante= convertir_a_dict(restaurante[0])
    productos = db.session.execute(db.select(Producto).where(Producto.id_restaurante == restaurante['id'])).all()
    lista_productos = []
    for p in productos:
        producto = convertir_a_dict(p[0])
        lista_productos.append(producto)
        
    return jsonify(lista_productos)

# GET producto by id
@app.route('/producto/<int:id>', methods=['GET'])
def get_producto_by_id(id):
    producto = db.get_or_404(Producto, id)
    producto = convertir_a_dict(producto)
    return jsonify(producto)


def convertir_a_dict(resultado):
    dict_resultado = vars(resultado)
    dict_resultado.pop('_sa_instance_state')
    return dict_resultado

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
        if password==usuario_existente.password:#sha256_crypt.verify(usuario_existente.password, password):  
            session.clear()
            session['usuario_id'] = usuario_existente.id
            session['correo'] = usuario_existente.correo
            session['nombre'] = usuario_existente.nombre
            session['apellido'] = usuario_existente.apellido
            session['tipo'] = usuario_existente.tipo.value
            session['nombre_usuario'] = usuario_existente.nombre_usuario
            session['celular'] = usuario_existente.celular
            session['rfc'] = usuario_existente.rfc
            session['logeado']= True 
            return jsonify({'logeado': True, 'id':session['usuario_id'], 'tipo':session['tipo'], 'nombre':session['nombre'], 'apellido':session['apellido'], 'nombre_usuario':session['nombre_usuario']})
        else:
            return jsonify({'logeado': False, 'mensaje': 'Contraseña incorrecta'})
    else:
        return jsonify({'mensaje': 'El usuario no existe', 'logeado': False})


def main():
    db.init_app(app)
    
    # antes de correr la aplicacion, se debe crear la base de datos
    # correr el comando en mysql:
    # create database dashdiner;
    with app.app_context():
        db.create_all()
    app.run(debug=True)
    



if __name__ == "__main__":
    main()