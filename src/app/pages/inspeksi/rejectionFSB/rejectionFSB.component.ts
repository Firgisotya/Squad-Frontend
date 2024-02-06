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
  seriesReject: ApexAxisChartSeries;
  seriesInspeksi: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxisReject: ApexYAxis | ApexYAxis[];
  titleReject: ApexTitleSubtitle;
  labelsReject: string[];
  yaxisInspeksi: ApexYAxis | ApexYAxis[];
  titleInspeksi: ApexTitleSubtitle;
  labelsInspeksi: string[];
  stroke: any; // ApexStroke;
  dataLabelsInspeksi: any; // ApexDataLabels;
  fill: ApexFill;
  colorReject: string[];
  tooltip: ApexTooltip;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-rejection',
  templateUrl: './rejectionFSB.component.html',
  styleUrls: ['./rejectionFSB.component.css']
})
export class RejectionFSBComponent {

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
  x_inspeksi: any = [];
  y_inspeksi: any = [];
  z_inspeksi: any = [];
  chartRejection: any;
  selectedReason: any;
  selectedProduct: any;
  selectedStart: any;
  selectedEnd: any;

  filterDate!: FormGroup;

  ngOnInit() {
    this.spinner.show();
    // get all reason
    this.appService.getAllReasonFSB().subscribe((data: any) => {
      // console.log(data.data);
      this.dt_reason = data.data;
    });

    this.appService.getAllProdcutFSB().subscribe((data: any) => {
      // console.log(data.data);
      this.dt_product = data.data;
    });

    // get rejection data
    this.appService.getRejectionFSB(this.selectedReason, this.selectedProduct, this.selectedStart, this.selectedEnd).subscribe((item: any) => {
      this.dt_rejection = item.data;
      console.log(this.dt_rejection);
      this.dt_rejection.forEach((element: any) => {
        this.x_rejection.push(element.new_lotno);
        this.y_rejection.push(element.total_reject | 0);
        this.z_rejection.push(element.defect | 0);
        this.x_inspeksi.push(element.new_lotno);
        this.y_inspeksi.push(element.qty_inspeksi | 0);
        this.z_inspeksi.push(element.level_inspeksi | 0);
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

    this.appService.getRejectionFSB(this.selectedReason, this.selectedProduct, this.selectedStart, this.selectedEnd).subscribe((data: any) => {
      console.log(data.data);
      this.dt_rejection = data.data.reverse();
      this.x_rejection = [];
      this.y_rejection = [];
      this.z_rejection = [];
      this.x_inspeksi = [];
      this.y_inspeksi = [];
      this.z_inspeksi = [];
      this.dt_rejection.forEach((element: any) => {
        this.x_rejection.push(element.new_lotno);
        this.y_rejection.push(element.total_reject | 0);
        this.z_rejection.push(element.defect | 0);
        this.x_inspeksi.push(element.new_lotno);
        this.y_inspeksi.push(element.qty_inspeksi | 0);
        this.z_inspeksi.push(element.level_inspeksi | 0);
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
    this.appService.getRejectionFSB(this.selectedReason, this.selectedProduct, this.selectedStart, this.selectedEnd).subscribe((data: any) => {
      console.log(data.data);
      this.dt_rejection = data.data.reverse();
      this.x_rejection = [];
      this.y_rejection = [];
      this.z_rejection = [];
      this.x_inspeksi = [];
      this.y_inspeksi = [];
      this.z_inspeksi = [];
      this.dt_rejection.forEach((element: any) => {
        this.x_rejection.push(element.new_lotno);
        this.y_rejection.push(element.total_reject | 0);
        this.z_rejection.push(element.defect | 0);
        this.x_inspeksi.push(element.new_lotno);
        this.y_inspeksi.push(element.qty_inspeksi | 0);
        this.z_inspeksi.push(element.level_inspeksi | 0);
      });
      this.spinner.hide();
      this.ChartRejection();
    });
  }

  ChartRejection() {
    this.chartReject = {
        seriesReject: [
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
        seriesInspeksi: [
          {
            name: "Bar(pcs)",
            type: "column",
            data: this.y_inspeksi
          },
          {
            name: "Defect(%)",
            type: "line",
            data: this.z_inspeksi
          }
        ],
        chart: {
          height: 350,
          type: "line"
        },
        stroke: {
          width: [0, 4]
        },
        titleReject: {
          text: "Rejection"
        },
        titleInspeksi: {
          text: "Inspection"
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: "center"
            }
          }
        },
        dataLabelsReject: {
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
        dataLabelsInspeksi: {
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
        labelsReject: this.x_rejection,
        labelsInspeksi: this.x_rejection,
        colorReject: ["#008FFB", "#00E396"],
        colorInspeksi: ["#008FFB", "#faf607"],
        yaxisReject: [
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
        ],
        yaxisInspeksi: [
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
              text: "Inspect(%)"
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
