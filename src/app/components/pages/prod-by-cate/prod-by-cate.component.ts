import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LabelType, Options } from 'ng5-slider';
import { take } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { HeartService } from 'src/app/services/heart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prod-by-cate',
  templateUrl: './prod-by-cate.component.html',
  styleUrls: ['./prod-by-cate.component.scss'],
})
export class ProdByCateComponent implements OnInit {
  id: any;
  page: number = 1;
  pageSize: number = 9;
  results: number = 1;
  products: any = [];
  carts: any = [];
  userFilter: any = { name: '' };
  category: any;
  categories: any = [];
  productFormSearch: FormGroup = new FormGroup({
    name: new FormControl(''),
  });

  minPrice: number = 0;
  maxPrice: number = 0;
  filteredProducts: any = [];

  // Slider Options
  minValue: number = 0;
  maxValue: number = 100;
  options: Options = {
    floor: 0,
    ceil: 100,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          this.minPrice = value;

          return '<b>Min price:</b> Rs. ' + value;
        case LabelType.High:
          this.maxPrice = value;
          return '<b>Max price:</b> Rs. ' + value;
        default:
          return 'Rs. ' + value;
      }
    },
  };

  // END Slider Options

  constructor(
    private app: AppService,
    private heartService: HeartService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      // Lấy giá trị của tham số 'id' từ URL
      this.id = params.get('id') as string;

      this.fetchProductAPI(+this.id);
      this.fetchCategoryAPI(+this.id);
    });
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.getListCategory();
  }

  darkMode = false;

  toggleTheme() {
    this.darkMode = !this.darkMode;
    document.documentElement.setAttribute(
      'data-theme',
      this.darkMode ? 'dark' : 'light'
    );
  }

  reset(){
    this.fetchProductAPI(this.id)
  }

  filterProductsByPrice() {
    this.products = this.products.filter(
      (product: any) =>
        product.price >= this.minPrice && product.price <= this.maxPrice
    );
  }

  getListCategory() {
    this.app.getData().subscribe((res: any) => {
      console.log(res);
      this.categories = res.category;
    });
  }

  fetchCategoryAPI(cateID: any) {
    this.app.getData().subscribe((res: any) => {
      console.log(res);
      this.category = res.category.find((cate: any) => cate.id === cateID);
    });
  }

  fetchProductAPI(cateID: any) {
    this.app.getData().subscribe((res: any) => {
      console.log(res);
      console.log(res.product.filter((prod: any) => prod.category_id == cateID));

      this.products = res.product.filter((prod: any) => prod.category_id == cateID);
    });
  }

  submitSearch() {
    let data = this.productFormSearch.value.name;
    this.app.searchProduct(data).subscribe((response: any) => {
      this.products = response;
    });
  }

  sortBy(name_sort: string, type_sort: string){
    console.log({
      name_sort,
      type_sort
    });

    let compare = (a: any, b: any) => {
      if (name_sort == "name") {
        return (type_sort == "desc") ? (a.name - b.name) : (b.name - a.name);
      }
      if (name_sort == "price") {
        return (type_sort == "desc") ? (a.price - b.price) : (b.price - a.price);
      }
      return b.id - a.id;
    };
    console.log(this.products.sort(compare));

    this.products.sort((a: any, b : any) => compare(a.price, b.price || b.price));
  }

  handlePerPage(perPage: number){
    console.log(perPage)
    this.pageSize = perPage
  }

  onFavorite(product: number) {
    console.log(product);
    Swal.fire('', 'Add to heart successfully !', 'success');
    this.heartService.postHeart(product).subscribe((response) => {
      this.heartService.getHeart().subscribe((data) => {
        console.log(data);
      });
    });
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

  getDetailProduct(id: number) {
    console.log(id);
    this.router.navigate([`/productDetail/${id}`]);
  }
}
