import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentNavbarComponent } from './agent-navbar/agent-navbar.component';
import { AgentSidebarComponent } from './agent-sidebar/agent-sidebar.component';
import {NgbCollapseModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [AgentNavbarComponent, AgentSidebarComponent],
  exports: [
    AgentSidebarComponent,
    AgentNavbarComponent
  ],
    imports: [
        CommonModule,
        NgbCollapseModule,
        RouterModule,
        NgbDropdownModule
    ]
})
export class AgentCompModule { }
