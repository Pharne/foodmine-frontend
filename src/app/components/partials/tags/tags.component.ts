import { Component, OnInit } from '@angular/core';
import { Tag } from '../../../shared/models/tags';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent implements OnInit {

  tags?:Tag[];
  constructor( foodService:FoodService){ 
    //  foodService.getAllTags()
   foodService.getAllTags().subscribe((serverTags) => {
    this.tags = serverTags;
   })
  
  }


  ngOnInit(): void {
      
  }
}
