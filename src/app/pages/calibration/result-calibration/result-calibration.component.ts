import { Component } from '@angular/core';
import { CalibrationService } from 'src/app/services/calibration/calibration.service';

@Component({
  selector: 'app-result-calibration',
  templateUrl: './result-calibration.component.html',
  styleUrls: ['./result-calibration.component.css']
})
export class ResultCalibrationComponent {

    constructor(private appService: CalibrationService) { }

    data: any =[];

    ngOnInit(){
      this.appService.getAllTrans().subscribe((data: any)=>{
        this.data = data.data;
        console.log(data);
      })
    }

}
