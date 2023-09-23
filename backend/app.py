import re
from flask import Flask, jsonify, request, redirect, render_template
from flask_cors import CORS
from database import Opcion, Producto, Restaurante, Seleccion_disponible, Usuario, Categoria, TipoUsuario
from database import db
from passlib.hash import sha256_crypt
from sqlalchemy.orm import joinedload

app = Flask(__name__)
app.secret_key = "klNmsS679SDqwpñl"
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Hola''@localhost/dashdiner'


@app.route('/')
def home():
    return jsonify('hola mundo')

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


@app.route('/registro_admin', methods=['GET', 'POST'])
def registro_admin():
    if request.method == 'GET':
        return render_template('registro_admin.html')  
    if request.method == 'POST':
        valor = request.form['enviar']
       
        if valor == "enviar":
                username = request.form['username']
                nombre = request.form['nombre']
                apellido = request.form['apellido']
                correo = request.form['correo']
                celular = request.form['celular']
                rfc = request.form['rfc']
                password = request.form['password']
                tipo = 'admin'

                if not verificar_password(password):
                  print('La contraseña debe tener al menos una mayúscula, una minúscula, un número, un carácter especial y longitud mayor a 8.')
                  return jsonify("error en el password") 


                password_encriptada = sha256_crypt.hash(password)

                nuevo_usuario = Usuario(
                    nombre_usuario=username,
                    correo=correo,
                    password=password_encriptada,
                    celular=celular,
                    nombre=nombre,
                    apellido=apellido,
                    rfc=rfc,
                    tipo=tipo
                )

                if celular.isdigit() and len(celular) == 10:
                    try :
                        db.session.add(nuevo_usuario)
                        db.session.commit()
                        usuario = db.session.execute(db.select(Usuario)).all()
                        lista_usuario = []
                        for r in usuario:
                            usuario1 = convertir_a_dict(r[0])
                            lista_usuario.append(usuario1)

                        nombres_usuarios = []
                        id = nuevo_usuario.id

                        for usuario_dict in lista_usuario:
                            nombre_usuario = usuario_dict.get("nombre_usuario")  # Obtener el nombre de usuario del diccionario
                            if nombre_usuario:
                                nombres_usuarios.append(nombre_usuario)
                                
                        return redirect(f"/registro_restaurante/{id}")
                        #return render_template("registro_restaurante.html",id= nuevo_usuario.id)
                    

                    except Exception as e:
                        print(e)
                        
                        return jsonify("error") 
                else:
                    print(len(celular))
                    return jsonify(celular,"no es celular")
                    

@app.route('/registro_restaurante/<int:id_usuario>', methods=['GET', 'POST'])
def registro_restaurante(id_usuario):
    if request.method == 'GET':
        print(id_usuario)
        return render_template('registro_restaurante.html', id = id_usuario)  
    if request.method == 'POST':
        valor = request.form['enviar']
        if valor == "enviar":
                id_user = id_usuario
                nombre = request.form['nombre']
                descripcion = request.form['descripcion']
                logo = request.form['logo']
                horario = request.form['horario']
                celular = request.form['celular']
                direccion = request.form['direccion']
                nuevo_restaurante = Restaurante(
                    id_usuario=id_user,
                    nombre=nombre,
                    descripcion=descripcion,
                    logo=logo,
                    horario=horario,
                    celular=celular,
                    direccion=direccion
                )
                if celular.isdigit() and len(celular) == 10:
                    try :
                        db.session.add(nuevo_restaurante)
                        db.session.commit()
                        return redirect("/restaurantes")
                    except Exception as e:
                        print(e)   
                        return jsonify("error")
                else:
                    print(len(celular))
                    return jsonify(celular,"no es celular")
                
                

def convertir_a_dict(resultado)->dict:
    dict_resultado = vars(resultado)
    dict_resultado.pop('_sa_instance_state')
    return dict_resultado

def verificar_password(password)->bool:
       # Verificar si la contraseña tiene al menos una mayúscula
    if len(password) >8:
        if not re.search(r'[A-Z]', password):
            return False

        # Verificar si la contraseña tiene al menos una minúscula
        if not re.search(r'[a-z]', password):
            return False

        # Verificar si la contraseña tiene al menos un número
        if not re.search(r'[0-9]', password):
            return False

        # Verificar si la contraseña tiene al menos un carácter especial
        if not re.search(r'[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]', password):
            return False
        
        else:
            return True
    else:
        return False






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

        
    app.run()


if __name__ == "__main__":
    main()