import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PendingTaskComponent } from './pages/calibration/pending-task/pending-task.component';
import { ReportCalibrationComponent } from './pages/calibration/report-calibration/report-calibration.component';
import { ResultCalibrationComponent } from './pages/calibration/result-calibration/result-calibration.component';
import { PrintCalibrationComponent } from './pages/calibration/print-calibration/print-calibration.component';
import { BpdComponent } from './pages/bpd/bpd.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { OutAuthGuard } from './services/auth/auth-guard/auth-guard.guard';
import { FlowReleaseOCI1Component } from './pages/flowRelease/flow-release-oci1/flow-release-oci1.component';
import { FlowReleaseOCI2Component } from './pages/flowRelease/flow-release-oci2/flow-release-oci2.component';
import { FlowReleaseFsbComponent } from './pages/flowRelease/flow-release-fsb/flow-release-fsb.component';
import { GarfikReleaseComponent } from './pages/flowRelease/garfik-release/garfik-release.component';
import { RejectionFSBComponent } from './pages/inspeksi/rejectionFSB/rejectionFSB.component';
import { RejectionOCI1Component } from './pages/inspeksi/rejection-oci1/rejection-oci1.component';
import { RejectionOCI2Component } from './pages/inspeksi/rejection-oci2/rejection-oci2.component';

const routes: Routes = [
  { path: "login", component: LoginComponent},
  { path: "", component: HomeComponent},
  { path: "inspeksi", data: { breadcrumb: 'Inspeksi' }, children: [
    {path: "OCI1", data: { breadcrumb: 'OCI1' }, component: RejectionOCI1Component},
    {path: "OCI2", data: { breadcrumb: 'OCI2' }, component: RejectionOCI2Component},
    {path: "FSB", data: { breadcrumb: 'FSB' }, component: RejectionFSBComponent},
  ]},
  { path: "calibration", data: { breadcrumb: 'Calibration' }, children: [
    {path: "pending-task", data: { breadcrumb: 'Pending Task' }, component: PendingTaskComponent},
    {path: "report-calibration", data: { breadcrumb: 'Report Calibration' }, component: ReportCalibrationComponent},
    {path: "result-calibration", data: { breadcrumb: 'Result Calibration' }, component: ResultCalibrationComponent},
    {path: "print-calibration/:id", data: { breadcrumb: 'Print Calibration' }, component: PrintCalibrationComponent},
  ]},
  { path: "bpd", data: { breadcrumb: 'BPD' }, component: BpdComponent },
  { path: "flow-release", data: { breadcrumb: 'Flow Release' }, children: [
    { path: "flow-release-oci1", data: { breadcrumb: 'Flow Release OCI1' }, component: FlowReleaseOCI1Component },
    { path: "flow-release-oci2", data: { breadcrumb: 'Flow Release OCI2' }, component: FlowReleaseOCI2Component },
    { path: "flow-release-fsb", data: { breadcrumb: 'Flow Release FSB' }, component: FlowReleaseFsbComponent },
    { path: "grafik-flow-release", data: { breadcrumb: 'Grafik Flow Release' }, component: GarfikReleaseComponent }
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
