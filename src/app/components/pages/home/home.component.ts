import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { HeartService } from 'src/app/services/heart.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  page: number = 1;
  products: any = [];
  carts: any = [];
  favs: any = [];
  p: number = 1;
  userName: string = '';
  userFilter: any = { name: '' };
  u_data: any;

  constructor(
    private app: AppService,
    private heartService: HeartService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.u_data = this.getUData();

    this.getAccountData(this.u_data?.id)

    this.fetchProductAPI();
  }

  fetchProductAPI() {
    this.app.getData().subscribe((res: any) => {
      console.log(res);

      this.products = res.product;
    });
  }

  getUData(): any {
    const data = localStorage.getItem("u_data") ? JSON.parse(localStorage.getItem("u_data") as string) : null;
    console.log("data", data);
    return data;
  }


  getAccountData(id: any) {
    this.app.getAccount(id).subscribe(response => {
      this.userName = response[0].name;
      console.log(this.userName)
    });
  }

  onFavorite(product: any) {
    this.favs = localStorage.getItem('heart') ? JSON.parse(localStorage.getItem('heart') as any) : [];
    let idx = this.favs.findIndex((item: any) => item.id === product.id);
    console.log(product);
    if (idx >= 0) {
      this.favs.splice(idx, 1);
      localStorage.setItem('heart', JSON.stringify(this.favs));
      Swal.fire('', 'Remove From favourite successfully !', 'success');
    } else {
      let heartItem: any = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.sale_price ? product.sale_price : product.price
      };
      Swal.fire('', 'Add to favourite successfully !', 'success');
      this.favs.push(heartItem);
      //save storage
      localStorage.setItem('heart', JSON.stringify(this.favs));
    }
  }
  onAddToCart(product: any) {
    this.carts = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') as any) : [];
    let idx = this.carts.findIndex((item: any) => item.id === product.id);
    console.log(product);
    if (idx >= 0) {
      this.carts[idx].quantity += 1;
      this.app.saveCart(this.carts);
      Swal.fire('', 'Add to cart successfully !', 'success');
    } else {
      let cartItem: any = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.sale_price ? product.sale_price : product.price,
        quantity: 1,
        subtotal: function () {
          return this.price * this.quantity;
        },
      };
      Swal.fire('', 'Add to cart successfully !', 'success');
      this.carts.push(cartItem);
          //save storage
    this.app.saveCart(this.carts);
    }

    console.log(this.carts);
  }


  getDetailProduct(id: number) {
    console.log(id);
    this.router.navigate([`/productDetail/${id}`]);
  }

}


