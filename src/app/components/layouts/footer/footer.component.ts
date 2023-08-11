import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  formPostData: any = FormGroup;
  logo = '../../../../assets/images/logo/logo.jpg';

  constructor(private app: AppService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formPostData = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  handleSubmit() {
    let formData = this.formPostData.value;
    let data = {
      email: formData.email,
    };
    console.log(data);
    this.app.postEmail(data).subscribe(res => {
      Swal.fire(
        'success',
        'We will contact you in the near future ! ',
        'success'
      )
    })
  }
}
