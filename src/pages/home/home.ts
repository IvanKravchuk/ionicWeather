import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  weather:any;
  // location:{
    city:string
  // }

  constructor(public navCtrl: NavController, private wp: WeatherProvider) {

  }

  ionViewWillEnter(){
    // this.location = {
    //   city: 'Lviv'
    // }

    // this.wp.getCurrentForecastInHoursByName(this.location.city).subscribe(weather => {
    //   // console.log(weather.list);
    //   this.weather = (weather.list as Array<any>).map(item => {
    //     return { data: item.dt_txt, temp: item.main.temp }
    //   });
    //   console.log(this.weather);
    // })

    this.wp.getCoordinates().then(coordinates => {
      this.wp.getCurrentForecastInHoursByCoordinates(coordinates).subscribe(weather => {
        console.log(weather);
        this.city = weather.city.name;
        
        this.weather = (weather.list as Array<any>).map(item => {
          return { data: item.dt_txt, temp: item.main.temp }
        });
      });
    });;

  }
}
