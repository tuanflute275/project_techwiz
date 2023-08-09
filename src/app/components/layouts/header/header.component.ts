import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  heart: any = 1;
  logo = '../../../../assets/images/logo/logo.jpg'
  avatar = '../../../../assets/images/logo/avatar_admin.jpg'

  constructor(private router: Router){}

  search() {
  }
  upload() {
  }
  logout() {
    localStorage.removeItem("u_data");
    alert('Logout Successfully !');
    this.router.navigate(['/login']);
  }

}