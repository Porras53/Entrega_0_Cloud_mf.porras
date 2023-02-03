import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioLoginComponent } from './usuario/usuario-login/usuario-login.component';
import { UsuarioSignupComponent } from './usuario/usuario-signup/usuario-signup.component';
import { EventoListComponent } from './eventos/evento-list/evento-list.component';
import { EventoCreateComponent } from './eventos/evento-create/evento-create.component';
import { eventoEditComponent } from './eventos/evento-edit/evento-edit.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioLoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'signin',
    component: UsuarioLoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: UsuarioSignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'evento/:userId/:userToken',
    component: EventoListComponent
  },
  {
    path: 'evento/create/:userId/:userToken',
    component: EventoCreateComponent
  },
  {
    path: 'evento/edit/:eventoId/:userId/:userToken',
    component: eventoEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
