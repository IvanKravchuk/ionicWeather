import { Component } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: [Keyboard]
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private keyboard: Keyboard) {
    this.title = 'Settings';
  }

  city: string;
  title: string;

  showForecastByCity(){
    this.keyboard.close();
    this.navCtrl.push(HomePage, {
      'city': this.city,
      'title': this.title
    });
  }

  showKeyboard(){
    this.keyboard.show();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
