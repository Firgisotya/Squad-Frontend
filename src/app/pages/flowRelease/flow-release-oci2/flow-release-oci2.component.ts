import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FlowReleaseService } from 'src/app/services/flowRelease/flow-release.service';

@Component({
  selector: 'app-flow-release-oci2',
  templateUrl: './flow-release-oci2.component.html',
  styleUrls: ['./flow-release-oci2.component.css']
})
export class FlowReleaseOCI2Component {

  constructor(
    private appService: FlowReleaseService,
    private spinner: NgxSpinnerService
    ) { }

  dataOcI2: any = [];

  ngOnInit(){
    this.spinner.show();
    this.appService.getFlowReleaseOCI2().subscribe((res: any) => {
      console.log(res);
      
      this.dataOcI2 = res.data;
      console.log(this.dataOcI2);
      this.spinner.hide();

    });
  }

}
