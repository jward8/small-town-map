import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

const config = {
  apiKey: "AIzaSyDDb7nWbtpA9Xo7iebkNcFH3ijRkPVQs8g",
  authDomain: "small-town-map.firebaseapp.com",
  projectId: "small-town-map",
  storageBucket: "small-town-map.appspot.com",
  messagingSenderId: "577595118050",
  appId: "1:577595118050:web:05a11c4225b1244705a9bb",
  measurementId: "G-WQYQEEQ37F"
};

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
