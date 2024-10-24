import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  menuItems = [
      { label: 'Home', icon: 'home' },
      { label: 'About', icon: 'info' },
      { label: 'Contact', icon: 'contact_phone' },
      // Add more menu items as needed
    ];
}
