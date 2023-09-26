from random import randint
from flask import Flask, jsonify, redirect, request, session
from flask_cors import CORS
from database import Opcion, Producto, Restaurante, Seleccion_disponible, Usuario, Categoria, TipoUsuario
from database import db
from sqlalchemy.orm import joinedload
from funciones import *

app = Flask(__name__)
app.secret_key = 'tostitosconquesotostitosconyogurt'
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
            
            return jsonify({'id':session['usuario_id'], 'tipo':session['tipo'], 'nombre':session['nombre'], 'apellido':session['apellido'], 'nombre_usuario':session['nombre_usuario'],'logeado': True})
        else:
            return jsonify({'logeado': False, 'mensaje': 'Contraseña incorrecta'})
    else:
        return jsonify({'mensaje': 'El usuario no existe', 'logeado': False})

@app.route("/forgot-password", methods=['POST'])
def forgot_password():
    """Controla restablecer contraseña.
    Se asegura que no haya una sesion iniciada.
    Se confirma que el usuario exista y se envia un codigo de recuperación.
    Se redirige a reset_code"""
    data = request.get_json()
    correo = data.get('correo')
    print('Correo Electrónico:', correo)
    usuario_existente = Usuario.query.filter_by(correo=correo).first()
    if usuario_existente:
        correo = usuario_existente.correo
        codigo = ''
        for i in range(4):
            numero = randint(0, 9)
            codigo += str(numero)
        session['codigo'] = codigo
        print('Codigo:', codigo)
        # MANDAR CODIGO POR CORREO DE LA PERSONA
        enviar_correo('dashdiner115@gmail.com', usuario_existente.correo, 'dtel eiej hyjo pkud', codigo)
        return jsonify({'correo': usuario_existente.correo, 'codigo': codigo, 'codigoboolean': True})
    else:
        return jsonify({'mensaje': 'Correo no registrado con este correo', 'codigoboolean': False})


@app.route('/producto', methods = ['POST', 'PUT'])
def guardar_producto():
    if request.method == 'POST':
        data = request.get_json()
        producto = Producto(
    id_restaurante=data['id_restaurante'],
    id_categoria=data['id_categoria'],
    descripcion=data['descripcion'],
    nombre=data['nombre'],
    precio=data['precio'],
    imagen=data['imagen'],
    estado=data['estado'],
    promocion=data['promocion']
)
        db.session.add(producto)
        db.session.commit()

        return jsonify({'mensaje':'La opción se actualizo correctamente'}),200
    elif request.method == 'PUT':
        data = request.get_json()
        producto = Producto.query.filter_by(id=data['id']).first()
        producto.id_restaurante = data['id_restaurante']
        producto.id_categoria = data['id_categoria']
        producto.descripcion = data['descripcion']
        producto.nombre = data['nombre']
        producto.precio = data['precio']
        producto.imagen = data['imagen']
        producto.estado = data['estado']
        producto.promocion = data['promocion']
        # Commit the session again to save the Seleccion_disponible objects
        db.session.commit()
        # 
        return jsonify({'mensaje':'La opción se actualizo correctamente'}),200

@app.route('/categoria', methods = ['POST', 'PUT'])
def guardar_categoria():
    if request.method == 'POST':
        data = request.get_json()
        opcion = Categoria(
    id_restaurante=data['id_restaurante'],
    nombre=data['nombre'],
)
        db.session.add(opcion)
        db.session.commit()

        return jsonify({'mensaje':'La opción se actualizo correctamente'}),200
    elif request.method == 'PUT':
        data = request.get_json()
        cat = Categoria.query.filter_by(id=data['id']).first()
        cat.nombre = data['nombre']
        db.session.commit()
        # 
        return jsonify({'mensaje':'La opción se actualizo correctamente'}),200
    
