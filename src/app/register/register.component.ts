import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signupForm: any = FormGroup;
  responseMessage: any;
  account:any = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private app: AppService
    ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      check: ['', Validators.required],
    })
  }

  handleSubmit() {
    let formData = this.signupForm.value;
    var data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }
    console.log(data);

    this.app.singUp(data).subscribe(response=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Sign Up Success',
        showConfirmButton: false,
        timer: 1500
      });
      this.signupForm.reset();
      this.router.navigate(['/login']);
    }, error=>{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Something went wrong !!',
        showConfirmButton: false,
        timer: 1500
      });
    })
  }

}
