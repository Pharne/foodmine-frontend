import { Component, OnInit } from '@angular/core';
import { Cart } from '../../../shared/models/Cart';
import { CartService } from '../../../services/cart.service';
import { CartItems } from '../../../shared/models/Cart.item.';
import { TitleComponent } from "../../partials/title/title.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from "../../partials/not-found/not-found.component";

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [TitleComponent, CommonModule, RouterModule, NotFoundComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit{
 cart!:Cart;

  constructor(private cartService:CartService){
 this.cartService.getCartObservable().subscribe((cart)=>{
 this.cart = cart;
 })
  }
  ngOnInit(): void {
      
  }

  removeFromCart(cartItem:CartItems){
    this.cartService.removeFromCart(cartItem.food.id)
  }
  changeQuantity(cartItem:CartItems,quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
  }

}
