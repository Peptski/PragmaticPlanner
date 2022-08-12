import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ACCESS } from './auth.service';
import { Trip } from './trip.model';
import { Stop } from './stop.model';

@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private http: HttpClient) {}

  _trips: Trip[] = [
    new Trip(
      ['Kaprifolgatan, Göteborg', 'Kungssten, Göteborg', 'Kårholmen, Göteborg'],
      ['30', '11', '281'],
      new Date(60 * 60 * 1000),
      new Date(),
      [
        new Date(),
        new Date(new Date().getTime() + 20 * 60 * 1000),
        new Date(new Date().getTime() + 60 * 60 * 1000),
      ]
    ),
  ];

  tripsUpdated = new EventEmitter<Trip[]>();
  searchUpdated = new EventEmitter<Stop[]>();

  get trips() {
    return this._trips;
  }

  patternMatching(keyword: string) {
    this.http
      .get<{ LocationList: { StopLocation: Stop[] } }>(
        `https://api.vasttrafik.se/bin/rest.exe/v2/location.name?input=${keyword}&format=json`,
        { headers: new HttpHeaders({ Authorization: `Bearer ${API_ACCESS}` }) }
      )
      .subscribe((response) =>
        this.searchUpdated.emit(response.LocationList.StopLocation)
      );
  }
}
