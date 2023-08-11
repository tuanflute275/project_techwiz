import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit{
  ContactForm: any = FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private app: AppService
    ) { }

  ngOnInit(): void {
    this.ContactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      message: [''],
    })
  }
  handleSubmit() {
    let formData = this.ContactForm.value;
    let data = {
      name: formData.name,
      email: formData.email,
      message: formData.message
    };

    console.log(data);
    this.app.postReviewFormContact(data).subscribe(response=>{
      Swal.fire(
        'Thank you!',
        '',
        'success'
      )

    })
  }
}
