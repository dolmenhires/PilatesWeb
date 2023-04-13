import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProfesoresComponent } from './crear-profesores.component';

describe('CrearProfesoresComponent', () => {
  let component: CrearProfesoresComponent;
  let fixture: ComponentFixture<CrearProfesoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearProfesoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
