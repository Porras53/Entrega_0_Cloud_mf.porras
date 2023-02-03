import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Evento, Categoria, Modalidad } from '../Evento';
import { EventosService } from '../eventos.service';

@Component({
  selector: 'app-evento-edit',
  templateUrl: './evento-edit.component.html',
  styleUrls: ['./evento-edit.component.css']
})
export class eventoEditComponent implements OnInit {

  userId: number;
  token: string;
  eventoId: number;
  eventoForm!: FormGroup;
  categorias:Array<Categoria> = [
    {
      llave: "CONFERENCIA",
      valor: 1
    },
    {
      llave: "SEMINARIO",
      valor: 2
    },
    {
      llave: "CONGRESO",
      valor: 3
    },
    {
      llave: "CURSO",
      valor: 4
    }
  ];

  modalidades:Array<Modalidad> = [
    {
      llave: "CONFERENCIA",
      valor: 1
    },
    {
      llave: "SEMINARIO",
      valor: 2
    }
  ];

  constructor(

    private eventosService: EventosService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private routerPath: Router) { }

  ngOnInit() {
    console.log(this.router.snapshot)
    if(!parseInt(this.router.snapshot.params['userId']) || this.router.snapshot.params['userToken'] === " "){
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else{
      this.eventosService.getEvento(parseInt(this.router.snapshot.params['eventoId']))
      .subscribe(evento => {
        this.eventoId = evento.id
        this.eventoForm = this.formBuilder.group({
          nombre: [evento.nombre, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
          fechaInic: [evento.fechaInic, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
          fechaFina: [evento.fechaFina, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
          lugar: [evento.lugar, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
          direccion: [evento.lugar, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
          categoria: [evento.categoria.llave, [Validators.required]],
          modalidad: [evento.modalidad.llave, [Validators.required]]
        })
      })
      this.userId = parseInt(this.router.snapshot.params['userId'])
      this.token = this.router.snapshot.params['userToken']
    }
  }

  cancelCreate(){
    this.eventoForm.reset()
    this.routerPath.navigate([`/evento/${this.userId}/${this.token}`])
  }

  editarevento(newevento: Evento){
    console.log(newevento)
    this.eventosService.editarEvento(this.userId, this.token, this.eventoId, newevento)
    .subscribe(evento => {
      this.showSuccess(evento)
      this.eventoForm.reset()
      this.routerPath.navigate([`/evento/${this.userId}/${this.token}`])
    // },
    //   (    error: { statusText: string; message: string; })=> {
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


  showError(error: string){
    this.toastr.error(error, "Error")
  }

  showWarning(warning: string){
    this.toastr.warning(warning, "Error de autenticación")
  }

  showSuccess(evento: Evento) {
    this.toastr.success(`El evento ${evento.nombre} fue editado`, "Edición exitosa");
  }

}
