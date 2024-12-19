import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cartQuantity = 0;
  user!: User;

  constructor(cartService: CartService, private userService: UserService) {
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    });

    userService.userObservable.subscribe((newUser) => {
      if (newUser) {
        this.user = newUser;
      }
    });
  }

  logout() {
    this.userService.logout();
  }

  get isAuth() {
    // console.log(this.user?.token);
    return this.user?.token; // safely accessing user.token
    
  }
}
