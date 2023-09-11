import pymysql
import os
from dotenv import load_dotenv

load_dotenv()

def obtain_connection():
    return pymysql.connect(
                           host=os.getenv('HOST_BD'),
                           user=os.getenv('USER_BD'),
                           password=os.getenv('PASSWORD_BD'),
                           database=os.getenv('DATABASE'),  
                           port=os.getenv('PORT_BD'),
                           cursorclass=pymysql.cursors.DictCursor)