@app.route('/opcion', methods = ['POST', 'PUT'])
def guardar_opcion():
    if request.method == 'POST':
        data = request.get_json()
        opcion = Opcion(
    id_producto=data['id_producto'],
    titulo=data['titulo'],
    multiple=data['multiple']
)
        db.session.add(opcion)
        db.session.commit()

        for seleccion_data in data['selecciones_disponibles']:
            existing_seleccion = Seleccion_disponible.query.filter_by(id=seleccion_data['id']).first()
    
            if existing_seleccion:
                # Update the existing record if found
                existing_seleccion.precio = seleccion_data['precio']
                existing_seleccion.estado = seleccion_data['estado']
            else:
                seleccion = Seleccion_disponible(
        id_opcion=opcion.id,  # Use the generated 'id' of 'opcion'
        nombre=seleccion_data['nombre'],
        precio=seleccion_data['precio'],
        estado=seleccion_data['estado']
    )
                db.session.add(seleccion)

        # Commit the session again to save the Seleccion_disponible objects
        db.session.commit()
        return jsonify({'mensaje':'La opción se actualizo correctamente'}),200
    elif request.method == 'PUT':
        data = request.get_json()
        opcion = Opcion.query.filter_by(id=data['id']).first()
        opcion.titulo = data['titulo']
        opcion.multiple = data['multiple']

        for seleccion_data in data['selecciones_disponibles']:
            existing_seleccion = Seleccion_disponible.query.filter_by(id=seleccion_data['id']).first()
    
            if existing_seleccion:
                # Update the existing record if found
                existing_seleccion.nombre = seleccion_data['nombre']
                existing_seleccion.precio = seleccion_data['precio']
                existing_seleccion.estado = seleccion_data['estado']
            else:
                seleccion = Seleccion_disponible(
        id_opcion=opcion.id,  # Use the generated 'id' of 'opcion'
        nombre=seleccion_data['nombre'],
        precio=seleccion_data['precio'],
        estado=seleccion_data['estado']
    )
                db.session.add(seleccion)

        # Commit the session again to save the Seleccion_disponible objects
        db.session.commit()
        # 
        return jsonify({'mensaje':'La opción se actualizo correctamente'}),200


