import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { Evento } from '../Evento';
import { EventosService } from '../eventos.service';

@Component({
  selector: 'app-evento-list',
  templateUrl: './evento-list.component.html',
  styleUrls: ['./evento-list.component.css']
})
export class EventoListComponent implements OnInit {

  constructor(
    private eventosService: EventosService,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private routerPath: Router
  ) { }


  userId: number
  token: string
  eventos: Array<Evento>
  mostrarEventos: Array<Evento>
  eventoSeleccionado: Evento
  indiceSeleccionado: number

   async ngOnInit() {
    if(!parseInt(this.router.snapshot.params['userId']) || this.router.snapshot.params['userToken'] === " "){
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else{
      this.userId = parseInt(this.router.snapshot.params['userId'])
      this.token = this.router.snapshot.params['userToken']
      await this.getEventos();
    }
  }

  getEventos():void{
    this.eventosService.getEventos(this.userId, this.token)
    .subscribe(eventos => {
      console.log(eventos)
      this.eventos = eventos
      this.mostrarEventos = eventos
      this.eventoSeleccionado = eventos[0]
    // },
    // error => {
    //   console.log(error)
    //   if(error.statusText === "UNAUTHORIZED"){
    //     this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
    //   }
    //   else if(error.statusText === "UNPROCESSABLE ENTITY"){
    //     this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    //   }
    //   else{
    //     this.showError("Ha ocurrido un error. " + error.message)
    //   }
     })

  }

  onSelect(a: Evento, index: number){
    this.indiceSeleccionado = index
    this.eventoSeleccionado = a
  }

  buscarEvento(busqueda: string){
    let eventosBusqueda: Array<Evento> = []
    this.eventos.map( evento => {
      if( evento.nombre.toLocaleLowerCase().includes(busqueda.toLowerCase())){
        eventosBusqueda.push(evento)
      }
    })
    this.mostrarEventos = eventosBusqueda
  }

  irCrearEvento(){
    this.routerPath.navigate([`/evento/create/${this.userId}/${this.token}`])
  }

  eliminarEvento(){
    this.eventosService.eliminarEvento(this.userId, this.token, this.eventoSeleccionado.id)
    .subscribe(album => {
      this.ngOnInit();
      this.showSuccess();
    // },
    // error=> {
    //   if(error.statusText === "UNAUTHORIZED"){
    //     this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
    //   }
    //   else if(error.statusText === "UNPROCESSABLE ENTITY"){
    //     this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    //   }
    //   else{
    //     this.showError("Ha ocurrido un error. " + error.message)
    //   }
    })
    this.ngOnInit()
  }

  showError(error: string){
    this.toastr.error(error, "Error de autenticación")
  }

  showWarning(warning: string){
    this.toastr.warning(warning, "Error de autenticación")
  }

  showSuccess() {
    this.toastr.success(`El album fue eliminado`, "Eliminado exitosamente");
  }

}
