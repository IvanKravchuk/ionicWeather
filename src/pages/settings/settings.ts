import { WeatherProvider } from './../../providers/weather/weather';
import { Component } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';
import { NavController, NavParams, Events, ToastController } from 'ionic-angular';
import { NAMES } from '../../assets/consts/cities';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: [Keyboard]
})
export class SettingsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private keyboard: Keyboard,
    public events: Events,
    private toast: ToastController,
    private wp: WeatherProvider
  ) {
    this.title = 'Settings';
    this.initializeCities();
  }

  ionViewWillEnter() {
    this.wp.getCoordinates().then(coordinates => {
      this.coordinates = coordinates;
    });
  }

  city: string;
  title: string;
  cities: string[];
  showCitiesList: boolean = false;
  coordinates: any;

  initializeCities() {
    this.cities = NAMES;
  }

  getLocation(coordinates) {
    this.showForecastByCoordinatesOnMap(coordinates);
  }

  selectCity(city) {
    this.city = city;
    this.showCitiesList = false;
  }

  getCities() {
    this.initializeCities();
    if (this.city && this.city.trim() != '') {
      this.cities = this.cities.filter((item) => {
        return (item.toLowerCase().indexOf(this.city.toLowerCase()) > -1);
      }).slice(0, 3);
      this.showCitiesList = true;
    } else {
      this.showCitiesList = false;
    }
  }

  showForecastByCity() {
    this.keyboard.close();
    this.events.publish('show-forecast', { 'city': this.city });
    let toast = this.toast.create({
      message: `see forecast for ${this.city} on HomePage`,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true,
      showCloseButton: true,
      closeButtonText: 'ok'
    });
    toast.present();
    this.city = '';
  }

  showForecastByCoordinatesOnMap(coordinates) {
    this.events.publish('show-forecast', { lat: coordinates.lat, lng: coordinates.lng });
    let toast = this.toast.create({
      message: `see forecast for this location on HomePage`,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true,
      showCloseButton: true,
      closeButtonText: 'ok'
    });
    toast.present();
  }

  showKeyboard() {
    this.keyboard.show();
  }

}
