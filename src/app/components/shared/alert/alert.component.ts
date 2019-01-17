import { Component, OnInit, Input } from '@angular/core';
import { Alert, AlertType } from 'src/app/models/alert';
import { AlertService } from 'src/app/services/alert.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


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

  // Icons
  faTimes = faTimes;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getAlert(this.id).subscribe((alert: Alert) => {
      if (!alert.message) {
        // clear alerts when an empty alert is received
        this.alerts = [];
        return;
      }
      this.message = alert.message;
      switch (alert.type) {
        case AlertType.Success:
          this.css = 'alert show bg-success text-white';
          break;
        case AlertType.Error:
          this.css = 'alert show bg-danger text-white';
          break;
        case AlertType.Info:
          this.css = 'alert show bg-info text-white';    
          break;
        case AlertType.Warning:
          this.css = 'alert show bg-warning text-white';
          break;
        default:
          break;
      }

      setTimeout(() => {
        this.css = 'alert hide bg-success text-white';
      }, 3000);
      // add alert to array
      this.alerts.push(alert);
    });
  }

  close() {
    this.css = 'alert hide bg-success text-white';
  }
}
