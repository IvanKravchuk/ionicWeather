import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { DetailsPage } from '../details/details';
import { TITLES } from '../../assets/consts/titles';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public weather: any;
  public city: string;
  public title: string;
  public lat: string;
  public lng: string;

  constructor(
    public navCtrl: NavController,
    private wp: WeatherProvider,
    public navParams: NavParams,
    public events: Events
  ) {
    this.title = TITLES.home;
    this.events.subscribe('show-forecast', (data) => {
      this.city = data.city;
      this.lat = data.lat;
      this.lng = data.lng;
    });
  }

  ionViewWillEnter() {
    if (!this.city && !this.lat) {
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
    } else if (this.city) {
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

  showDetails(weatherDetails) {
    this.navCtrl.push(DetailsPage, weatherDetails);
  }

  myHeaderFn(record, recordIndex, records) {
    if (records[recordIndex - 1]) {
      if (records[recordIndex - 1].data.slice(0, 10).localeCompare(records[recordIndex].data.slice(0, 10)) == 0) {
        return null;
      }
    }
    return records[recordIndex].data.slice(0, 10);
  }

}
