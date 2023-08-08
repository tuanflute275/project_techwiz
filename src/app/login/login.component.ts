import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      // email:[null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  handleSubmit() {
    let formData = this.loginForm.value;
    let data = {
      email: formData.email,
      password: formData.password,
      role: 'users'
    };
    // this.userService.login(data).subscribe(
    //   (response: any) => {
    //     console.log(response);

    //     let user = localStorage.setItem('token', response.token);
    //     console.log(user);

    //     // switch (user.role) {
    //     //   case 'admin':
    //     //     return this.router.navigate(['/dashboard']);
    //     //   case 'user':
    //     //     return this.router.navigateByUrl('/home');
    //     //   default:
    //     //     return this.router.navigateByUrl('/');
    //     // }
    //   }
    // );
    console.log(data);
    let accObject = localStorage.getItem('account');
    // let dataAccount = JSON.parse(accObject);
    console.log(accObject)
    // if(dataAccount.email == data.email)

    // localStorage.setItem('token', jsonObject);
  }

  developing() {
    // this.toastr.error('developing !!!')
    alert('opps')
  }

}
