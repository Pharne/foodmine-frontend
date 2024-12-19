import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
// import { sample_foods, sample_tags } from '../../data';
import { Tag } from '../shared/models/tags';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOOD_BY_ID_URL, FOOD_BY_SEARCH_URL, FOOD_BY_TAG_URL, FOOD_TAGS_URL, FOOD_URL } from '../shared/constants/urls';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }

  


  getAll():Observable <Food[]>{
    return this.http.get<Food[]>(FOOD_URL);
  }

getAllFoodsBySearchTerm(searchTerm:string){
  return this.http.get<Food[]>(FOOD_BY_SEARCH_URL + searchTerm)
}
  getAllTags():Observable<Tag[]>{
  // return sample_tags;
return this.http.get<Tag[]>(FOOD_TAGS_URL);

  }

  getAllFoodByTag(tag: string):Observable<Food[]> {
    return tag === "All" ?
      this.getAll() :
      // this.getAll().filter(food => food.tags?.includes(tag) )
this.http.get<Food[]>(FOOD_BY_TAG_URL + tag)
  }



  getFoodById(foodId:string): Observable<Food>{
   return this.http.get<Food>(FOOD_BY_ID_URL + foodId)
    // return this.getAll().find(food => food.id == foodId) ?? new Food()

  }
}
