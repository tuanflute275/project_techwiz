import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signupForm: any = FormGroup;
  responseMessage: any;
  account:any = [];



  constructor(private formBuilder: FormBuilder, private router: Router) { }

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
      role: 'user'
    }
    console.log(data);
    let dataAcc = this.account.push(data);
    console.log(this.account);
    //save localStorage
    let jsonAccount = JSON.stringify(this.account);
    localStorage.setItem('account', jsonAccount);
  }

}
