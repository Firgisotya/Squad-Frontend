import { Component } from '@angular/core';
import { Chart, elements, registerables } from 'chart.js/auto';
import { InspeksiService } from 'src/app/services/inspeksi/inspeksi.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SimpleLinearRegression } from 'ml-regression-simple-linear';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexPlotOptions,
} from "ng-apexcharts";
import { NgxSpinnerService } from 'ngx-spinner';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  stroke: any; // ApexStroke;
  dataLabels: any; // ApexDataLabels;
  fill: ApexFill;
  tooltip: ApexTooltip;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-rejection',
  templateUrl: './rejection.component.html',
  styleUrls: ['./rejection.component.css']
})
export class RejectionComponent {

  constructor(
    private appService: InspeksiService,
    private spinner: NgxSpinnerService
  ) { }

  public chartReject: Partial<ChartOptions> | any;

  dt_rejection: any = [];
  dt_reason: any = [];
  dt_product: any = [];
  x_rejection: any = [];
  y_rejection: any = [];
  z_rejection: any = [];
  chartRejection: any;
  selectedReason: any;
  selectedProduct: any;
  selectedStart: any;
  selectedEnd: any;

  filterDate!: FormGroup;

  ngOnInit() {
    this.spinner.show();
    // get all reason
    this.appService.getAllReason().subscribe((data: any) => {
      // console.log(data.data);
      this.dt_reason = data.data;
    });

    this.appService.getAllProdcut().subscribe((data: any) => {
      // console.log(data.data);
      this.dt_product = data.data;
    });

    // get rejection data
    this.appService.getRejection(this.selectedReason, this.selectedProduct, this.selectedStart, this.selectedEnd).subscribe((item: any) => {
      console.log(item.data);
      this.dt_rejection = item.data.reverse();
      this.dt_rejection.forEach((element: any) => {
        this.x_rejection.push(element.new_lotno);
        this.y_rejection.push(element.total_reject);
        this.z_rejection.push(element.defect);
      });

      this.spinner.hide();
      this.ChartRejection();
    });

    this.filterDate = new FormGroup({
      reason: new FormControl(''),
      varian: new FormControl(''),
      start: new FormControl(''),
      end: new FormControl('')
    });

  }

  filterRangeDate(){
    this.spinner.show();
    console.log(this.filterDate.value);
    this.selectedReason = this.filterDate.value.reason;
    this.selectedProduct = this.filterDate.value.varian;
    this.selectedStart = this.filterDate.value.start;
    this.selectedEnd = this.filterDate.value.end;

    this.appService.getRejection(this.selectedReason, this.selectedProduct, this.selectedStart, this.selectedEnd).subscribe((data: any) => {
      console.log(data.data);
      this.dt_rejection = data.data.reverse();
      this.x_rejection = [];
      this.y_rejection = [];
      this.z_rejection = [];
      this.dt_rejection.forEach((element: any) => {
        this.x_rejection.push(element.new_lotno);
        this.y_rejection.push(element.total_reject);
        this.z_rejection.push(element.defect);
      });
      this.spinner.hide();
      this.ChartRejection();
    });
  }

  resetFilter(){
    this.spinner.show();
    this.selectedReason = '';
    this.selectedProduct = '';
    this.selectedStart = '';
    this.selectedEnd = '';
    this.filterDate.reset();
    this.appService.getRejection(this.selectedReason, this.selectedProduct, this.selectedStart, this.selectedEnd).subscribe((data: any) => {
      console.log(data.data);
      this.dt_rejection = data.data.reverse();
      this.x_rejection = [];
      this.y_rejection = [];
      this.z_rejection = [];
      this.dt_rejection.forEach((element: any) => {
        this.x_rejection.push(element.new_lotno);
        this.y_rejection.push(element.total_reject);
        this.z_rejection.push(element.defect);
      });
      this.spinner.hide();
      this.ChartRejection();
    });
  }

  ChartRejection() {
    this.chartReject = {
        series: [
          {
            name: "Bar(pcs)",
            type: "column",
            data: this.y_rejection
          },
          {
            name: "Defect(%)",
            type: "line",
            data: this.z_rejection
          }
        ],
        chart: {
          height: 350,
          type: "line"
        },
        stroke: {
          width: [0, 4]
        },
        title: {
          text: "Traffic Sources"
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: "center"
            }
          }
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [1],
          background: {
            enabled: true,
            foreColor: "#000",
            padding: 4,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: "#fff"
          },
          formatter: function(val: any, opts: any) {
            return val.toFixed(1) + "%";
          }
        },
        labels: this.x_rejection,
        // xaxis: {
        //   type: ""
        // },
        yaxis: [
          {
            title: {
              text: "Bar(pcs)"
            },
            labels: {
              formatter: function(val: any) {
                return val.toFixed(0);
              }
            }
          },
          {
            opposite: true,
            title: {
              text: "Defect(%)"
            },
            labels: {
              formatter: function(val: any) {
                return val.toFixed(1) + "%";
              }
            }
          }
        ]
    }
  }

}
