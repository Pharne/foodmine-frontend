import { LatLng } from "leaflet";
import { CartItems } from "./Cart.item.";

export  class Order {
    id!: number;
   items!:CartItems[];
   totalPrice!:number;
   name!:string;
   address!:string;
   addressLatLng?:LatLng;
   paymentId!:string;
   createdAt!:Date;
   status!:string;
}