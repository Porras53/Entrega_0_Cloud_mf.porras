
from vistas.vistas import *
from modelos import modelos
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask import Flask

def create_app(config_name):
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///eventos_abc.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    app.config['JWT_SECRET_KEY']= 'frase secreta'
    app.config['PROPAGATE_EXCEPTIONS'] = True
    return app

app = create_app('default')
app_context= app.app_context()
app_context.push()

modelos.db.init_app(app)
modelos.db.create_all()

cors = CORS(app)

api= Api(app)
api.add_resource(VistaEventos,'/eventos')
api.add_resource(VistaEvento, '/evento/<int:id_evento>')
api.add_resource(VistaSignIn, '/signin')
api.add_resource(VistaLogIn, '/login')
api.add_resource(VistaEventosUsuario, '/usuario/<int:id_usuario>/eventos')

jwt= JWTManager(app)

@app.route('/')
def hello_world():
	return 'Hello World!'

if __name__ == "__main__":
	app.run()