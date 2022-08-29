import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ACCESS } from '../utils/auth.service';
import { Stop } from '../utils/stop.model';
import { Trip } from '../utils/trip.model';

@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private http: HttpClient) {}

  _stops: number[] = [];
  _trips: Trip[] = [];

  tripsUpdated = new EventEmitter<Trip[]>();
  searchUpdated = new EventEmitter<Stop[]>();
  performSearch = new EventEmitter<boolean>();

  get trips() {
    return this._trips;
  }

  patternMatching(keyword: string, index: number) {
    this.http
      .get<{ LocationList: { StopLocation: Stop[] | Stop } }>(
        `https://api.vasttrafik.se/bin/rest.exe/v2/location.name?input=${keyword}&format=json`,
        { headers: new HttpHeaders({ Authorization: `Bearer ${API_ACCESS}` }) }
      )
      .subscribe((response) => {
        if (!Array.isArray(response.LocationList.StopLocation))
          response.LocationList.StopLocation = [
            response.LocationList.StopLocation,
          ];

        this.searchUpdated.emit(response.LocationList.StopLocation);
        this.setStop(response.LocationList.StopLocation[0].id, index);
        console.log(this._stops);
      });
  }

  searchTrip(mode: string, time: string, date: string) {
    console.log('test');
    return this.http.get<{ TripList: { Trip: Trip[] } }>(
      `https://api.vasttrafik.se/bin/rest.exe/v2/trip?originId=${
        this._stops[0]
      }&destId=${this._stops[1]}&date=${date}&time=${time}${
        mode === 'arrival' ? '&searchForArrival=1' : ''
      }
        &format=json`,
      {
        headers: new HttpHeaders({ Authorization: `Bearer ${API_ACCESS}` }),
      }
    );
  }

  setStop(stopId: number, index: number) {
    this._stops[index] = stopId;
  }
}
