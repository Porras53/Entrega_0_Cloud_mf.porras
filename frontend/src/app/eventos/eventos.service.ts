import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from './Evento';



@Injectable({
  providedIn: 'root'
})
export class EventosService {

private backUrl: string = "http://localhost:5000"

constructor(private http: HttpClient) { }

getEventos(usuario: number, token: string): Observable<Evento[]>{
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  })
  return this.http.get<Evento[]>(`${this.backUrl}/usuario/${usuario}/eventos`, {headers: headers})
}

crearEvento(idUsuario: number, token: string, Evento: Evento):Observable<Evento>{
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  })
  return this.http.post<Evento>(`${this.backUrl}/usuario/${idUsuario}/eventos`, Evento, {headers: headers})
}

getEvento(EventoId: number): Observable<Evento>{
  return this.http.get<Evento>(`${this.backUrl}/evento/${EventoId}`)
}

editarEvento(idUsuario: number, token: string, EventoId: number, Evento: Evento): Observable<Evento>{
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  })
  return this.http.put<Evento>(`${this.backUrl}/evento/${EventoId}`, Evento, {headers: headers})
}

eliminarEvento(idUsuario: number, token: string, EventoId: number): Observable<Evento>{
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  })
  return this.http.delete<Evento>(`${this.backUrl}/evento/${EventoId}`, {headers: headers})
}

}
