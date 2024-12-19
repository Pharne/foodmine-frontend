

import { CartItems } from "./Cart.item.";


export class Cart{
    items:CartItems[]=[];
    //new Cart() undefine {}
    totalPrice:number = 0;
    totalCount:number = 0;
}