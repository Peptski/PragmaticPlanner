import { EventEmitter, Injectable } from '@angular/core';
import { Trip } from '../trip.model';

@Injectable({ providedIn: 'root' })
export class SearchService {
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

  get trips() {
    return this._trips;
  }
}
