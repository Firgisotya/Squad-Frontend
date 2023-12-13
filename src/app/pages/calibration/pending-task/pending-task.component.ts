import { Component } from '@angular/core';
import { CalibrationService } from 'src/app/services/calibration/calibration.service';

@Component({
  selector: 'app-pending-task',
  templateUrl: './pending-task.component.html',
  styleUrls: ['./pending-task.component.css']
})
export class PendingTaskComponent {
  p: string|number|undefined;

  constructor (private appService: CalibrationService) { }

  data: any = [];

  ngOnInit() {
    this.appService.getAllPendingTask().subscribe((res: any) => {
      console.log(res);
      
      this.data = res.data;
      console.log(this.data);

    });
  }

}
