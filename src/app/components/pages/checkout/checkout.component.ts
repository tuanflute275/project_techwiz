import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  carts: any = [];
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
  ) { }

  ngOnInit(): void {
    this.carts = this.app.getCarts()
    console.log(this.carts);
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
