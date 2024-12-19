import { Component, Input } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'order-items-list',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './order-items-list.component.html',
  styleUrl: './order-items-list.component.css'
})
export class OrderItemsListComponent {
  @Input()
  order!:Order

}
