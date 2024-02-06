import { Component } from '@angular/core';
import { Chart, elements, registerables } from 'chart.js/auto';
import { NgxSpinnerService } from 'ngx-spinner';
import { BpdService } from 'src/app/services/bpd/bpd.service';
import { ExponentialService } from 'src/app/services/bpd/exponetial/exponential.service';
import { format, set } from 'date-fns';

@Component({
  selector: 'app-bpd',
  templateUrl: './bpd.component.html',
  styleUrls: ['./bpd.component.css']
})
export class BpdComponent {

  constructor(
    private appService: BpdService,
    private exponentialModel: ExponentialService,
    private spinner: NgxSpinnerService,
  ) { }

  dt_oc1: any = [];
  dt_oc2: any = [];
  dt_boundary_oc1: any = [];
  dt_boundary_oc2: any = [];
  std_oc1: any = [];
  std_oc2: any = [];
  lower_oc1: number[] = [];
  upper_oc1: number[] = [];
  lower_oc2: number[] = [];
  upper_oc2: number[] = [];
  actual01: any = [];
  actual02: any = [];
  labels01: any = [];
  labels02: any = [];
  forecastData01: any = [];
  forecastData02: any = [];

  alpha: number = 0.6;
  period: number = 1;

  chart_oc1: any;
  chart_oc2: any;

