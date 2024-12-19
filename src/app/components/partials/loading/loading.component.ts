import { Component } from '@angular/core';
import { LoadingService } from '../../../services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  isLoading!: boolean;
  constructor(loadingService: LoadingService) {
    loadingService.isLoading$.subscribe((loading) => {
      this.isLoading = loading;
    }); 

    // loadingService.showLoading(); 
   }

}
