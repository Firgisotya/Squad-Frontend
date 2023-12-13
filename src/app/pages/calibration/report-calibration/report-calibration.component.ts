import { Component } from '@angular/core';
import { ChartComponent } from "ng-apexcharts";
import { CalibrationService } from 'src/app/services/calibration/calibration.service';
import { FormGroup, FormControl } from '@angular/forms';

import {
  ApexNonAxisChartSeries,
  ApexAxisChartSeries,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexResponsive,
  ApexChart,
  ApexFill,
  ApexDataLabels,
  ApexLegend
} from "ng-apexcharts";


export type ChartDonut = {
  seriesTipe: ApexNonAxisChartSeries;
  seriesStatus: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labelsTipe: any;
  labelsStatus: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  colors: string[];
};

export type ChartColumn = {
  seriesYear: ApexAxisChartSeries;
  seriesCategory: ApexAxisChartSeries;
  seriesYearly: ApexAxisChartSeries;
  seriesmonthly: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxisYear: ApexYAxis;
  xaxisYear: ApexXAxis;
  yaxisCategory: ApexYAxis;
  xaxisCategory: ApexXAxis;
  yaxisMonthly: ApexYAxis;
  xaxisMonthly: ApexXAxis;
  yaxisYearly: ApexYAxis;
  xaxisYearly: ApexXAxis;
  fill: ApexFill;
  titleYear: ApexTitleSubtitle;
  titleCategory: ApexTitleSubtitle;
};

@Component({
  selector: 'app-report-calibration',
  templateUrl: './report-calibration.component.html',
  styleUrls: ['./report-calibration.component.css']
})
export class ReportCalibrationComponent {

