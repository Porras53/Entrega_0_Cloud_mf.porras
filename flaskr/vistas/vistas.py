from sqlite3 import IntegrityError
from flask import request
from flask_restful import Resource
from ..modelos import *

evento_schema = EventoSchema()
usuario_schema = UsuarioSchema()

class VistaEventos(Resource):

    def post(self):
        nuevo_evento = Evento(nombre=request.json["nombre"], \
            categoria=request.json["categoria"], \
            lugar=request.json["lugar"], \
            direccion=request.json["direccion"], \
            fechaInic=request.json["fechaInic"], \
            fechaFina=request.json["fechaFina"], \
            modalidad=request.json["modalidad"], \
            usuario=request.json["usuario"])
        db.session.add(nuevo_evento)
        db.session.commit()
        return evento_schema.dump(nuevo_evento)

    def get(self):
        return [evento_schema.dump(evento) for evento in Evento.query.all()]

class VistaEvento(Resource):

    def get(self, id_evento):
        return evento_schema.dump(Evento.query.get_or_404(id_evento))

    def put(self, id_evento):
        evento = Evento.query.get_or_404(id_evento)
        evento.nombre = request.json.get("nombre",evento.nombre)
        evento.categoria = request.json.get("categoria",evento.categoria)
        evento.lugar = request.json.get("lugar",evento.lugar)
        evento.direccion = request.json.get("direccion",evento.direccion)
        evento.fechaInic = request.json.get("fechaInic",evento.fechaInic)
        evento.fechaFina = request.json.get("fechaFina",evento.fechaFina)
        evento.modalidad = request.json.get("modalidad",evento.modalidad)
        evento.direccion = request.json.get("direccion",evento.usuario)
        db.session.commit()
        return evento_schema.dump(evento)

    def delete(self, id_evento):
        evento = Evento.query.get_or_404(id_evento)
        db.session.delete(evento)
        db.session.commit()
        return '',204

class VistaLogIn(Resource):
    def post(self):
            u_nombre = request.json["nombre"]
            u_contrasena = request.json["contrasena"]
            usuario = Usuario.query.filter_by(nombre=u_nombre, contrasena = u_contrasena).all()
            if usuario:
                return {'mensaje':'Inicio de sesión exitoso'}, 200
            else:
                return {'mensaje':'Nombre de usuario o contraseña incorrectos'}, 401


class VistaSignIn(Resource):
    
    def post(self):
        nuevo_usuario = Usuario(nombre=request.json["nombre"], contrasena=request.json["contrasena"])
        db.session.add(nuevo_usuario)
        db.session.commit()
        return 'Usuario creado exitosamente', 201

    def put(self, id_usuario):
        usuario = Usuario.query.get_or_404(id_usuario)
        usuario.contrasena = request.json.get("contrasena",usuario.contrasena)
        db.session.commit()
        return usuario_schema.dump(usuario)

    def delete(self, id_usuario):
        usuario = Usuario.query.get_or_404(id_usuario)
        db.session.delete(usuario)
        db.session.commit()
        return '',204

class VistaEventosUsuario(Resource):

    def post(self, id_usuario):
        nuevo_evento = Evento(nombre=request.json["nombre"], \
            categoria=request.json["categoria"], \
            lugar=request.json["lugar"], \
            direccion=request.json["direccion"], \
            fechaInic=request.json["fechaInic"], \
            fechaFina=request.json["fechaFina"], \
            modalidad=request.json["modalidad"], \
            usuario=request.json["usuario"])
        usuario = Usuario.query.get_or_404(id_usuario)
        usuario.albumes.append(nuevo_evento)

        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            return 'El usuario ya tiene un album con dicho nombre',409

        return evento_schema.dump(nuevo_evento)

    def get(self, id_usuario):
        usuario = Usuario.query.get_or_404(id_usuario)
        return [evento_schema.dump(al) for al in usuario.albumes]

