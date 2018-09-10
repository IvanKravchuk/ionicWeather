import { Component } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
// import { HomePage } from '../home/home';

declare var google: any;
// @IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: [Keyboard]
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private keyboard: Keyboard, public events: Events) {
    this.title = 'Settings';
  }

  city: string;
  title: string;
  private map: any;
  private lat: string;
  private lng: string;

  showForecastByCity(){
    this.keyboard.close();
    this.events.publish('my-message', { 'city': this.city });
    this.city = '';
    // this.navCtrl.push(HomePage, {
    //   'city': this.city,
    //   'title': this.title
    // });
  }

  showForecastByCoordinatesOnMap(){
    this.events.publish('my-message', { 'lat': this.lat, 'lng': this.lng });
  }

  showKeyboard(){
    this.keyboard.show();
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad SettingsPage');
    this.initMap();
  }

  public initMap(): void {
    console.log("qwe");
    var mapCanvas = document.getElementById("map");
    // var marker = new google.maps.Marker();
    var myCenter = new google.maps.LatLng(48,24);
    var mapOptions = {
        center: myCenter,
        zoom: 8
    }
    this.map = new google.maps.Map(mapCanvas, mapOptions);
    this.map.addListener('click', (e) => {
      this.lat = e.latLng.lat();
      this.lng = e.latLng.lng();
      this.showForecastByCoordinatesOnMap();
      console.log(e.latLng.lat()+ '_______' + e.latLng.lng());
    });
  }

}
