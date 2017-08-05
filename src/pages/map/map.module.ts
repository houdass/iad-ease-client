import { NgModule } from '@angular/core';
import { MapPage } from './map';
import { IonicPageModule } from 'ionic-angular';

import { GoogleMaps } from '@ionic-native/google-maps';

@NgModule({
  declarations: [MapPage],
  imports: [IonicPageModule.forChild(MapPage)],
  providers: [
    GoogleMaps
  ]
})
export class MapPageModule {}
