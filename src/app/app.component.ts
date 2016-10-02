import { Component } from '@angular/core';
import { google } from './google';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  title: string = 'My first angular2-google-maps project';
  lat: number = 51.678418;
  lng: number = 7.809007;
  
  directions: any; 
  directionsDisplay: any;
  geocoder: any;
  directionsService: any; 
  map: any;
  
  ngOnInit(): void {
                  
    // instantiate google map objects for directions
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.directionsService = new google.maps.DirectionsService();
    this.geocoder = new google.maps.Geocoder();

    // directions object -- with defaults
    this.directions = {
        origin: "Prestige Tech Park, Bangalore",
        destination: "Jayanagar, Bangalore",
        showList: false
    }
    // map object -- with defaults
    this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: {lat: 12.9716, lng: 77.5946}
    });
                }

    // get directions using google maps api
  getDirections(): any {
    let request = {
      origin: this.directions.origin,
      destination: this.directions.destination,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    this.getRoute(request)
    .subscribe(
              data => {
                    console.log('Success ', data);
                    this.directionsDisplay.setDirections(data);
                    this.directionsDisplay.setMap(this.map);
                    this.directionsDisplay.setPanel(document.getElementById('directionsList'));
              },
              error => {
                  console.log('Error in fetching accounts ', error);
              }
          );
  }
 
  

   getRoute (request: any): Observable<any> {

        return Observable.create(observer => {
          new google.maps.DirectionsService().route(request,
           (response: any, status: string) =>  {
             console.log(response);
                if (status === 'OK') {
                    observer.next(response);
                    observer.complete();
                } else {
                  observer.error(response);
                }
          });
        });
   }
}
