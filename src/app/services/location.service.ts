 import { Injectable } from '@angular/core';
import { LatLngLiteral } from 'leaflet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }
  getCurrentLocation():Observable<LatLngLiteral>{
    return new Observable((observer)=>{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
          (position)=>{
            const {latitude,longitude} = position.coords;
            observer.next({lat:latitude,lng:longitude});
            observer.complete();
          },
          (error)=>{
            observer.error(error);
          }
        )
      }else{
        observer.error('Geolocation is not supported by this browser');
      }
    })
  }
}
