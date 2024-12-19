import { Component, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TitleComponent } from "../../partials/title/title.component";
import { InputContainerComponent } from "../../partials/input-container/input-container.component";
import { InputValidationComponent } from "../../partials/input-validation/input-validation.component";
import { OrderItemsListComponent } from "../../partials/order-items-list/order-items-list.component";
import { MapComponent } from '../../partials/map/map.component';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-checkout-pages',
  standalone: true,
  imports: [
    TitleComponent,
    InputContainerComponent,
    InputValidationComponent,
    OrderItemsListComponent,
    ReactiveFormsModule,
    MapComponent
  ],
  templateUrl: './checkout-pages.component.html',
  styleUrl: './checkout-pages.component.css'
})
export class CheckoutPagesComponent implements OnInit {
  order: Order = new Order();
  checkoutForm!: FormGroup;

  constructor(
    cartService: CartService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router,
    private orderService: OrderService
  ) {
    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit(): void {
    const { name, address } = this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      name: [name, Validators.required],
      address: [address, Validators.required]
    });
  }

  get fc() {
    return this.checkoutForm.controls;
  }

  createOrder() {
    if (this.checkoutForm.invalid) {
      this.toastrService.warning('Please fill all required fields','Invalid Inputs');
      return;
    }
  
    if (!this.order.addressLatLng) {
      this.toastrService.error('Please select your location on the map', 'Location');
      return;
    }
  
    // Assign form values
    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;
  
    console.log('Order Data before payment navigation:', this.order); // Log order data before navigating
  
    // Send order to backend
    this.orderService.create(this.order).subscribe({
      next: () => {
        console.log('Order successfully created:', this.order); // Optional debug: Log after successful creation
        this.router.navigateByUrl('/payment'); // Navigate to payment page
      },
      error: (err) => {
        this.toastrService.error(err.error.message, 'Order Error');
      }
    });
  }
  
  
}
