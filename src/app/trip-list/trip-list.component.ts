import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../trip.model';
import { SearchService } from '../shared/search.service';
import { Subscription } from 'rxjs';
import { TripItemComponent } from './trip-item/trip-item.component';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, TripItemComponent],
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css'],
})
export class TripListComponent implements OnInit {
  @Input() trips: Trip[] = [];

  subscriptions: Subscription[] = [];

  constructor(private searchService: SearchService) {
    this.subscriptions.push(
      this.searchService.tripsUpdated.subscribe((trips) => (this.trips = trips))
    );
  }

  ngOnInit(): void {
    this.trips = this.searchService.trips;
  }
}
