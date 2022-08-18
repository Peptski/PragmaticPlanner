import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { TripItemComponent } from './trip-item/trip-item.component';
import { Trip } from '../../utils/trip.model';
import { SearchService } from '../../data-access/search.service';
import { Store } from '@ngrx/store';
import { selectTrips } from '../../data-access/reducers/search.reducer';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, TripItemComponent],
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css'],
})
export class TripListComponent {
  trips$: Observable<Trip[]>;

  constructor(private searchService: SearchService, private store: Store) {
    this.trips$ = store.select(selectTrips);
  }
}
