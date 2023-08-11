import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  u_data: any;
  cart:number = 1;
  heart: number = 1;
  categories: any = [];
  userName: string = '';
  logo = '../../../../assets/images/logo/logo.jpg'
  avatar = '../../../../assets/images/user_default.jpg'
  postFormSearch: FormGroup = new FormGroup({
    name: new FormControl('')
  });

  constructor(private router: Router, private app: AppService) {

  }

  ngOnInit(): void {
    this.getListCategory();
    this.u_data = this.getUData();

  }

  getListCategory() {
    this.app.getData().subscribe((res: any) => {
      console.log(res);
      this.categories = res.category;
    });
  }

  getUData(): any {
    const data = localStorage.getItem("u_data") ? JSON.parse(localStorage.getItem("u_data") as string) : null;
    console.log("data", data);
    return data;
  }



  submitSearch() {
    let data = this.postFormSearch.value.name
    console.log(data)
    this.router.navigate([`/shop`]);
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
