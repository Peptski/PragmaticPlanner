import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ACCESS } from './auth.service';
import { Stop } from './stop.model';
import { Trip } from './trip.model';

@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private http: HttpClient) {}

  _stops: number[] = [];
  _trips: Trip[] = [];

  tripsUpdated = new EventEmitter<Trip[]>();
  searchUpdated = new EventEmitter<Stop[]>();

  get trips() {
    return this._trips;
  }

  patternMatching(keyword: string, index: number) {
    this.http
      .get<{ LocationList: { StopLocation: Stop[] } }>(
        `https://api.vasttrafik.se/bin/rest.exe/v2/location.name?input=${keyword}&format=json`,
        { headers: new HttpHeaders({ Authorization: `Bearer ${API_ACCESS}` }) }
      )
      .subscribe((response) => {
        this.searchUpdated.emit(response.LocationList.StopLocation);
        this.setStop(response.LocationList.StopLocation[0].id, index);
        console.log(this._stops);
      });
  }

  searchTrip() {
    this.http
      .get<{ TripList: { Trip: Trip[] } }>(
        `https://api.vasttrafik.se/bin/rest.exe/v2/trip?originId=${this._stops[0]}&destId=${this._stops[1]}&format=json`,
        {
          headers: new HttpHeaders({ Authorization: `Bearer ${API_ACCESS}` }),
        }
      )
      .subscribe((response) => {
        this._trips = response.TripList.Trip;
        this.tripsUpdated.emit(this.trips);
      });
    setTimeout(() => {
      console.log(this._trips);
    }, 1000);
  }

  setStop(stopId: number, index: number) {
    this._stops[index] = stopId;
  }
}
