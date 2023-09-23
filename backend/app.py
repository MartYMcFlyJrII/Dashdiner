from flask import Flask, jsonify
from flask_cors import CORS
from database import Opcion, Producto, Restaurante, Seleccion_disponible, Usuario, Categoria, TipoUsuario
from database import db
from sqlalchemy.orm import joinedload

app = Flask(__name__)
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

        
    app.run()


if __name__ == "__main__":
    main()