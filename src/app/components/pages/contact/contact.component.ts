import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  ContactForm: any = FormGroup;
  handleSubmit() {
    let formData = this.ContactForm.value;
    let data = {
      name: formData.name,
      email: formData.email,
      message: formData.message
    };

    console.log(data);
  }
}