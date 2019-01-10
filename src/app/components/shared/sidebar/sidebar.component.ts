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
      submenu: [
        {
          title: 'Users',
          route: 'users',
        },
        {
          title: 'Tarifas',
          router: 'tarifas'
        }
      ]
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
