import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(public router: Router) { }

  isInspeksiSubMenu = false;
  isCalibrationSubMenu = false;
  isFlowReleaseSubMenu = false;

  toogleInspeksiSubMenu() {
    this.isInspeksiSubMenu = !this.isInspeksiSubMenu;
  }

  toogleCalibrationSubMenu() {
    this.isCalibrationSubMenu = !this.isCalibrationSubMenu;
  }

  toogleFlowReleaseSubMenu() {
    this.isFlowReleaseSubMenu = !this.isFlowReleaseSubMenu;
  }

}
