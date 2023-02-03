import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EventoListComponent } from './evento-list/evento-list.component';
import { EventoDetailComponent } from './evento-detail/evento-detail.component';
import { EventoCreateComponent } from './evento-create/evento-create.component';
import { eventoEditComponent } from './evento-edit/evento-edit.component';

@NgModule({
  declarations: [EventoListComponent, EventoDetailComponent, EventoCreateComponent, eventoEditComponent],
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  exports:[EventoListComponent, EventoDetailComponent, EventoCreateComponent, eventoEditComponent]
})
export class EventosModule { }
