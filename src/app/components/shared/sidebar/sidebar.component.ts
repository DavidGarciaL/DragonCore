import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() active: boolean;

  menu = [
    {
      title: 'Dashboard',
      route: 'dashboard',
      submenu: []
    },
    {
      title: 'Catalogs',
      route: false,
      tag: 'catalog',
      submenu: [
        {
          title: 'Goals',
          route: 'goals'
        },
        {
          title: 'Goal types',
          route: 'goalTypes'
        },
        {
          title: 'Incentive plans',
          route: 'incentivePlans'
        },
        {
          title: 'Incentive rules',
          route: 'incentiveRules'
        },
        {
          title: 'Reports',
          route: 'reports'
        },
        {
          title: 'Roles',
          route: 'roles'
        },
        {
          title: 'Teams',
          route: 'teams'
        },
        {
          title: 'Users',
          route: 'users',
        }
      ]
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
