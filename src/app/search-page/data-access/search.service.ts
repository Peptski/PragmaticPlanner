import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ACCESS } from '../utils/auth.service';
import { Stop } from '../utils/stop.model';
import { Trip } from '../utils/trip.model';

@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private http: HttpClient) {
    this.detailTest();
  }

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
    to: string,
    extraStop: string
  ) {
    let query = 'https://api.vasttrafik.se/bin/rest.exe/v2/trip';
    query += `?originId=${from}&destId=${to}&date=${date}&time=${time}&format=json`;
    if (via !== '' && extraStop) query += `&viaId=${via}`;
    if (mode === 'arrival') query += '&searchForArrival=1';

    return this.http.get<{ TripList: { Trip: Trip[] } }>(query, {
      headers: new HttpHeaders({ Authorization: `Bearer ${API_ACCESS}` }),
    });
  }

  getDetails(url: string) {
    return this.http.get<{ JourneyDetail: { Stop: Stop[] } }>(url, {
      headers: new HttpHeaders({ Authorization: `Bearer ${API_ACCESS}` }),
    });
  }

  detailTest() {
    this.http
      .get<{ LocationList: { StopLocation: Stop[] | Stop } }>(
        `https://api.vasttrafik.se/bin/rest.exe/v2/journeyDetail?ref=627375%2F248720%2F167368%2F125441%2F80%3Fdate%3D2022-09-03%26station_evaId%3D9620013%26station_type%3Ddep%26format%3Djson%26`,
        { headers: new HttpHeaders({ Authorization: `Bearer ${API_ACCESS}` }) }
      )
      .subscribe((res) => console.log(res));

    this.http
      .get<{ LocationList: { StopLocation: Stop[] | Stop } }>(
        `https://api.vasttrafik.se/bin/rest.exe/v2/journeyDetail?ref=251271%2F86585%2F414416%2F123451%2F80%3Fdate%3D2022-09-03%26station_evaId%3D3770001%26station_type%3Ddep%26format%3Djson%26`,
        { headers: new HttpHeaders({ Authorization: `Bearer ${API_ACCESS}` }) }
      )
      .subscribe((res) => console.log(res));
  }
}
