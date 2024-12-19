import { Component, OnInit } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SearchComponent } from "../../search/search.component";
import { TagsComponent } from "../../partials/tags/tags.component";
import { Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { NotFoundComponent } from "../../partials/not-found/not-found.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SearchComponent, TagsComponent, RouterModule, NotFoundComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  foods:Food[] = [];
  constructor(private foodService:FoodService,activatedRoute:ActivatedRoute){
    let foodObservalbe: Observable<Food[]>
    activatedRoute.params.subscribe((params) => { 
      if(params.searchTerm)
        foodObservalbe = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
      // console.log(this.foods);
      else if (params.tag)
        foodObservalbe = this.foodService.getAllFoodByTag(params.tag)
    else
    foodObservalbe = foodService.getAll();
    foodObservalbe.subscribe((serverFoods) => {
      this.foods = serverFoods;
    }) 
    })
  }
  }
