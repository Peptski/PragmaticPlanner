import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from 'src/app/search-page/utils/trip.model';
import { ForceListPipe } from 'src/app/search-page/utils/force-list.pipe';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { Stop } from 'src/app/search-page/utils/stop.model';
import { SearchService } from 'src/app/search-page/data-access/search.service';
import { Detail } from 'src/app/search-page/utils/detail.model';

@Component({
  selector: 'app-trip-item',
  standalone: true,
  imports: [CommonModule, ForceListPipe, TripDetailsComponent],
  templateUrl: './trip-item.component.html',
  styleUrls: ['./trip-item.component.css'],
})
export class TripItemComponent {
  @Input() trip!: Trip;
  @Input() url!: string;
  details: Detail[] = [];
  open = false;

  constructor(private searchService: SearchService) {}

  handleDetails() {
    if (this.open) {
      this.open = false;
    } else {
      if (this.details.length === 0) {
        const legs = Array.isArray(this.trip.Leg)
          ? this.trip.Leg
          : [this.trip.Leg];

        let i = 0;
        legs.forEach((leg) => {
          if (leg.type !== 'WALK') {
            let index = i;
            i++;
            const sub = this.searchService
              .getDetails(leg.JourneyDetailRef.ref)
              .subscribe((data) => {
                this.details[index] = data.JourneyDetail;
                sub.unsubscribe();
              });
          }
        });
      }
      this.open = true;
    }
  }
}
