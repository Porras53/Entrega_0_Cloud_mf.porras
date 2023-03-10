import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { JwtHelperService } from "@auth0/angular-jwt";
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})
export class UsuarioLoginComponent implements OnInit {

  helper = new JwtHelperService();

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
    ) { }

  error: boolean = false

  ngOnInit() {
  }

  onLogInUsuario(nombre: string, contrasena: string){

    this.usuarioService.userLogIn(nombre, contrasena)
    .subscribe(res => {
      console.log(res.token);
      const decodedToken = this.helper.decodeToken(res.token);
      console.log(decodedToken);
      this.router.navigate([`/evento/${decodedToken.sub}/${res.token}`])
      console.log("Pasa por aqui");

    })
  }

}
