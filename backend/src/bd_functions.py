from bd_connect import obtain_connection
"""
    Esta clase es para funciones que tengan que ver con la base de datos
"""
def user_exists(column: str, valor: str):
    connection = obtain_connection()
    query = "SELECT id_user FROM users WHERE " + column + "=%s"
    with connection.cursor() as cursor:
        cursor.execute(query, (valor))
        if cursor.fetchone() is None:
            return False
    connection.commit()
    connection.close()
    return True

def insert_user(name, last_name, email, password, phone_number, user_type):
    connection = obtain_connection()
    name = name.title()
    with connection.cursor() as cursor:
        cursor.execute(
            "INSERT INTO users (name,last_name,email,password,phone_number,date_creation,user_type) VALUES (%s, %s, %s, %s, %s, %s,CURDATE(), %s)",
            (name, last_name, email, password, phone_number, user_type))
    connection.commit()
    connection.close()
    
def get_user(column: str, valor: str):
    connection = obtain_connection()
    query = "SELECT * FROM users WHERE " + column + "=%s"
    with connection.cursor() as cursor:
        cursor.execute(query, (valor))
        usuario = cursor.fetchone()
    connection.commit()
    connection.close()
    return usuario

def update_user(user_id: str, column: str, cambio: str):
    connection = obtain_connection()
    query = "UPDATE users SET " + column + " = %s WHERE id_user = %s"
    with connection.cursor() as cursor:
        cursor.execute(query, (cambio, user_id))
    connection.commit()
    connection.close()