import { Component, Output, EventEmitter, OnInit, ElementRef, ViewChild, Input, SimpleChanges } from '@angular/core';

declare var google: any;

@Component({
  selector: 'maps',
  templateUrl: 'maps.html'
})
export class MapsComponent implements OnInit {

  private map: any;
  @Input() coordinates: any;
  @ViewChild('map') el: ElementRef;
  @Output() getLocation = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    let mapCanvas = this.el.nativeElement;
    this.map = new google.maps.Map(mapCanvas);
    this.coordinates.then(coordinates => {
      this.map.setCenter({ lat: coordinates.lat, lng: coordinates.lng });
      this.map.setZoom(8);
      this.map.addListener('click', (e) => {
        this.getLocation.emit({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      });
    });
  }



}
