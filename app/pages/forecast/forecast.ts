import {NavController, NavParams} from 'ionic-angular';
import {Weather} from '../../providers/weather/weather';
import {TemperaturePipe} from '../../pipes/temperature';
import {Component} from '@angular/core';

@Component({
  templateUrl: 'build/pages/forecast/forecast.html',
  pipes: [TemperaturePipe]
})
export class ForecastPage {
  public cityWeather;
  public forecast = [];
  
  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public weather: Weather) {
    this.cityWeather = this.navParams.get('cityWeather');
    this.getForecast(this.cityWeather.id);
  }
  
  getForecast(cityId) {
    this.weather.forecast(cityId, 7)
      .map(data => data.json())
      .subscribe(
        data => {
          this.forecast = data.list;
        },
        err => console.log('err: ' + err),
        () => console.log('forecast complete')
      )
  }
}
