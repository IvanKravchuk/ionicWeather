import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
function getWindow (): any {
  return window;
}

@Injectable()
export class WeatherProvider {

  // appid = '25fbfa1ce2c006ee671a84feda01e493';
  private apiKey = '25fbfa1ce2c006ee671a84feda01e493';
  baseUrl = 'https://api.openweathermap.org/data/2.5/';
  // url;

  constructor(public http: Http) { }

  getCurrentForecastInHoursByName(cityName) {
    const type = 'forecast?';
    const search: URLSearchParams = new URLSearchParams();
    search.set('q', cityName);
    search.set('appid', this.apiKey);
    search.set('units', 'metric');
    return this.http.get(this.baseUrl + type + search.toString()).map(res => res.json());
  }

  getCurrentForecastInHoursByCoordinates(coordinates) {
    const type = 'forecast?';
    const search: URLSearchParams = new URLSearchParams();
    search.set('lat', coordinates.lat);
    search.set('lon', coordinates.lon);
    search.set('appid', this.apiKey);
    search.set('units', 'metric');

    return this.http.get(this.baseUrl + type + search.toString()).map(res => res.json());
  }

  getCoordinates() {
    return new Promise(res => {
      this.setCoordinates(coordinates => {
        res(coordinates);
      });
    });
  }

  setCoordinates (callback) {
    const window = getWindow();
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        callback({ lat: position.coords.latitude, lon: position.coords.longitude });
      });
    }
  }

}
