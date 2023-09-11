from random import randint
from flask import Flask, jsonify, render_template, request, session, redirect, flash
from flask_cors import CORS
from passlib.hash import sha256_crypt
from bd_functions import *
from functions import *
import re
app = Flask(__name__)
CORS(app)


@app.route('/')
def home():
    return jsonify('hola mundo')



@app.context_processor
def handle_context():
    """Controla lo información mostrada dependiendo de si el usuario esta logged_in y sus permisos"""
    # if 'logged_in' in session.keys():
    #     if session['logged_in']:
    #         #accesos = diccionario_menu[session['type']]  Cambiar los accesos por el tipo de usuario

    #         # return render_template("index.html", accesos=accesos, log=['Log Out', '/logout'], usuario=usuario)
    #         return {'accesos': accesos, 'logged_in': 'yes'}
    #     else:
    #         return {'logged_in': 'no'}
    # else:
    #     return {'logged_in': 'no'}
    
    
@app.route('/login', methods=['GET', 'POST'])
def login():
    """
    Este método sirve para checar si el usuario que se quiere
    logear exista en la base de datos
    """
    if request.method == 'GET':
        return render_template("login.html")
    elif request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        if user_exists('email', email):
            usr = get_user('email', email)
            # password = sha256_crypt.encrypt(str(password))
            if sha256_crypt.verify(password, usr['password_usr']):
                session.clear()
                session['id_user'] = usr['id_user']
                session['name'] = usr['name']
                session['email'] = usr['email']
                session['logged_in'] = True
                session['user_type'] = usr['user_type']
                return redirect("/")
            else:
                msg = 'Incorrect password'
                flash(msg)
                return render_template("login.html")
        else:
            msg = 'This user does not exist, pls sign up'
            flash(msg)
            return render_template("login.html")

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if 'logged_in' not in session.keys():
        if request.method == 'GET':
            return render_template("signup.html")
        elif request.method == 'POST':
            email = request.form['email']
            if user_exists('email', email):
                flash('The email is already in use, pls try again')
                #return render_template("signup.html")
                return redirect('/signup')
            password = request.form['password1']
            password2 = request.form['password2']
            if password != password2:
                flash('The passwords do not match, pls try again')
                return render_template("signup.html")

            elif not re.match(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*[\{\}\[\]\-\+\.\(\)])[^\s]{12,}$', password):                
                flash("The password does not meet the requirements:")
                if not re.match(r'^[^\s]{12,}$', password):                    
                    flash("At least 12 characters long.")                
                    flash("The password cannnot contain spaces.")              
                #mayúscula
                if not any(char.isupper() for char in password):
                    flash("At least one uppercase letter.")             
                #minúscula
                if not any(char.islower() for char in password):
                    flash("At least one lowercase letter.")
                #
                if not re.match(r'^(?=.*[\{\}\[\]\-\+\.\(\)])', password):       
                    flash("The password must contain at least one of the following characters: {}[]-+().") 
                     
                return render_template("signup.html")
            else:
                name = request.form['name']
                last_name = request.form['last_name']
                phone_number = request.form['phone_number']
                user_type = 'client'
                # insertar_usuario(name, last_name, apellido_materno, email, sha256_crypt.hash(password),
                #                  phone_number, tipo_usuario)               
                msg = f'Se envió un código de confirmación a su email a ({email})'
                code = ''
                for i in range(4):
                    number = randint(0, 9)
                    code += str(number)
                session['usuario_code'] = email
                session['code'] = code
                # MANDAR code POR email DE LA PERSONA
                send_email_code('petvetreal@gmail.com', email, 'aozykokpzeaqcnzv', code, 'signup')            
                flash(msg)
                session['bool']=True
                session['name']=name 
                session['last_name']=last_name           
                session['password']=password
                session['phone_number']=phone_number
                session['user_type']=user_type
                
                return redirect('/reset_code')
                
    else:
        return redirect("/")

@app.route("/forgot_password", methods=['GET', 'POST'])
def forgot_password():
    """Controla restablecer contraseña.
    Se asegura que no haya una sesion iniciada.
    Se confirma que el usuario exista y se envia un code de recuperación.
    Se redirige a reset_code"""
    if 'logeado' not in session.keys():
        if request.method == 'GET':
            return render_template("forgot_password.html")
        elif request.method == 'POST':
            email = request.form['email']
            usr = get_user('email', email)
            if user_exists('email', email):
                email = usr['email']
                msg = f'Se envió un código para cambiar la contraseña a su email ({email})'
                code = ''
                for i in range(4):
                    number = randint(0, 9)
                    code += str(number)
                session['user_code'] = usr['email']
                session['code'] = code
                session['bool']= False
                # MANDAR code POR email DE LA PERSONA
                send_email_code('petvetreal@gmail.com', usr['email'], 'aozykokpzeaqcnzv', code, 'password')
                flash(msg)
                return redirect('/reset_code')
            else:
                msg = 'El email o usuario no está registrado'
                flash(msg)
                return render_template("forgot_password.html")
    else:
        return redirect("/")


@app.route("/reset_code", methods=['GET', 'POST'])
def reset_code():
    """ Se asegura que el code sea correcto.1|
    Se redirige para cambiar contraseña a '/new_password'"""
    if 'logeado' not in session.keys() and ('usuario_code' in session):
        if request.method == 'GET':
            return render_template('reset_code.html')
        elif request.method == 'POST':
            if 'usuario_code' in session: 
                code_user = request.form['code']
                username = session['user_code']
                code = session['code']
                if code_user == code and session['bool']==False:
                    return redirect('/new_password')
                elif code_user == code and session['bool']:
                    insert_user(session['name'], session['last_name'], username, sha256_crypt.hash(session['password']),
                                    session['phone_number'], session['user_type']) 
                    msg = 'Se ha registrado correctamente'
                    flash(msg)         
                    return redirect('/login')
                
                else:
                    msg = 'code Incorrecto, pruebe de nuevo'
                    flash(msg)
                    return render_template('reset_code.html')
            else:
                return redirect("/")
    else:
        return redirect("/")


@app.route("/new_password", methods=['GET', 'POST'])
def new_password():
    """Permite al usuario introducir su nueva contraseña.
    Si las dos coiciden se guardan los camnios.
    Se redirige a '/password_changed'"""
    if 'logeado' not in session.keys() and ('usuario_code' in session):
        if request.method == 'GET':
            return render_template("new_password.html")
        elif request.method == 'POST':
            password1 = request.form['password1']
            password2 = request.form['password2']
            usr = get_user('email', session['user_code'])
            if password1 == password2:
                # cambiar contraseña
                new_password = sha256_crypt.hash(password1)
                update_user(usr['id_user'], 'password', new_password)
                session.clear()
                return redirect('/login')
            else:
                msg = 'Contraseñas no concuerdan, intente de nuevo'
                flash(msg)
                return render_template("new_password.html")
                
    else:
        return redirect("/")


@app.route("/logout", methods=['GET'])
def logout():
    """Cierra la sesión del usuario borrando el dicc session y lo redirige a index"""
    session.clear()
    return redirect("/")