  constructor(
    private appService: CalibrationService
  ) {
    const currentYear = new Date().getFullYear();
    for (let i = 2020; i <= currentYear; i++) {
      this.tahun_filter.push(i);
    }

    const currentMonth = new Date().getMonth();
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember"
    ];
    for (let i = 0; i <= currentMonth; i++) {
      this.month_filter.push(monthNames[i]);
    }
  }

  public chartPie: Partial<ChartDonut> | any;
  public chartAllTrans: Partial<ChartColumn> | any;
  public chartFilter: Partial<ChartColumn> | any;

  tahun_filter: any = [];
  month_filter: any = [];

  dt_CountTransaksiTipe: any = [];
  dt_CountTransaksiStatus: any = [];
  dt_CountAllTransaksi: any = [];
  dt_TransaksiCategory: any = [];
  dt_getCountTransaksiByMonth: any = [];
  dt_getCountTransaksiByYearly: any = [];
  tipeTransaksi: any = [];
  selectedYear: any;
  selectedMonth: any;

  filterYear! : FormGroup;
  filterMonth! : FormGroup;


  ngOnInit() {
    this.appService.getCountTransaksiTipe().subscribe((data: any) => {
      this.dt_CountTransaksiTipe = data.data;
      // console.log(this.dt_CountTransaksiTipe);

      this.tipeTransaksi = this.dt_CountTransaksiTipe.map((item: any) => {
        switch (item.jenis) {
          case 1:
            return 'Internal';
          case 2:
            return 'External';
          case 3:
            return 'Verification  ';
          default:
            return '';
        }
      });

      this.ChartTransTipe();
    })

    this.appService.getTransaksiByStatus().subscribe((data: any) => {
      this.dt_CountTransaksiStatus = data.data;
      // console.log(this.dt_CountTransaksiStatus);

      this.ChartTransTipe();
    })

    this.appService.getCountTransaksiByYear().subscribe((data: any) => {
      this.dt_CountAllTransaksi = data.data;
      // console.log(this.dt_CountAllTransaksi);

      this.ChartAllTrans();
    });

    this.appService.getTransaksiByCategory().subscribe((data: any) => {
      this.dt_TransaksiCategory = data.data;
      // console.log(this.dt_TransaksiCategory);

      this.ChartAllTrans();
    });

    this.appService.getCountTransaksiByMonth(this.selectedYear).subscribe((data: any) => {
      this.dt_getCountTransaksiByMonth = data.data;
      // console.log(this.dt_getCountTransaksiByMonth);

      this.ChartFilter();
    });

    this.filterYear = new FormGroup({
      year: new FormControl('')
    });

    this.appService.filterTransaksiMonth(this.selectedMonth).subscribe((data: any) => {
      this.dt_getCountTransaksiByYearly = data.data;
      console.log(this.dt_getCountTransaksiByYearly);

      this.ChartFilter();
    });

    this.filterMonth = new FormGroup({
      month: new FormControl('')
    });

  }

  filterByYear(){
    this.selectedYear = this.filterYear.value.year;
    this.dt_getCountTransaksiByMonth = [];
    this.appService.getCountTransaksiByMonth(this.selectedYear).subscribe((data: any) => {
      this.dt_getCountTransaksiByMonth = data.data;
      console.log(this.dt_getCountTransaksiByMonth);

      this.ChartFilter();
    });
  }

  filterByMonth(){
    this.selectedMonth = this.filterMonth.value.month;
    console.log(this.selectedMonth);

    this.dt_getCountTransaksiByYearly = [];
    this.appService.filterTransaksiMonth(this.selectedMonth).subscribe((data: any) => {
      this.dt_getCountTransaksiByYearly = data.data;
      console.log(this.dt_getCountTransaksiByYearly);

      this.ChartFilter();
    });
  }

  ChartTransTipe() {
    this.chartPie = {
      seriesTipe: this.dt_CountTransaksiTipe.map((item: any) => item.in_or_ex),
      seriesStatus: this.dt_CountTransaksiStatus.map((item: any) => item.total),
      chart: {
        width: 380,
        type: "donut"
      },

      dataLabels: {
        enabled: true
      },
      fill: {
        type: "gradient"
      },
      labelsTipe: this.tipeTransaksi,
      labelsStatus: this.dt_CountTransaksiStatus.map((item: any) => item.status),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  ChartAllTrans() {
    this.chartAllTrans = {
      seriesYear: [
        {
          name: "Total Data",
          data: this.dt_CountAllTransaksi.map((item: any) => item.total_data)
        }
      ],
      seriesCategory: [
        {
          name: "Total Data Category",
          data: this.dt_TransaksiCategory.map((item: any) => item.category_count)
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxisYear: {
        categories: this.dt_CountAllTransaksi.map((item: any) => item.tahun),
        position: "bottom",
        labels: {
          show: true,
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
      xaxisCategory: {
        categories: this.dt_TransaksiCategory.map((item: any) => item.category),
        position: "bottom",
        labels: {
          show: true,
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxisYear: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: true,
        }
      },
      yaxisCategory: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: true,
        }
      },

    }
  }

  ChartFilter(){
    this.chartFilter = {
      seriesMonthly: [
        {
          name: "Total",
          data: this.dt_getCountTransaksiByMonth.map((item: any) => item.total_data)
        }
      ],
      seriesYearly: [
        {
          name: "Total",
          data: this.dt_getCountTransaksiByYearly.map((item: any) => item.total_data)
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        events: {

        }
      },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#D10CE8"
      ],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxisMonthly: {
        categories: this.dt_getCountTransaksiByMonth.map((item: any) => item.bulan),
        labels: {
          style: {
            colors: [
              "#008FFB",
              "#00E396",
              "#FEB019",
              "#FF4560",
              "#775DD0",
              "#546E7A",
              "#26a69a",
              "#D10CE8"
            ],
            fontSize: "12px"
          }
        }
      },
      xaxisYearly: {
        categories: this.dt_getCountTransaksiByYearly.map((item: any) => item.category),
        labels: {
          style: {
            colors: [
              "#008FFB",
              "#00E396",
              "#FEB019",
              "#FF4560",
              "#775DD0",
              "#546E7A",
              "#26a69a",
              "#D10CE8"
            ],
            fontSize: "12px"
          }
        }
      }
    }
  }

}
