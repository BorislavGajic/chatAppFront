import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {AgentLayoutComponent} from './agent-layout/agent-layout.component';
import {LoginAgentComponent} from './login-agent/login-agent.component';
import {RegistracionComponent} from './registracion/registracion.component';

const routes: Routes = [

  {
    path: 'login',
    component: LoginAgentComponent,
    children: [
    ]},
  {
    path: 'signup',
    component: RegistracionComponent,
    children: [
    ]},
  {
    path: '',
    component: AgentLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './agent-layout/agent-layout.module#AgentLayoutModule'
      }]
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})

export class AppRoutingModule { }
