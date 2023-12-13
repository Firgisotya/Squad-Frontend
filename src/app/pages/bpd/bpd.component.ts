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


      console.log("actual :", data.map((element: any) => element.min).reverse());

      const forecastData = this.exponentialModel.exponentialSmoothing(this.dt_oc1, this.alpha, this.period, sdev, minData);
      console.log("forecastData: ",forecastData);

      const labels = data.map((element: any) => element.datehours);
      labels.reverse();

      forecastData.map((elements: any) => {
        this.lower_oc1.push(this.lower_oc1[0])
        this.upper_oc1.push(this.upper_oc1[0])
      })

      // const forecastData = this.exponentialModel.tripleExponentialSmoothing(this.data, this.alpha, this.beta, this.gamma, this.period);
      // console.log(forecastData);

      const lengthPredict = this.period;

      for (let i = 1; i <= lengthPredict; i++) {
        let date = new Date(labels[labels.length - 1])
        date = set(date, { hours: date.getHours() + 1 })
        // date.setHours(new Date().getHours() + i);
        console.log(forecastData.length - labels.length);

        console.log(i);
        labels.push(format(date, 'yyyy-MM-dd HH:mm'));

      }

      this.chart_oc1 = new Chart('chartPredictOC1', {
        type: 'line',
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'Actual',
                  data: data.map((element: any) => element.min).reverse(),
                  borderColor: '#3cba9f',
                  fill: false
                },
                {
                  label: 'Predicted',
                  data: forecastData,
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
      console.log(data.data.reverse());
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


      console.log("actual :", data.map((element: any) => element.min).reverse());

      const forecastData = this.exponentialModel.exponentialSmoothing(this.dt_oc2, this.alpha, this.period, sdev, minData);
      console.log("forecastData: ",forecastData);

      const labels = data.map((element: any) => element.datehours);
      labels.reverse();

      forecastData.map((elements: any) => {
        this.lower_oc2.push(this.lower_oc2[0])
        this.upper_oc2.push(this.upper_oc2[0])
      })

      // const forecastData = this.exponentialModel.tripleExponentialSmoothing(this.data, this.alpha, this.beta, this.gamma, this.period);
      // console.log(forecastData);

      const lengthPredict = this.period;

      for (let i = 1; i <= lengthPredict; i++) {
        let date = new Date(labels[labels.length - 1])
        date = set(date, { hours: date.getHours() + 1 })
        // date.setHours(new Date().getHours() + i);
        console.log(forecastData.length - labels.length);

        console.log(i);
        labels.push(format(date, 'yyyy-MM-dd HH:mm'));

      }

      this.chart_oc2 = new Chart('chartPredictOC2', {
        type: 'line',
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'Actual',
                  data: data.map((element: any) => element.min).reverse(),
                  borderColor: '#3cba9f',
                  fill: false
                },
                {
                  label: 'Predicted',
                  data: forecastData,
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
      this.spinner.hide();
    });

  }



}
