import { IonicPage, NavController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  @ViewChild('map') mapElement;
  map: any;

  constructor(public navCtrl: NavController) {
  }

// Load map only after view is initialized
  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    const latLng = new google.maps.LatLng(33.5883100, -7.6113800);

    const mapOpts = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOpts);
  }
}