@app.route('/eliminar_categoria', methods=['DELETE'])
def delete_categoria():
    try:
        index = request.args.get('index')
        #indexes_list = indexes_to_delete.split(',')

        # Convert the string indexes to integers
        #indexes_to_delete = [int(index) for index in indexes_list]

        # Handle the deletion of items based on the 'indexes_to_delete' array
        # Perform your logic here
        existing = Categoria.query.filter_by(id=index).first()
        db.session.delete(existing)
        db.session.commit()

        response_data = {'message': 'Items deleted successfully'}
        return jsonify(response_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
@app.route('/eliminar_opciones', methods=['DELETE'])
def delete_opciones():
    try:
        indexes_to_delete = request.args.get('indexes')
        #indexes_list = indexes_to_delete.split(',')

        # Convert the string indexes to integers
        #indexes_to_delete = [int(index) for index in indexes_list]

        # Handle the deletion of items based on the 'indexes_to_delete' array
        # Perform your logic here
        for index in indexes_to_delete:
            existing_seleccion = Opcion.query.filter_by(id=index).first()
            db.session.delete(existing_seleccion)
        db.session.commit()

        response_data = {'message': 'Items deleted successfully'}
        return jsonify(response_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
@app.route('/eliminar_selecciones', methods=['DELETE'])
def delete_selecciones():
    try:
        indexes_to_delete = request.args.get('indexes')
        #indexes_list = indexes_to_delete.split(',')

        # Convert the string indexes to integers
        #indexes_to_delete = [int(index) for index in indexes_list]

        # Handle the deletion of items based on the 'indexes_to_delete' array
        # Perform your logic here
        for index in indexes_to_delete:
            existing_seleccion = Seleccion_disponible.query.filter_by(id=index).first()
            db.session.delete(existing_seleccion)
        db.session.commit()

        response_data = {'message': 'Items deleted successfully'}
        return jsonify(response_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

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

@app.route('/restaurante_admin/<int:id_administrador>', methods=['GET'])
def get_restaurante_admin(id_administrador):
    restaurante = db.session.execute(db.select(Restaurante).where(Restaurante.id_usuario == id_administrador)).first()
    restaurante = convertir_a_dict(restaurante[0])
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
    categoria = db.session.execute(db.select(Categoria).where(Categoria.id == id)).first()
    categoria = convertir_a_dict(categoria[0])
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



@app.route('/opcion/<int:id_opcion>',methods=['GET'])
def get_opcion(id_opcion):
    opcion = db.session.query(Opcion).filter_by(id=id_opcion).options(joinedload(Opcion.selecciones_disponibles)).first()
    opcion_dict = {
            "id": opcion.id,
            "id_producto": opcion.id_producto,
            "titulo": opcion.titulo,
            "multiple": opcion.multiple,
            "selecciones_disponibles": [
                {
                    "id": seleccion.id,
                    "nombre": seleccion.nombre,
                    "precio": seleccion.precio,
                    "estado": seleccion.estado,
                }
                for seleccion in opcion.selecciones_disponibles
            ],
        }
    return jsonify(opcion_dict)

@app.route('/opciones/<int:id_producto>',methods=['GET'])
def get_opciones(id_producto):
    opciones_with_selecciones = db.session.query(Opcion).filter_by(id_producto=id_producto).options(joinedload(Opcion.selecciones_disponibles)).all()
    result = []
    for opcion in opciones_with_selecciones:
        opcion_dict = {
            "id": opcion.id,
            "id_producto": opcion.id_producto,
            "titulo": opcion.titulo,
            "multiple": opcion.multiple,
            "selecciones_disponibles": [
                {
                    "id": seleccion.id,
                    "nombre": seleccion.nombre,
                    "precio": seleccion.precio,
                    "estado": seleccion.estado,
                }
                for seleccion in opcion.selecciones_disponibles
            ],
        }
        result.append(opcion_dict)
    return jsonify(result)


def convertir_a_dict(resultado):
    dict_resultado = vars(resultado)
    dict_resultado.pop('_sa_instance_state')
    return dict_resultado

def main():
    db.init_app(app)
    
    # antes de correr la aplicacion, se debe crear la base de datos
    # correr el comando en mysql:
    # create database dashdiner;
    with app.app_context():
        
        db.create_all()
        # user = Usuario(nombre_usuario='john_doe', correo='john@example.com', password='password123', celular='1234567890', nombre='John', apellido='Doe', rfc=None, tipo=TipoUsuario.cliente)
        # db.session.add(user)
        # db.session.commit()
        # restaurante = Restaurante(id_usuario=1, nombre="Pizzeria", descripcion="Description A", horario="9am-5pm", direccion="123 Main St", logo='https://media-cdn.tripadvisor.com/media/photo-s/19/76/f0/71/pizze-varie-di-gianni.jpg',celular='123456789')
        # db.session.add(restaurante)
        # db.session.commit()
        # categoria = Categoria(id_restaurante=1, nombre='Categoria 2')
        # db.session.add(categoria)
        # db.session.commit()
        # producto = Producto(id_restaurante=1, id_categoria=2, nombre="Mexicana", descripcion="Pizza de chorizo, tocino y jalapeño", precio=10.0, estado=True, promocion=True, imagen='https://mandolina.co/wp-content/uploads/2023/07/pizza-mexciana.png')    
        # db.session.add(producto)
        # db.session.commit()
        # opcion = Opcion(id_producto=1, titulo="Elige el tamaño:", multiple=False)    
        # db.session.add(opcion)
        # db.session.commit()
        # seleccion = Seleccion_disponible(id_opcion=1, nombre="Mediana", precio=0.0, estado=True)    
        # db.session.add(seleccion)
        # db.session.commit()
        # seleccion = Seleccion_disponible(id_opcion=1, nombre="Grande", precio=20.0, estado=True)    
        # db.session.add(seleccion)
        # db.session.commit()
        # seleccion = Seleccion_disponible(id_opcion=1, nombre="Familiar", precio=30.0, estado=True)    
        # db.session.add(seleccion)
        # db.session.commit()

        
    app.run(debug=True)


if __name__ == "__main__":
    main()