import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { HeartService } from 'src/app/services/heart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  page:number = 1;
  products:any = [];
  carts: any =  [];

  constructor(
    private app:AppService,
    private heartService: HeartService,
    private router:Router
    ){}

  ngOnInit(): void {
    this.fetchProductAPI();
  }

  fetchProductAPI() {
    this.app.getProduct().subscribe(response => {
      this.products = response;
    });
  }

  onFavorite(product: number) {
    console.log(product)
    Swal.fire(
      '',
      'Add to heart successfully !',
      'success'
    )
    this.heartService.postHeart(product).subscribe(response=>{
      this.heartService.getHeart().subscribe(data=>{
        console.log(data)
      })
    })
  }
  onAddToCart(product: any) {
    let idx = this.carts.findIndex((item: any) => item.id === product.id)
    console.log(product)
    if (idx >= 0) {
      this.carts[idx].quantity += 1;
    } else {

      let cartItem: any = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.sale_price ? product.sale_price : product.price,
        quantity: 1,
        subtotal: function () {
          return this.price * this.quantity
        }
      }
      Swal.fire(
        '',
        'Add to cart successfully !',
        'success'
      )
      this.carts.push(cartItem)
    }
    //save storage
    this.app.saveCart(this.carts)
    console.log(this.carts);

  }

  getDetailProduct(id:number){
    console.log(id);
    this.router.navigate([`/productDetail/${id}`]);
  }
}
