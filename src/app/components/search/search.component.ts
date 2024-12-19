import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

searchTerm = '';
  // router: any;

constructor(activatedRoute: ActivatedRoute, private router:Router){
  activatedRoute.params.subscribe((params)=>{
    if(params.searchTerm) this.searchTerm = params.searchTerm;
  });
}

  

  search(term:string):void{
    if(term)
    this.router.navigateByUrl('/search/'+ term);
    else
    this.router.navigateByUrl('/');
  }

}
