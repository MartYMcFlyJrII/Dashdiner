#Environment
Se está utilizando un entorno virtual para organizar las dependencias del proyecto. Es importante instalar _pipenv_ en tu computadora con el siguiente comando:

```
pip install pipenv
```

Para activar el environment:

```
source $(pipenv --venv)/bin/activate
```

o

```
pipenv shell
```

Cuando se instale una nueva dependencia, correr el siguiente comando para actualizar el Pipfile:

```
pipenv install //dependencia
```

Al hacer un pull, actualiza las dependencias:

```
pipenv install
```

#Backend
Correr el backend:

```
cd backend
export FLASK_APP=./src/main.py
flask run -h 0.0.0.0
```

#Frontend
Correr el frontend:

```
cd frontend
ng serve
```
