import { Component } from '@angular/core';
import { InspeksiService } from 'src/app/services/inspeksi/inspeksi.service';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

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
import { max } from 'date-fns';

export type ChartOptions = {
  seriesReject: ApexAxisChartSeries;
  seriesInspeksi: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxisReject: ApexYAxis | ApexYAxis[];
  yaxisInspeksi: ApexYAxis | ApexYAxis[];
  titleReject: ApexTitleSubtitle;
  labelsReject: string[];
  titleInspeksi: ApexTitleSubtitle;
  labelsInspeksi: string[];
  stroke: any; // ApexStroke;
  dataLabelsReject: any; // ApexDataLabels;
  dataLabelsInspeksi: any;
  fill: ApexFill;
  colorReject: string[];
  colorInspeksi: string[];
  tooltip: ApexTooltip;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-rejection-oci2',
  templateUrl: './rejection-oci2.component.html',
  styleUrls: ['./rejection-oci2.component.css']
})
export class RejectionOCI2Component {

  public chart: Partial<ChartOptions> | any;

  constructor(
    private appService: InspeksiService,
    private spinner: NgxSpinnerService
  ) { }

  dt_rejection: any = [];
  x_rejection: any = [];
  y_rejection: any = [];
  z_rejection: any = [];
  x_inspeksi: any = [];
  y_inspeksi: any = [];
  z_inspeksi: any = [];
  chartRejection: any;
  chartInspeksi: any;
  selectedStart: any;
  selectedEnd: any;

  filterDate!: FormGroup;

  ngOnInit() {
    this.spinner.show();


    this.appService.getRejectionOCI2(this.selectedStart, this.selectedEnd).subscribe((res: any) => {
      this.dt_rejection = res.data;
      console.log(this.dt_rejection);
      this.dt_rejection.forEach((element: any) => {
        this.x_rejection.push(element.lotno);
        this.y_rejection.push(element.total_reject);
        this.z_rejection.push(element.defect);
        this.x_inspeksi.push(element.lotno);
        this.y_inspeksi.push(element.feeding);
        this.z_inspeksi.push(parseFloat(element.level_inspeksi));
      })

      this.spinner.hide();
      this.Chart();

    });

    this.filterDate = new FormGroup({
      start: new FormControl(''),
      end: new FormControl(''),
    });
  }

  FilterRangeDate() {
    this.spinner.show();
    this.selectedStart = this.filterDate.value.start;
    this.selectedEnd = this.filterDate.value.end;
    this.appService.getRejectionOCI2(this.selectedStart, this.selectedEnd).subscribe((res: any) => {
      this.dt_rejection = res.data;
      console.log(this.dt_rejection);
      this.dt_rejection.forEach((element: any) => {
        this.x_rejection.push(element.lotno);
        this.y_rejection.push(element.total_reject);
        this.z_rejection.push(element.defect);
        this.x_inspeksi.push(element.lotno);
        this.y_inspeksi.push(element.feeding);
        this.z_inspeksi.push(element.level_inspeksi);
      })

      this.spinner.hide();
      this.Chart();

    });
  }

  ResetFilter() {
    this.spinner.show();
    this.x_rejection = [];
    this.y_rejection = [];
    this.z_rejection = [];
    this.x_inspeksi = [];
    this.y_inspeksi = [];
    this.z_inspeksi = [];
    this.appService.getRejectionOCI2(this.selectedStart, this.selectedEnd).subscribe((res: any) => {
      this.dt_rejection = res.data;
      console.log(this.dt_rejection);
      this.dt_rejection.forEach((element: any) => {
        this.x_rejection.push(element.lotno);
        this.y_rejection.push(element.total_reject);
        this.z_rejection.push(element.defect);
        this.x_inspeksi.push(element.lotno);
        this.y_inspeksi.push(element.feeding);
        this.z_inspeksi.push(element.level_inspeksi);
      })

      this.spinner.hide();
      this.Chart();

    });
  }

  Chart() {
    this.chart = {
      seriesReject: [
        {
          name: "Bottle",
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
          name: "Bottle",
          type: "column",
          data: this.y_inspeksi
        },
        {
          name: "Level Inspeksi(%)",
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
        formatter: function (val: any, opts: any) {
          return val.toFixed(4) + "%";
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

      },
      labelsReject: this.x_rejection,
      labelsInspeksi: this.x_inspeksi,
      colorReject: ["#008FFB", "#00E396"],
      colorInspeksi: ["#008FFB", "#faf607"],
      // xaxis: {
      //   type: ""
      // },
      yaxisReject: [
        {
          title: {
            text: "Bottle"
          },
          labels: {
            formatter: function (val: any) {
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
            formatter: function (val: any) {
              return val.toFixed(4) + "%";
            }
          },
        }
      ],
      yaxisInspeksi: [
        {
          title: {
            text: "Bottle"
          },
          labels: {
            formatter: function (val: any) {
              return val.toFixed(0);
            }
          }
        },
        {
          opposite: true,
          title: {
            text: "Level Inspeksi(%)"
          },
          labels: {
            formatter: function (val: any) {
              return val.toFixed(1) + "%";
            },
          },
          tickAmount: 2,
          min: 2.0,
        }
      ]
    } 
  }

}
