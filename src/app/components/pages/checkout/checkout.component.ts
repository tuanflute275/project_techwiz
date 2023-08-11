import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { AppService } from 'src/app/services/app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  carts: any = [];
  checkOutForm: any = FormGroup;


  totalQuantity: number = this.app.getCartTotalQuantity()
  totalPrice: number = this.app.getCartTotalPrice()
  logo = '../../../assets/images/logo.jpg';
  avatar = '../../../assets/img/avatars/avatar_admin.jpg'
  home1 = '../../../assets/images/home1.jpg'
  home2 = '../../../assets/images/home2.jpg'
  home3 = '../../../assets/images/home3.jpg'

  constructor(
    private router: Router,
    private app: AppService,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.carts = this.app.getCarts()
    console.log(this.carts);

    this.checkOutForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      company: ['', [Validators.required]],
      inputCity: ['', [Validators.required]],
      state: ['', [Validators.required]],
      inputZip: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
    console.log(this.checkOutForm.controls);
  }

  handleSubmit() {
    let formData = this.checkOutForm.value;
    let data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      company: formData.company,
      inputCity: formData.inputCity,
      state: formData.state,
      inputZip: formData.inputZip,
      phone: formData.phone,
    };
  }

  subtotal(item: any) {
    return item.quantity * item.price
  }
  pay() {
    Swal.fire(
      '',
      'successfully purchase !',
      'success'
    )
  }

}
