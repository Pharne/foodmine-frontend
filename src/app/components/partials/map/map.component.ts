import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import L, { icon, LatLng, LatLngTuple, map, Map, marker, tileLayer, TileLayer } from 'leaflet';
import { Order } from '../../../shared/models/Order';

@Component({
  selector: 'map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  private readonly DEFAULT_LATLNG: LatLngTuple = [13.75, 21.62];

  @ViewChild('map', { static: true })
  mapRef!: ElementRef;
  map!: Map;
  @Input()
  order!: Order;

  locationIcon = icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', // Default Leaflet marker icon
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41], // Size of the icon
    iconAnchor: [12, 41], // Anchor point of the icon (at the bottom center)
    popupAnchor: [1, -34], // Position of the popup relative to the icon
    shadowSize: [41, 41] // Size of the shadow
  });

  markerInstance: any;

  ngOnInit(): void {
    this.initializingMap();
  }

  initializingMap(): void {
    if (this.map) return; // Prevent re-initialization

    this.map = map(this.mapRef.nativeElement).setView(this.DEFAULT_LATLNG, 2); // Set initial view and zoom

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Add a click event listener on the map to place a marker
    this.map.on('click', (event) => this.onMapClick(event));
  }

  // Event handler for map click
  onMapClick(event: any): void {
    const userLatLng = event.latlng; // Get the latitude and longitude of the clicked point

    // Remove the existing marker if it exists
    if (this.markerInstance) {
      this.markerInstance.setLatLng(userLatLng); // Move existing marker to the new location
    } else {
      // Create a new draggable marker at the clicked location
      this.markerInstance = marker(userLatLng, { icon: this.locationIcon, draggable: true })
        .addTo(this.map)
        .bindPopup('You clicked here!')
        .openPopup();
    }

    // Center the map on the clicked location
    this.map.setView(userLatLng, 13);

    // Log the clicked marker's new latlng
    console.log('Marker clicked at:', userLatLng);

    // Optional: Listen for drag events and log the new position
    this.markerInstance.on('dragend', (event: { target: { getLatLng: () => any; }; }) => {
      const newLatLng = event.target.getLatLng();
      console.log('Marker moved to:', newLatLng);
    });
  }

  findMyLocation(): void {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const userLatLng: LatLngTuple = [latitude, longitude];

        // Add a marker with the custom location icon and make it draggable
        if (this.markerInstance) {
          // If the marker already exists, update its position instead of adding a new one
          this.markerInstance.setLatLng(userLatLng);
        } else {
          this.markerInstance = marker(userLatLng, { icon: this.locationIcon, draggable: true })
            .addTo(this.map)
            .bindPopup('You are here!')
            .openPopup();
        }

        // Center the map on the user's location
        this.map.setView(userLatLng, 13);

        // Listen for drag events and log the new position
        this.markerInstance.on('dragend', (event: { target: { getLatLng: () => any; }; }) => {
          const newLatLng = event.target.getLatLng();
          console.log('Marker moved to:', newLatLng);
        });
      },
      () => {
        alert('Unable to retrieve your location.');
      }
    );
  }

  set addresLatLng(latlng: LatLng) {
    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
  }
}
