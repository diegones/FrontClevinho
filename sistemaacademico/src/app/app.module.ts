import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { RolamentosComponent } from './rolamentos/rolamentos.component';
import { ClienteComponent } from './cliente/cliente.component';




@NgModule({
  declarations: [
    AppComponent,
    RolamentosComponent,
    ClienteComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
  {
    path: 'rolamento',
    component: RolamentosComponent
  },
  {
    path: 'cliente',
    component: ClienteComponent
  }
])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
