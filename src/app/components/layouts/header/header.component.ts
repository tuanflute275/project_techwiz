import { Component } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  heart: any = 1;
  logo = '../../../assets/images/logo.jpg';
  avatar = '../../../assets/img/avatars/avatar_admin.jpg'

  logout(){
    
  }
}