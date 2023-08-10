import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  carts: any = [];
  logo = '../../../assets/images/logo.jpg';
  avatar = '../../../assets/img/avatars/avatar_admin.jpg'
  home1 = '../../../assets/images/home1.jpg'
  home2 = '../../../assets/images/home2.jpg'
  home3 = '../../../assets/images/home3.jpg'

  constructor(private router: Router, private app:AppService) { }
  ngOnInit(): void {

    this.carts = this.app.getCarts()
  }
  subtotal(item: any) {
    return item.quantity * item.price
  }
  updateQuantity(idx: number, e: any) {
    let newQuantity = e.target.value
    newQuantity = newQuantity > 0 ? newQuantity : 1
    newQuantity = newQuantity <= 100 ? newQuantity : 100
    this.carts[idx].quantity = newQuantity;
    this.app.saveCart(this.carts)
  }
  handleMinus(idx: number, quantity: number) {
    let newQtt = quantity - 1;
    newQtt = newQtt > 0 ? newQtt : 1
    newQtt = newQtt <= 100 ? newQtt : 100
    this.carts[idx].quantity = newQtt
    console.log(newQtt)
    this.app.saveCart(this.carts)
  }
  handlePlus(idx: number, quantity: number) {
    let newQtt = quantity + 1;
    newQtt = newQtt > 0 ? newQtt : 1
    newQtt = newQtt <= 100 ? newQtt : 100
    this.carts[idx].quantity = newQtt
    console.log(newQtt)
    this.app.saveCart(this.carts)
  }
  removeCart(idx: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.carts.splice(idx, 1);
        this.app.saveCart(this.carts)
      }
    })
  }
}
