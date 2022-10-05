import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from 'src/app/search-page/utils/trip.model';
import { ForceListPipe } from 'src/app/search-page/utils/force-list.pipe';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { SearchService } from 'src/app/search-page/data-access/search.service';
import { Detail } from 'src/app/search-page/utils/detail.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectOpenId } from 'src/app/search-page/data-access/reducers/search.reducer';
import { openTrip } from 'src/app/search-page/data-access/actions/search-page.actions';

@Component({
  selector: 'app-trip-item',
  standalone: true,
  imports: [CommonModule, ForceListPipe, TripDetailsComponent],
  templateUrl: './trip-item.component.html',
  styleUrls: ['./trip-item.component.css'],
})
export class TripItemComponent {
  @Input() trip!: Trip;
  @Input() id!: number;
  open$: Observable<number>;

  constructor(private store: Store) {
    this.open$ = this.store.select(selectOpenId);
  }

  handleDetails() {
    this.store.dispatch(openTrip({ id: this.id }));
  }
}
