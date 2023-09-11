import os
import random
import smtplib, ssl
import string
import time
from email.message import EmailMessage
import locale
from bd_connect import *
import locale
from calendar import monthrange
from datetime import datetime, timedelta


#locale.setlocale(locale.LC_ALL, ("es_ES", "UTF-8"))
"""
    Esta clase es para aquellas funciones que no esten 
    relacionadas a la base de datos
"""

def send_email_code(sender, receiver, password, codigo, tipo):
    if tipo=='password':
        email_subject = 'Código de Cambio de Contraseña'
    elif tipo =='signup':
        email_subject = 'Verifica tu correo'
    sender_email_address = sender
    receiver_email_address = receiver
    email_smtp = "smtp.gmail.com"
    email_password = password

    # Create an email message object
    message = EmailMessage()

    # Configure email headers
    message['Subject'] = email_subject
    message['From'] = sender_email_address
    message['To'] = receiver_email_address

    # Set email body text
    if tipo=='password': # cambiar contraseña
        message.set_content(f"Su código para cambiar su contraseña es {codigo}")
    elif tipo=='signup': # confirmar correo
        message.set_content(f"Su código para confirmar su correo es {codigo}")
    context = ssl.create_default_context()
    # Set smtp server and port
    with smtplib.SMTP_SSL(email_smtp, 465, context=context) as smtp:
        # Login to email account
        smtp.login(sender_email_address, email_password)

        # Send email
        smtp.sendmail(sender_email_address, receiver_email_address, message.as_string())

        # Close connection to server


def mandar_correo_de_password(sender, receiver, password_cuenta_email, password_cuenta_cliente ):
    email_subject = 'Bienvenido a True Beauty'
    sender_email_address = sender
    receiver_email_address = receiver
    email_smtp = "smtp.gmail.com"
    email_password = password_cuenta_email

    # Create an email message object
    message = EmailMessage()

    # Configure email headers
    message['Subject'] = email_subject
    message['From'] = sender_email_address
    message['To'] = receiver_email_address

    # Set email body text
    mensaje = "Gracias por confiar en nostros.\nLa contraseña de su cuenta es: "+password_cuenta_cliente+" .\nInicie sesiion y cambie su contraseña para asegurar la seguridad de su cuenta.\n"

    message.set_content(mensaje)

    context = ssl.create_default_context()
    # Set smtp server and port
    with smtplib.SMTP_SSL(email_smtp, 465, context=context) as smtp:
        # Login to email account
        smtp.login(sender_email_address, email_password)

        # Send email
        smtp.sendmail(sender_email_address, receiver_email_address, message.as_string())

       