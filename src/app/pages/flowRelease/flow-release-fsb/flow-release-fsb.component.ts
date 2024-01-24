import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FlowReleaseService } from 'src/app/services/flowRelease/flow-release.service';

@Component({
  selector: 'app-flow-release-fsb',
  templateUrl: './flow-release-fsb.component.html',
  styleUrls: ['./flow-release-fsb.component.css']
})
export class FlowReleaseFsbComponent {

  constructor(
    private appService: FlowReleaseService,
    private spinner: NgxSpinnerService
    ) { }

  dataFSB: any = [];

  ngOnInit(){
    this.spinner.show();
    this.appService.getFlowReleaseFSB().subscribe((res: any) => {
      console.log(res);
      
      this.dataFSB = res.data;
      console.log(this.dataFSB);
      this.spinner.hide();

    });
  }

}
