import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { HeartService } from 'src/app/services/heart.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-heart',
  templateUrl: './heart.component.html',
  styleUrls: ['./heart.component.scss']
})
export class HeartComponent implements OnInit{
  avatar = '../../../../assets/images/user_default.jpg'
  favorites: any = [];

  constructor(
    private router: Router,
    private heartService: HeartService,
  ) { }

  ngOnInit(): void {
    this.getAllHeart()
  }

  getAllHeart(){
    this.favorites = this.heartService.getHeart();
  }

  removeFavorite(id: number) {
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
        this.heartService.deleteHeart(id).subscribe(response => {
          console.log(response)
          this.getAllHeart()
        })
      }
    })
  }

  getDetailProduct(id:number){
    console.log(id);
    this.router.navigate([`/productDetail/${id}`]);
  }
}
