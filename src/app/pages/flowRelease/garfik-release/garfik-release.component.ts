import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { FlowReleaseOCI1Service } from 'src/app/services/flowRelease/flow-release-oci1.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";

export type ChartRelease = {
  seriesOci1: ApexAxisChartSeries;
  seriesOci2: ApexAxisChartSeries;
  seriesFsb: ApexAxisChartSeries;
  chart: ApexChart;
  xaxisOci1: ApexXAxis;
  xaxisOci2: ApexXAxis;
  xaxisFsb: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  titleOci1: ApexTitleSubtitle;
  titleOci2: ApexTitleSubtitle;
  titleFsb: ApexTitleSubtitle;
};

@Component({
  selector: 'app-garfik-release',
  templateUrl: './garfik-release.component.html',
  styleUrls: ['./garfik-release.component.css']
})
export class GarfikReleaseComponent {

  public chartRelease: Partial<ChartRelease> | any;

  constructor(
    private appService: FlowReleaseOCI1Service,
    private spinner: NgxSpinnerService
  ) { }

  dt_oci1: any = [];
  dt_oci2: any = [];
  dt_fsb: any = [];
  x_oci1: any = [];
  y_oci1: any = [];
  x_oci2: any = [];
  y_oci2: any = [];
  x_fsb: any = [];
  y_fsb: any = [];
  selectedStartDate: any;
  selectedEndDate: any;


  filterDate!: FormGroup;

  ngOnInit(){

    this.spinner.show();

    this.appService.grafikRelease(this.selectedStartDate, this.selectedEndDate).subscribe((data: any) => {
      this.dt_oci1 = data.data.oci1;
      this.dt_oci2 = data.data.oci2;
      this.dt_fsb = data.data.fsb;
      console.log(this.dt_oci1);
      
      
      // oci1
      this.dt_oci1.forEach((element: any) => {
        this.x_oci1.push(element.lotno);
        this.y_oci1.push(element.day_release);
      });

      // oci2
      this.dt_oci2.forEach((element: any) => {
        this.x_oci2.push(element.lotno);
        this.y_oci2.push(element.day_release);
      });

      // fsb
      this.dt_fsb.forEach((element: any) => {
        this.x_fsb.push(element.lotno);
        this.y_fsb.push(element.day_release);
      });
      
      this.spinner.hide();
      this.ChartRelease();
    });


    this.filterDate = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl()
    });

  }

  filterRangeDate(){
    this.spinner.show();
    console.log(this.filterDate.value);
    this.selectedStartDate = this.filterDate.value.startDate;
    this.selectedEndDate = this.filterDate.value.endDate;

    this.appService.grafikRelease(this.selectedStartDate, this.selectedEndDate).subscribe((data: any) => {
      this.dt_oci1 = data.data.oci1;
      this.dt_oci2 = data.data.oci2;
      this.dt_fsb = data.data.fsb;
      this.x_oci1 = [];
      this.y_oci1 = [];
      this.x_oci2 = [];
      this.y_oci2 = [];
      this.x_fsb = [];
      this.y_fsb = [];
      
      // oci1
      this.dt_oci1.forEach((element: any) => {
        this.x_oci1.push(element.lotno);
        this.y_oci1.push(element.day_release);
      });

      // oci2
      this.dt_oci2.forEach((element: any) => {
        this.x_oci2.push(element.lotno);
        this.y_oci2.push(element.day_release);
      });

      // fsb
      this.dt_fsb.forEach((element: any) => {
        this.x_fsb.push(element.lotno);
        this.y_fsb.push(element.day_release);
      });
      
      this.spinner.hide();
      this.ChartRelease();
    });


  }

  resetFilter(){
    this.spinner.show();
    this.selectedStartDate = '';
    this.selectedEndDate = '';
    this.filterDate.reset();
    this.appService.grafikRelease(this.selectedStartDate, this.selectedEndDate).subscribe((data: any) => {
      this.dt_oci1 = data.data.oci1;
      this.dt_oci2 = data.data.oci2;
      this.dt_fsb = data.data.fsb;
      this.x_oci1 = [];
      this.y_oci1 = [];
      this.x_oci2 = [];
      this.y_oci2 = [];
      this.x_fsb = [];
      this.y_fsb = [];
      
      // oci1
      this.dt_oci1.forEach((element: any) => {
        this.x_oci1.push(element.lotno);
        this.y_oci1.push(element.day_release);
      });

      // oci2
      this.dt_oci2.forEach((element: any) => {
        this.x_oci2.push(element.lotno);
        this.y_oci2.push(element.day_release);
      });

      // fsb
      this.dt_fsb.forEach((element: any) => {
        this.x_fsb.push(element.lotno);
        this.y_fsb.push(element.day_release);
      });
      
      this.spinner.hide();
      this.ChartRelease();
    });
  }

  ChartRelease(){
    this.chartRelease = {
      seriesOci1: [
        {
          name: "Release Day",
          data: this.y_oci1,
        }
      ],
      seriesOci2: [
        {
          name: "Release Day",
          data: this.y_oci2
        }
      ],
      seriesFsb: [
        {
          name: "Release Day",
          data: this.y_fsb
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "straight"
      },
      titleOci1: {
        text: "Grafik Flow Release OCI1",
        align: "center"
      },
      titleOci2: {
        text: "Grafik Flow Release OCI2",
        align: "center"
      },
      titleFsb: {
        text: "Grafik Flow Release FSB",
        align: "center"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      yaxis: {
        title: {
          text: "Release Day"
        },
        min: 0,
      },
      xaxisOci1: {
        categories: this.x_oci1
      },
      xaxisOci2: {
        categories: this.x_oci2
      },
      xaxisFsb: {
        categories: this.x_fsb
      }
    };
  }

}
