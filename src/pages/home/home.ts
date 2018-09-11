import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  weather: any;
  city: string;
  title: string = 'Home';
  lat: string;
  lng: string;

  constructor(public navCtrl: NavController, private wp: WeatherProvider, public navParams: NavParams, public events: Events) {
    this.events.subscribe('show-forecast', (data) =>{
      this.city = data.city;
      this.lat = data.lat;
      this.lng = data.lng;
    });
  }

  ionViewWillEnter(){
    if(!this.city && !this.lat){
      this.wp.getCoordinates().then(coordinates => {
        this.wp.getCurrentForecastInHoursByCoordinates(coordinates).subscribe(weather => {
          this.city = weather.city.name;
          this.weather = (weather.list as Array<any>).map(item => {
            return { 
              data: item.dt_txt,
              temp: item.main.temp,
              humidity: item.main.humidity,
              pressure: item.main.pressure,
              weather: item.weather[0].description,
              wind_speed: item.wind.speed
            }
          });
        });
      });;
    } else if(this.city) {
      this.wp.getCurrentForecastInHoursByName(this.city).subscribe(weather => {
        this.weather = (weather.list as Array<any>).map(item => {
          return { 
            data: item.dt_txt,
            temp: item.main.temp,
            humidity: item.main.humidity,
            pressure: item.main.pressure,
            weather: item.weather[0].description,
            wind_speed: item.wind.speed
          }
        });
      })
    } else {
      this.wp.getCurrentForecastInHoursByCoordinates({ lat: this.lat, lon: this.lng }).subscribe(weather => {
        this.city = weather.city.name;
        this.weather = (weather.list as Array<any>).map(item => {
          return { 
            data: item.dt_txt,
            temp: item.main.temp,
            humidity: item.main.humidity,
            pressure: item.main.pressure,
            weather: item.weather[0].description,
            wind_speed: item.wind.speed
          }
        });
      });
    }
  }

  showDetails(weatherDetails){
     this.navCtrl.push(DetailsPage, weatherDetails);
  }
}
