import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarModule } from 'primeng/toolbar';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { FieldsetModule } from 'primeng/fieldset';
import { CalendarModule } from 'primeng/calendar';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { DropdownModule } from 'primeng/dropdown';
import { SpinnerModule } from 'primeng/spinner';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ChipsModule } from 'primeng/chips';
import { PrincipalComponent } from './principal/principal.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { CrearAlumnoComponent } from './alumnos/crear-alumno.component';
import { CrearActividadComponent } from './actividades/crear-actividad.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { ClasesComponent } from './clases/clases.component';
import { CrearClasesComponent } from './clases/crear-clases.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { CrearProfesoresComponent } from './profesores/crear-profesores.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    AlumnosComponent,
    CrearAlumnoComponent,
    CrearActividadComponent,
    ActividadesComponent,
    ClasesComponent,
    CrearClasesComponent,
    ProfesoresComponent,
    CrearProfesoresComponent
  ],
  imports: [
    HttpClientModule, BrowserModule, AppRoutingModule, BrowserAnimationsModule, FormsModule,
    ToolbarModule, ButtonModule, SplitButtonModule, MenuModule, SidebarModule, PanelModule, FieldsetModule,
    FullCalendarModule, TableModule, TabViewModule, CalendarModule, DropdownModule, SpinnerModule,
    CheckboxModule, RadioButtonModule, ChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
