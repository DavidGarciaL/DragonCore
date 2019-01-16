import { Component, OnInit, Input } from '@angular/core';
import { Alert, AlertType } from 'src/app/models/alert';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() id: string;
  alerts: Alert[] = [];
  message: string;
  css = 'alert hide bg-success text-white';

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getAlert(this.id).subscribe((alert: Alert) => {
      if (!alert.message) {
        // clear alerts when an empty alert is received
        this.alerts = [];
        return;
      }
      this.message = alert.message;
      this.css = 'alert show bg-success text-white';
      setTimeout(() => {
        this.css = 'alert hide bg-success text-white';
      }, 3000);
      // add alert to array
      this.alerts.push(alert);
    });
  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }
}