  ngOnInit(){
    this.spinner.show();
    this.appService.getBoundaryOC1().subscribe((data: any) => {
      this.dt_boundary_oc1 = data.data;
      console.log(data.data);

      this.dt_boundary_oc1.forEach((element: any) => {
        this.lower_oc1.push(element.lower);
        this.upper_oc1.push(element.upper);
      });
    });

    this.appService.getBoundaryOC2().subscribe((data: any) => {
      this.dt_boundary_oc2 = data.data;
      console.log(data.data);

      this.dt_boundary_oc2.forEach((element: any) => {
        this.lower_oc2.push(element.lower);
        this.upper_oc2.push(element.upper);
      });
    });

    this.appService.getBPDOC1Hour().subscribe((data: any) => {
      console.log(data.data.reverse());
      data = data.data.reverse();
      data.forEach((element: any) => {
        this.dt_oc1.push(element.min);
        this.std_oc1.push(element.min);
      })

      const minData = Math.min(...data.map((element: any) => element.min));

      const sdev = this.exponentialModel.calculateStandartDeviation(this.std_oc1);
      console.log("sdev :", sdev);

      const average = this.exponentialModel.calculateAverage(this.dt_oc1);
      console.log("average :", average);

      this.actual01 = data.map((element: any) => element.min).reverse();
      console.log("actual :", this.actual01);

      this.forecastData01 = this.exponentialModel.exponentialSmoothing(this.dt_oc1, this.alpha, this.period, sdev, minData);
      console.log("forecastData: ",this.forecastData01);

      this.labels01 = data.map((element: any) => element.datehours);
      this.labels01.reverse();

      this.forecastData01.map((elements: any) => {
        this.lower_oc1.push(this.lower_oc1[0])
        this.upper_oc1.push(this.upper_oc1[0])
      })

      // const forecastData = this.exponentialModel.tripleExponentialSmoothing(this.data, this.alpha, this.beta, this.gamma, this.period);
      // console.log(forecastData);

      const lengthPredict = this.period;

      for (let i = 1; i <= lengthPredict; i++) {
        let date = new Date(this.labels01[this.labels01.length - 1])
        date = set(date, { hours: date.getHours() + 1 })
        // date.setHours(new Date().getHours() + i);
        console.log(this.forecastData01.length - this.labels01.length);

        console.log(i);
        this.labels01.push(format(date, 'yyyy-MM-dd HH:mm'));

      }

      // send notif
       const lastLabel = this.labels01[this.labels01.length - 1];
       const minForecast = this.forecastData01[this.forecastData01.length - 1];
       const line = 'OC1';
       if (minForecast > this.upper_oc1[0] || minForecast < this.lower_oc1[0]) {

         this.appService.bot_BPD(minForecast, lastLabel, line).subscribe((data: any) => {
            console.log(data);
          });
       }

      //  this.ChartOC1();
      this.chart_oc1 = new Chart('chartPredictOC1', {
        type: 'line',
            data: {
              labels: this.labels01,
              datasets: [
                {
                  label: 'Actual',
                  data: this.actual01,
                  borderColor: '#3cba9f',
                  fill: false
                },
                {
                  label: 'Predicted',
                  data: this.forecastData01,
                  borderColor: '#ffcc00',
                  fill: false,
                  cubicInterpolationMode: 'default'
                },
                {
                  label: 'Upper',
                  data: this.upper_oc1,
                  borderColor: '#ff0000',
                  pointRadius: 0,
                  fill: false
                },
                {
                  type: 'line',
                  label: 'Lower',
                  data: this.lower_oc1,
                  borderColor: '#ff0000',
                  pointRadius: 0,
                  fill: false
                },
              ]
            },
            options: {
              plugins: {
                title: {
                  display: true,
                  text: 'Prediction Data BPD OC1'
                },
              },
              interaction: {
                intersect: false,
              },
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true
                  }
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Value'
                  },
                  suggestedMin: 0,
                  suggestedMax: 200,
  
                }
              }
            },
      });

    });

    this.appService.getBPDOC2Hour().subscribe((data: any) => {
      console.log(data);
      data = data.data.reverse();
      data.forEach((element: any) => {
        this.dt_oc2.push(element.min);
        this.std_oc2.push(element.min);
      })

      const minData = Math.min(...data.map((element: any) => element.min));

      const sdev = this.exponentialModel.calculateStandartDeviation(this.std_oc2);
      console.log("sdev :", sdev);

      const average = this.exponentialModel.calculateAverage(this.dt_oc2);
      console.log("average :", average);

      this.actual02 = data.map((element: any) => element.min).reverse();
      console.log("actual :", this.actual02);

      this.forecastData02 = this.exponentialModel.exponentialSmoothing(this.dt_oc2, this.alpha, this.period, sdev, minData);
      console.log("forecastData: ",this.forecastData02);

      this.labels02 = data.map((element: any) => element.datehours);
      this.labels02.reverse();

      this.forecastData02.map((elements: any) => {
        this.lower_oc2.push(this.lower_oc2[0])
        this.upper_oc2.push(this.upper_oc2[0])
      })

      // const this.forecastData02 = this.exponentialModel.tripleExponentialSmoothing(this.data, this.alpha, this.beta, this.gamma, this.period);
      // console.log(this.forecastData02);

      const lengthPredict = this.period;

      console.log(this.labels02)

      for (let i = 1; i <= lengthPredict; i++) {
        let date = new Date(this.labels02[this.labels02.length - 1])
        date = set(date, { hours: date.getHours() + 1 })
        // date.setHours(new Date().getHours() + i);
        console.log(this.forecastData02.length - this.labels02.length);

        console.log(date);
        this.labels02.push(format(date, 'yyyy-MM-dd HH:mm'));

      }

      // send notif
      const lastLabel = this.labels02[this.labels02.length - 1];
      const minForecast = this.forecastData02[this.forecastData02.length - 1];
      const line = 'OC2';
      if (minForecast > this.upper_oc1[0] || minForecast < this.lower_oc1[0]) {

        this.appService.bot_BPD(minForecast, lastLabel, line).subscribe((data: any) => {
           console.log(data);
         });
      }

      // this.ChartOC2();
      this.chart_oc2 = new Chart('chartPredictOC2', {
        type: 'line',
            data: {
              labels: this.labels02,
              datasets: [
                {
                  label: 'Actual',
                  data: this.actual02,
                  borderColor: '#3cba9f',
                  fill: false
                },
                {
                  label: 'Predicted',
                  data: this.forecastData02,
                  borderColor: '#ffcc00',
                  fill: false,
                  cubicInterpolationMode: 'default'
                },
                {
                  label: 'Upper',
                  data: this.upper_oc2,
                  borderColor: '#ff0000',
                  pointRadius: 0,
                  fill: false
                },
                {
                  type: 'line',
                  label: 'Lower',
                  data: this.lower_oc2,
                  borderColor: '#ff0000',
                  pointRadius: 0,
                  fill: false
                },
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Prediction Data BPD OC2'
                },
              },
              interaction: {
                intersect: false,
              },
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true
                  }
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Value'
                  },
                  suggestedMin: 0,
                  suggestedMax: 200,
  
                }
              }
            },
      });      
    });

    this.spinner.hide();

  }

  ChartOC1() {
    this.chart_oc1 = new Chart('chartPredictOC1', {
      type: 'line',
          data: {
            labels: this.labels01,
            datasets: [
              {
                label: 'Actual',
                data: this.actual01,
                borderColor: '#3cba9f',
                fill: false
              },
              {
                label: 'Predicted',
                data: this.forecastData01,
                borderColor: '#ffcc00',
                fill: false,
                cubicInterpolationMode: 'default'
              },
              {
                label: 'Upper',
                data: this.upper_oc1,
                borderColor: '#ff0000',
                pointRadius: 0,
                fill: false
              },
              {
                type: 'line',
                label: 'Lower',
                data: this.lower_oc1,
                borderColor: '#ff0000',
                pointRadius: 0,
                fill: false
              },
            ]
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: 'Prediction Data BPD OC1'
              },
            },
            interaction: {
              intersect: false,
            },
            scales: {
              x: {
                display: true,
                title: {
                  display: true
                }
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Value'
                },
                suggestedMin: 0,
                suggestedMax: 200,

              }
            }
          },
    });
  }

  ChartOC2() {
    this.chart_oc2 = new Chart('chartPredictOC2', {
      type: 'line',
          data: {
            labels: this.labels02,
            datasets: [
              {
                label: 'Actual',
                data: this.actual02,
                borderColor: '#3cba9f',
                fill: false
              },
              {
                label: 'Predicted',
                data: this.forecastData02,
                borderColor: '#ffcc00',
                fill: false,
                cubicInterpolationMode: 'default'
              },
              {
                label: 'Upper',
                data: this.upper_oc2,
                borderColor: '#ff0000',
                pointRadius: 0,
                fill: false
              },
              {
                type: 'line',
                label: 'Lower',
                data: this.lower_oc2,
                borderColor: '#ff0000',
                pointRadius: 0,
                fill: false
              },
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              title: {
                display: true,
                text: 'Prediction Data BPD OC2'
              },
            },
            interaction: {
              intersect: false,
            },
            scales: {
              x: {
                display: true,
                title: {
                  display: true
                }
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Value'
                },
                suggestedMin: 0,
                suggestedMax: 200,

              }
            }
          },
    });
  }



}
