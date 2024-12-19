import { Component, OnInit } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { NotFoundComponent } from "../../partials/not-found/not-found.component";
import { TagsComponent } from "../../partials/tags/tags.component";

@Component({
  selector: 'app-food-page',
  standalone: true,
  imports: [CommonModule, RouterModule, NotFoundComponent, TagsComponent],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css'
})
export class FoodPageComponent implements OnInit {

  food!: Food;
  constructor(activatedRoute:ActivatedRoute, foodService:FoodService, private cartService:CartService, private router:Router){
    activatedRoute.params.subscribe((params)=>{
      if(params.id)
        foodService.getFoodById(params.id).subscribe(serverFood => {
          this.food = serverFood;
          console.log(this.food);
        })
    })
  }
  ngOnInit(): void {
      
  }
  addToCart(){
 this.cartService.addToCart(this.food);
 this.router.navigateByUrl('/cart-page');
  }

}
