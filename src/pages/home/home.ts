import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  weather:any;
  city:string;
  title:string = 'Home';

  constructor(public navCtrl: NavController, private wp: WeatherProvider, public navParams: NavParams) {
    this.city = navParams.get('city');
    this.title = navParams.get('title');
    console.log(navParams.get('title'));
  }

  ionViewWillEnter(){
    if(!this.city){
      this.wp.getCoordinates().then(coordinates => {
        this.wp.getCurrentForecastInHoursByCoordinates(coordinates).subscribe(weather => {
          this.city = weather.city.name;
          this.weather = (weather.list as Array<any>).map(item => {
            return { data: item.dt_txt, temp: item.main.temp }
          });
        });
      });;
    } else {
      this.wp.getCurrentForecastInHoursByName(this.city).subscribe(weather => {
        this.weather = (weather.list as Array<any>).map(item => {
          return { data: item.dt_txt, temp: item.main.temp }
        });
      })
    }
  }
}
