import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForceListPipe } from 'src/app/search-page/utils/force-list.pipe';
import { Trip } from 'src/app/search-page/utils/trip.model';
import { Leg } from 'src/app/search-page/utils/leg.model';
import { Store } from '@ngrx/store';
import {
  clearDetails,
  getDetails,
} from 'src/app/search-page/data-access/actions/search-page.actions';
import { selectDetails } from 'src/app/search-page/data-access/reducers/search.reducer';
import { Observable } from 'rxjs';
import { Stop } from 'src/app/search-page/utils/stop.model';

@Component({
  selector: 'app-trip-details',
  standalone: true,
  imports: [CommonModule, ForceListPipe],
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css'],
})
export class TripDetailsComponent implements OnInit {
  @Input() trip: Trip = { Leg: [] };
  details$: Observable<{ details: Stop[]; leg: Leg }[]>;
  count = 0;

  constructor(private store: Store) {
    this.details$ = this.store.select(selectDetails);
  }

  ngOnInit(): void {
    this.count = 0;
    this.store.dispatch(clearDetails());
    const legs = Array.isArray(this.trip.Leg) ? this.trip.Leg : [this.trip.Leg];
    legs.forEach((leg) => {
      if (leg.type !== 'WALK') {
        this.count++;
        try {
          this.store.dispatch(
            getDetails({ url: leg.JourneyDetailRef.ref, leg: leg })
          );
        } catch (error) {}
      }
    });
  }
}
