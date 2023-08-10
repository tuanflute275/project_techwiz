import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  responseMessage: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private app: AppService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    if (this.getUData()) {
      this.router.navigate(['/']);
    }
  }



  getUData(): any {
    const data = localStorage.getItem("u_data") ? JSON.parse(localStorage.getItem("u_data") as string) : null;
    console.log("data", data);
    return data;
  }

  handleSubmit() {
    let formData = this.loginForm.value;
    let data = {
      email: formData.email,
      password: formData.password,
    };

    console.log(data);
    this.app.login().subscribe(response => {
      const user = response.find((a: any) => {
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if (user) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login success !',
          showConfirmButton: false,
          timer: 1500
        });
        this.loginForm.reset();
        console.log(user);
        localStorage.setItem('u_data', JSON.stringify(user));
        this.router.navigate(['/']);
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'User not found !',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }, error => {
      alert('something went wrong')
    }
    )
  }

  developing() {
    Swal.fire({
      position: 'top-end',
      icon: 'warning',
      title: 'Developing !',
      showConfirmButton: false,
      timer: 1500
    });
  }

}
