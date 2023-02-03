/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { eventoEditComponent } from './evento-edit.component';

describe('EventoEditComponent', () => {
  let component: eventoEditComponent;
  let fixture: ComponentFixture<eventoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ eventoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(eventoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
