import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { CalibrationComponent } from './pages/calibration/calibration.component';
import { PendingTaskComponent } from './pages/calibration/pending-task/pending-task.component';
import { ReportCalibrationComponent } from './pages/calibration/report-calibration/report-calibration.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ResultCalibrationComponent } from './pages/calibration/result-calibration/result-calibration.component';
import { PrintCalibrationComponent } from './pages/calibration/print-calibration/print-calibration.component';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BpdComponent } from './pages/bpd/bpd.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { FlowReleaseOCI1Component } from './pages/flowRelease/flow-release-oci1/flow-release-oci1.component';
import { FlowReleaseOCI2Component } from './pages/flowRelease/flow-release-oci2/flow-release-oci2.component';
import { BreadcrumbComponent } from './layouts/breadcrumb/breadcrumb.component';
import { SwitchComponent } from './utils/switch/switch.component';
import { FlowReleaseFsbComponent } from './pages/flowRelease/flow-release-fsb/flow-release-fsb.component';
import { GarfikReleaseComponent } from './pages/flowRelease/garfik-release/garfik-release.component';
import { RejectionFSBComponent } from './pages/inspeksi/rejectionFSB/rejectionFSB.component';
import { RejectionOCI1Component } from './pages/inspeksi/rejection-oci1/rejection-oci1.component';
import { RejectionOCI2Component } from './pages/inspeksi/rejection-oci2/rejection-oci2.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainComponent,
    NavbarComponent,
    HomeComponent,
    RejectionFSBComponent,
    CalibrationComponent,
    PendingTaskComponent,
    ReportCalibrationComponent,
    ResultCalibrationComponent,
    PrintCalibrationComponent,
    BpdComponent,
    LoginComponent,
    FlowReleaseOCI1Component,
    FlowReleaseOCI2Component,
    BreadcrumbComponent,
    SwitchComponent,
    FlowReleaseFsbComponent,
    GarfikReleaseComponent,
    RejectionOCI1Component,
    RejectionOCI2Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    QRCodeModule,
    NgxPaginationModule,
    NgxSpinnerModule,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
