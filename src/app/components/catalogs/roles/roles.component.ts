import { Component, OnInit } from '@angular/core';
import { IRole } from 'src/app/models/irole';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { Columns } from 'src/app/config/columns';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles: IRole[] = [];
  rolesAux: IRole[] = [];
  columns: any;
  subscriptions: any[] = [];
  pages: any[] = [];
  currentPage: number = 1;
  currentRoleCount: number;
  currentRoles: IRole[] = [];

  // Nav Config
  navConfig = {
    title: 'Roles',
    showSearch: true
  }

  constructor(private _roleService: RoleService,
    private _eventService: EventService,
    private _router: Router,
    private _alertService: AlertService) { }

  ngOnInit() {
    this._eventService.emitLoading(true);
    this._eventService.emitNavConfig(this.navConfig);

    this.getData();
    this.search();

    this.columns = Columns.role;
  }

  getData() {
    this._roleService.get()
      .subscribe((data: any) => {
        this.roles = data;
        this.rolesAux = this.roles;
        this.currentRoles = this.roles;
        this.currentRoleCount = this.roles.length;
        this.paging(1);
        this._eventService.emitLoading(false);
      });
  }

  add() {
    this._router.navigate(['role-detail']);
  }

  edit(id) {
    this._router.navigate(['role-detail', id]);
  }

  search() {
    this.subscriptions.push(
      this._eventService.getSearchEmitter()
        .subscribe(textSearch => {
          this.roles = this.rolesAux;
          this.roles = this.roles.filter((f) => {
            for (const column of this.columns) {
              if (String(f[column.code]).includes(textSearch)) {
                return f;
              }
            }
          });
          this.currentRoleCount = this.roles.length;
          this.currentRoles = this.roles;
          this.paging(1);
        })
    );
  }

  remove(id) {
    this._roleService.delete(id)
      .subscribe(() => {
        this.getData();
        this._alertService.success('Role succsessfully deleted');
      })
  }

  paging(pageNumber) {
    this.currentPage = pageNumber;
    this.pages = [];
    let numItems = 5;
    let page = pageNumber;
    let start = (page * numItems) - numItems;
    let limit = page * numItems;
    let filter: any[] = [];
    let pages: number;

    for (let i = start; i < limit; i++) {
      if (i < this.currentRoleCount) {
        filter.push(this.currentRoles[i]);
      }
    }

    pages = this.residuo(numItems);

    for (let i = 0; i < pages; i++) {
      this.pages.push({ pageNumber: (i + 1) });
    }

    this.roles = filter;
  }

  residuo(numItems: number): number {
    let pages = this.currentRoleCount / numItems;
    let pagesCast = pages.toString();
    let pageSplit = pagesCast.split('.');
    pages = Number(pageSplit[0]);
    if (pagesCast.includes('.')) {
      pages++;
    }
    return pages;
  }

  ngOnDestroy() {
    this._eventService.emitNavConfig({});
  }
}
