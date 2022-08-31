import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ACCESS } from '../utils/auth.service';
import { Stop } from '../utils/stop.model';
import { Trip } from '../utils/trip.model';

@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private http: HttpClient) {}

  patternMatching(keyword: string) {
    return this.http.get<{ LocationList: { StopLocation: Stop[] | Stop } }>(
      `https://api.vasttrafik.se/bin/rest.exe/v2/location.name?input=${keyword}&format=json`,
      { headers: new HttpHeaders({ Authorization: `Bearer ${API_ACCESS}` }) }
    );
  }

  searchTrip(
    mode: string,
    time: string,
    date: string,
    from: string,
    via: string,
    to: string
  ) {
    let query = 'https://api.vasttrafik.se/bin/rest.exe/v2/trip';
    query += `?originId=${from}&destId=${to}&date=${date}&time=${time}&format=json`;
    if (via !== '') query += `&viaId=${via}`;
    if (mode === 'arrival') query += '&searchForArrival=1';

    return this.http.get<{ TripList: { Trip: Trip[] } }>(query, {
      headers: new HttpHeaders({ Authorization: `Bearer ${API_ACCESS}` }),
    });
  }
}
