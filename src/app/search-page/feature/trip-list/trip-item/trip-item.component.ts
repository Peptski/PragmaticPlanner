import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from 'src/app/search-page/utils/trip.model';
import { Store } from '@ngrx/store';
import { selectTrips } from 'src/app/search-page/data-access/reducers/search.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-trip-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-item.component.html',
  styleUrls: ['./trip-item.component.css'],
})
export class TripItemComponent {
  @Input() trip!: Trip;

  constructor(private store: Store) {}
}
