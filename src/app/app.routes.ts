import { Routes,RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { CheckoutPagesComponent } from './components/pages/checkout-pages/checkout-pages.component';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component:HomeComponent
    },
    {
        path:'search/:searchTerm',
        component :HomeComponent
    },{
        path:'tag/:tag',
        component:HomeComponent
    },{
        path:'food/:id',
        component:FoodPageComponent
    },  {
        path:'cart-page', 
        component: CartPageComponent
    },
      {path:'login', component: LoginPageComponent},
      {path:'register', component: RegisterComponent},
      {path:'checkout', component: CheckoutPagesComponent, canActivate:[authGuard]},
];
