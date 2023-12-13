import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CalibrationService } from 'src/app/services/calibration/calibration.service';

@Component({
  selector: 'app-print-calibration',
  templateUrl: './print-calibration.component.html',
  styleUrls: ['./print-calibration.component.css']
})
export class PrintCalibrationComponent {

  constructor(private appService: CalibrationService, private router: Router, private actRoute:ActivatedRoute) { }

  data: any;
  link = ""
  id: number = this.actRoute.snapshot.params['id'];

  ngOnInit() {
    console.log(this.id);

    this.appService.cetakKalibrasi(this.id).subscribe((data: any) => {
      this.data = data.data[0];
      console.log(data.data[0]);
      this.link = `http://localhost:4200/calibration/TransKalibrasiView/${this.data.id}?showdetail=`;
      setTimeout(() => {
        window.print();
      }, 2000)
    });
  }

}
