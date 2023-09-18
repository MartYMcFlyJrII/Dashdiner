import enum
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class TipoUsuario(enum.Enum):
    admin = 'admin'
    cliente = 'cliente'
class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre_usuario = db.Column(db.String(100), unique=True, nullable=False)
    correo = db.Column(db.String(100),unique=True, nullable=False)
    password = db.Column(db.String(100),nullable=False)
    celular = db.Column(db.String(100))
    nombre = db.Column(db.String(100),nullable=False)
    apellido = db.Column(db.String(100),nullable=False)
    rfc = db.Column(db.String(100),nullable=True)
    tipo = db.Column(db.Enum(TipoUsuario),nullable=False)

class Restaurante(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id'))
    nombre = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.String(100),nullable=False)
    logo = db.Column(db.String(100))
    horario = db.Column(db.String(100),nullable=False)
    direccion = db.Column(db.String(100),nullable=False)


class Categoria(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_restaurante = db.Column(db.Integer, db.ForeignKey('restaurante.id'),nullable=False)
    nombre = db.Column(db.String(100), nullable=False)

class Producto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_restaurante = db.Column(db.Integer, db.ForeignKey('restaurante.id'),nullable=False)
    id_categoria = db.Column(db.Integer,db.ForeignKey('categoria.id'), nullable=False)
    nombre = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.String(100),nullable=False)
    imagen = db.Column(db.String(100))
    precio = db.Column(db.Double,nullable=False)
    estado = db.Column(db.Boolean,nullable=False)
    
class Opcion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    multiple = db.Column(db.Boolean,nullable=False)
    
class Producto_Opcion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_producto = db.Column(db.Integer,db.ForeignKey('producto.id'))
    id_opcion = db.Column(db.Integer,db.ForeignKey('opcion.id'))
    
class Seleccion_disponible(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_opcion = db.Column(db.Integer,db.ForeignKey('opcion.id'))
    nombre = db.Column(db.String(100), nullable=False)
    precio = db.Column(db.String(100),nullable=False)
    estado = db.Column(db.Boolean,nullable=False)
    

class Restaurantes_favoritos(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_restaurante = db.Column(db.Integer,db.ForeignKey('restaurante.id'))
    id_usuario = db.Column(db.Integer,db.ForeignKey('usuario.id'))

class Productos_favoritos(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_producto = db.Column(db.Integer,db.ForeignKey('producto.id'))
    id_usuario = db.Column(db.Integer,db.ForeignKey('usuario.id'))

class Orden(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer,db.ForeignKey('usuario.id'))
    id_restaurante = db.Column(db.Integer,db.ForeignKey('restaurante.id'))
    fecha = db.Column(db.Date, nullable=False)
    precio_total = db.Column(db.Double,nullable=False)

class Items_orden(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_orden = db.Column(db.Integer,db.ForeignKey('orden.id'))
    id_producto = db.Column(db.Integer,db.ForeignKey('producto.id'))
    cantidad = db.Column(db.Integer)
    comentarios = db.Column(db.String(100))
    precio_total = db.Column(db.Double,nullable=False)