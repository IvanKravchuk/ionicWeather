import { Component } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';
import { IonicPage, NavController, NavParams, Events, ToastController } from 'ionic-angular';
// import { HomePage } from '../home/home';

declare var google: any;
// @IonicPage()
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
    private toast: ToastController
  ) {
    this.title = 'Settings';
    this.initializeItems();
  }

  city: string;
  title: string;
  items: string[];
  showList: boolean = false;
  private map: any;
  private lat: string;
  private lng: string;

  initializeItems() {
    this.items = [
      'Amsterdam',
      'Berlin',
      'Bueno Aires',
      'Madrid',
      'Paris',
      'Cherkassy',
      'Chernigov',
      'Chernovtsy',
      // 'Crimea',
      'Dnipro',
      'Donetsk',
      'Ivano-Frankivsk',
      'Kharkov',
      'Kherson',
      'Khmelnitsky',
      'Kiev',
      'Kirovograd',
      'Lugansk',
      'Lviv',
      'Nikolaev',
      'Odessa',
      'Poltava',
      'Rivne',
      'Sumy',
      'Ternopil',
      'Vinnitsa',
      // 'Volyn',
      // 'Zakarpattia',
      'Zaporozhye',
      'Zhitomir',
      'Alchevsk',
      'Alushta',
      'Antratsyt',
      'Bakhmut',
      'Berdyansk',
      'Bila Tserkva',
      'Bilhorod-Dnistrovskyi',
      'Bolhrad',
      'Boryspil',
      'Brody',
      'Brovary',
      'Bryanka',
      'Cherkasy',
      'Chernihiv',
      'Chernivtsi',
      'Chervonohrad',
      'Dnipro',
      'Donetsk',
      'Drohobych',
      'Enakievo',
      'Energodar',
      'Evpatoria',
      'Fastiv',
      'Feodosia',
      'Glukhov',
      'Gorlovka',
      'Ivano-Frankivsk',
      'Izmail',
      'Izyum',
      'Kalush',
      'Kamenets Podolskiy',
      'Kamianske',
      'Kerch',
      'Kharkov',
      'Khartsyzsk',
      'Kherson',
      'Khmelnitsky',
      'Kiev',
      'Kolomiya',
      'Konotop',
      'Konstantinovka',
      'Korosten',
      'Kovel',
      'Kramatorsk',
      'Krasnodon',
      'Kremenchug',
      'Kremenets',
      'Krivoy Rog',
      'Kropyvnytskyi',
      'Lisichansk',
      'Lubny',
      'Lugansk',
      'Lutsk',
      'Lviv',
      'Makeevka',
      'Mariupol',
      'Melitopol',
      'Mirgorod',
      'Mukachevo',
      'Nikolaev',
      'Nikopol',
      'Nizhyn',
      'Odessa',
      'Okhtyrka',
      'Oleksandriya',
      'Pavlograd',
      'Pochaev',
      'Poltava',
      'Priluki',
      'Pripyat',
      'Rivne',
      'Romny',
      'Sevastopol',
      'Severodonetsk',
      'Shostka',
      'Simferopol',
      'Slavyansk',
      'Smila',
      'Stakhanov',
      'Stryi',
      'Sudak',
      'Sumy',
      'Svetlovodsk',
      'Ternopil',
      'Truskavets',
      'Uman',
      'Uzhgorod',
      'Vinnitsa',
      'Yalta',
      'Yuzhnoukrainsk',
      'Zaporozhye',
      'Zhitomir',
      'Zhovti Vody'
    ];
  }

  selectItem(item) {
    this.city = item;
  }

  getItems() {
    this.initializeItems();
    if (this.city && this.city.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(this.city.toLowerCase()) > -1);
      }).slice(0, 3);
      this.showList = true;
    } else {
      this.showList = false;
    }
  }

  showForecastByCity() {
    this.keyboard.close();
    this.events.publish('my-message', { 'city': this.city });
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
    this.showList = false;
    // this.navCtrl.push(HomePage, {
    //   'city': this.city,
    //   'title': this.title
    // });
  }

  showForecastByCoordinatesOnMap() {
    this.events.publish('my-message', { 'lat': this.lat, 'lng': this.lng });
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

  ionViewDidEnter() {
    console.log('ionViewDidLoad SettingsPage');
    this.initMap();
  }

  public initMap(): void {
    console.log("qwe");
    var mapCanvas = document.getElementById("map");
    // var marker = new google.maps.Marker();
    var myCenter = new google.maps.LatLng(48, 24);
    var mapOptions = {
      center: myCenter,
      zoom: 8
    }
    this.map = new google.maps.Map(mapCanvas, mapOptions);
    this.map.addListener('click', (e) => {
      this.lat = e.latLng.lat();
      this.lng = e.latLng.lng();
      this.showForecastByCoordinatesOnMap();
      console.log(e.latLng.lat() + '_______' + e.latLng.lng());
    });
  }

}
