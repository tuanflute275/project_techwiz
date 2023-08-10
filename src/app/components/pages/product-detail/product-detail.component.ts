import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { CommentService } from 'src/app/services/comment.service';
import { HeartService } from 'src/app/services/heart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  formPostData: any = FormGroup;
  dataCmt:any = [];
  carts: any = [];
  productDetail:any;
  products: any = [
    {
      "name": "Recycled Frozen Pizza",
      "image": "https://htmldemo.net/lukani/lukani/assets/img/product/product3.jpg",
      "price": 88,
      "sale_price": 15,
      "category_id": 3,
      "id": 5
    },
    {
      "name": "Sleek Rubber Chicken",
      "image": "https://htmldemo.net/lukani/lukani/assets/img/product/product3.jpg",
      "price": 80,
      "sale_price": 8,
      "category_id": 1,
      "id": 6
    },
    {
      "name": "Luxurious Metal Table",
      "image": "https://htmldemo.net/lukani/lukani/assets/img/product/product4.jpg",
      "price": 54,
      "sale_price": 0,
      "category_id": 2,
      "id": 7
    },
    {
      "name": "Handcrafted Cotton",
      "image": "https://htmldemo.net/lukani/lukani/assets/img/product/product6.jpg",
      "price": 71,
      "sale_price": 10,
      "category_id": 1,
      "id": 8
    }
  ];

  constructor(
    private app: AppService,
    private heartService: HeartService,
    private comment: CommentService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {

    this.formPostData = this.formBuilder.group({
      comment: [''],
      name: [''],
      email: [''],
    });

    let id = this.route.snapshot.params['id'];
    this.app.getProductById(id).subscribe(response => {
      console.log('response by id', response)
      this.productDetail = response[0];
    });

    this.fetchCommentAPI()

  }

  fetchCommentAPI(){
    this.comment.getComment().subscribe(response=>{
      this.dataCmt = response;
      console.log(this.dataCmt)
    })
  }

  handleSubmit() {
    let formData = this.formPostData.value;
    let data = {
      comment: formData.comment,
      name: formData.name,
      email: formData.email,
    };

    console.log(data)
    this.comment.postComment(data).subscribe(response=>{
      this.fetchCommentAPI()
      this.formPostData.reset()
    })
  }

  updateCmt(item: any){
    console.log(item)
  }

  removeCmt(id:number) {
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
        this.comment.deleteComment(id).subscribe(response=>{
          this.fetchCommentAPI()
        })
      }
    })
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
}
