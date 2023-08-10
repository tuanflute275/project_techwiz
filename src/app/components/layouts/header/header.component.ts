import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  heart: any = 1;
  logo = '../../../../assets/images/logo/logo.jpg'
  avatar = '../../../../assets/images/logo/avatar_admin.jpg'
  u_data: any;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.u_data = this.getUData();
  }

  getUData(): any {
    const data = localStorage.getItem("u_data") ? JSON.parse(localStorage.getItem("u_data") as string) : null;
    console.log("data", data);
    return data;
  }

  search() {
  }
  upload() {
  }
  async logout() {
    const resullt = await Swal.fire({
      title: 'Do you want to log out ?',
      showCancelButton: true,
      confirmButtonText: 'Accept',
    });
    if (resullt.isConfirmed) {
      localStorage.removeItem("u_data");
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Logout Successfully !',
        showConfirmButton: false,
        timer: 1500
      })
      this.u_data = null;
    }
  }

}
