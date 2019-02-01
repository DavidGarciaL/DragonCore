import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUser } from 'src/app/models/iuser';
import { ITeam, Team } from 'src/app/models/iteam';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { EventService } from 'src/app/services/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  form: FormGroup;
  subscriptions = [];
  id: number;
  isAdd = true;
  teamLeaders: IUser[];
  team: ITeam = {
    id: null,
    name: null,
    teamLeader: null
  };

  // Nav Config
  navConfig = {
    title: "Team detail",
    showBackButton: true,
    showSaveButton: true
  }

  constructor(private _teamService: TeamService,
    private _userService: UserService,
    private _eventService: EventService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _alertService: AlertService,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.id = params.id;
      if (this.id != null)
        this.isAdd = false;
    });

    this.configuration();
    this.getDataForSelectBox();
    this.buildForm();

    if (!this.isAdd) {
      this._teamService.getById(this.id)
        .subscribe((team: ITeam) => {
          this.team = team;
          this.form.patchValue(this.team);
        })
    }
  }

  configuration() {
    document.getElementById("first").focus();

    this._eventService.emitNavConfig(this.navConfig);
    this.subscriptions.push(
      this._eventService.getBackButtonEmitter()
        .subscribe(() => this.back())
    );

    this.subscriptions.push(
      this._eventService.getSaveButtonEmitter()
        .subscribe(() => {
          this.onSubmit();
        })
    );
  }

  getDataForSelectBox() {

    this._userService.get()
      .subscribe((success: any) => this.teamLeaders = success);
  }

  buildForm() {
    this.form = this._formBuilder.group({
      name: [this.team.name, Validators.required],
      teamLeader: [this.team.teamLeader, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.team = new Team(this.id, this.form.value);
      if (this.isAdd) {
        this._teamService.create(this.team)
          .subscribe(() => {
            this._router.navigate(['teams']);
            this._alertService.success('Team successfully added');
          });
      } else {
        this._teamService.update(this.id, this.team)
          .subscribe(() => {
            this._router.navigate(['teams']);
            this._alertService.success('Team successfully upgraded');
          });
      }
    } else {
      this._alertService.error('Please check your info');
    }
  }

  get f() { return this.form.controls; }

  back() {
    this._router.navigate(['teams']);
  }

  ngOnDestroy() {
    this._eventService.emitNavConfig({});
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
  }
}
