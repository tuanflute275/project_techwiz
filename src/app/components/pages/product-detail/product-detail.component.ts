import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { CommentService } from 'src/app/services/comment.service';
import { HeartService } from 'src/app/services/heart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  id: any;
  formPostData: any = FormGroup;
  dataCmt: any = [];
  categories: any = [];
  carts: any = [];
  productDetail: any;
  products: any;

  constructor(
    private app: AppService,
    private heartService: HeartService,
    private comment: CommentService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formPostData = this.formBuilder.group({
      comment: [''],
      name: [''],
      email: [''],
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      window.scrollTo(0, 0);
      // Lấy giá trị của tham số 'id' từ URL
      this.id = params.get('id') as string;

      // Thực hiện các hành động cần thiết dựa trên ID mới
      this.app.getData().subscribe((response: any) => {
        // console.log('response by id', response);
        this.productDetail = response.product.find((prod: any) => prod.id == this.id);
        console.log(response.product.find((prod: any) => prod.id == this.id));

        // this.productDetail = response[0];
        this.getListRelatedProd(this.productDetail.category_id);
      });
    });
    let id = this.route.snapshot.params['id'];

    this.fetchCommentAPI();
    this.getListCategory();
  }

  fetchCommentAPI() {
    this.comment.getComment().subscribe((response) => {
      this.dataCmt = response;
      console.log(this.dataCmt);
    });
  }

  getListCategory() {
    this.app.getData().subscribe((res: any) => {
      console.log(res);
      this.categories = res.category;
    });
  }

  getProductByID(id: any) {

  }

  getListRelatedProd(cateId: any) {
    console.log(cateId);
    this.app.getData().subscribe((response: any) => {
      this.products = response.product.filter((prod: any) => prod.category_id == cateId);
      console.log(this.products);

    });
  }

  handleSubmit() {
    let formData = this.formPostData.value;
    let data = {
      comment: formData.comment,
      name: formData.name,
      email: formData.email,
    };

    console.log(data);
    this.comment.postComment(data).subscribe((response) => {
      this.fetchCommentAPI();
      this.formPostData.reset();
    });
  }

  updateCmt(item: any) {
    console.log(item);
  }

  removeCmt(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        this.comment.deleteComment(id).subscribe((response) => {
          this.fetchCommentAPI();
        });
      }
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
    let idx = this.carts.findIndex((item: any) => item.id === product.id);
    console.log(product);
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
          return this.price * this.quantity;
        },
      };
      Swal.fire('', 'Add to cart successfully !', 'success');
      this.carts.push(cartItem);
    }
    //save storage
    this.app.saveCart(this.carts);
    console.log(this.carts);
  }
}
