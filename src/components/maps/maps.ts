import { Component, Output, EventEmitter, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

declare var google: any;

@Component({
  selector: 'maps',
  templateUrl: 'maps.html'
})
export class MapsComponent implements AfterViewInit {

  map: any;
  @ViewChild('map') el:ElementRef;


  @Output() getLocation = new EventEmitter();

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {
    var mapCanvas = this.el.nativeElement;
    var myCenter = new google.maps.LatLng(48, 24);
    var mapOptions = {
      center: myCenter,
      zoom: 8
    }
    this.map = new google.maps.Map(mapCanvas, mapOptions);
    this.map.addListener('click', (e) => {
      this.getLocation.emit({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    });
  }

}
