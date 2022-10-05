import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stop } from '../utils/stop.model';
import { Trip } from '../utils/trip.model';
import { Detail } from '../utils/detail.model';

@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private http: HttpClient) {}

  patternMatching(keyword: string) {
    return this.http.get<{ LocationList: { StopLocation: Stop[] | Stop } }>(
      `https://api.vasttrafik.se/bin/rest.exe/v2/location.name?input=${keyword}&format=json`
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

    return this.http.get<{ TripList: { Trip: Trip[] } }>(query);
  }

  getDetails(url: string) {
    return this.http.get<{ JourneyDetail: Detail }>(url);
  }

  newToken() {
    this.http
      .post<{ access_token: string }>(
        'https://api.vasttrafik.se/token',
        'grant_type=client_credentials',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization:
              'Basic WTl2OEUxU3Jncnlka3VTVDQ0Wm9UZ3ZhS2VzYTpZckQ2ZlNXWE1maXVPaUNsUVExT25WeUtPbndh',
          },
        }
      )
      .subscribe(
        (res) => localStorage.setItem('token', res.access_token),
        (error) => console.log(error)
      );
  }
}
