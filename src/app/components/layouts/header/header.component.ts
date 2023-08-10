import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  heart: any = 1;
  categories: any = [];
  logo = '../../../../assets/images/logo/logo.jpg'
  avatar = '../../../../assets/images/logo/avatar_admin.jpg'
  u_data: any;

  constructor(private router: Router, private app: AppService) {

  }

  ngOnInit(): void {
    this.getListCategory();
    this.u_data = this.getUData();

  }

  getListCategory() {
    this.app.getCategory().subscribe(res => {
      console.log(res);
      this.categories = res;
    })
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
