import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent implements OnInit {

  constructor(){}
  @Input()
  title!: string;

  @Input()
  margin?:'1rem 0 1rem 0.2rem'


  @Input()
  fontSize? :'1.7rem'




  ngOnInit(): void {
      
  }
}
