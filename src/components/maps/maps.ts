import { Component, Output, EventEmitter, OnChanges, ElementRef, ViewChild, Input } from '@angular/core';

declare var google: any;

@Component({
  selector: 'maps',
  templateUrl: 'maps.html'
})
export class MapsComponent implements OnChanges {

  map: any;
  @Input() coordinates: any;
  @ViewChild('map') el: ElementRef;


  @Output() getLocation = new EventEmitter();

  constructor() { }

  ngOnChanges(): void {
    if (this.coordinates) {
      this.initMap(this.coordinates);
    }
  }

  initMap(c): void {
    let mapCanvas = this.el.nativeElement;
    // var myCenter = new google.maps.LatLng(48, 24);
    let myCenter = new google.maps.LatLng(c.lat, c.lng);
    let mapOptions = {
      center: myCenter,
      zoom: 8
    }
    this.map = new google.maps.Map(mapCanvas, mapOptions);
    this.map.addListener('click', (e) => {
      this.getLocation.emit({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    });
  }

}
