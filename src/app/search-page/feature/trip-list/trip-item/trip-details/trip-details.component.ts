import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForceListPipe } from 'src/app/search-page/utils/force-list.pipe';
import { Detail } from 'src/app/search-page/utils/detail.model';
import { Trip } from 'src/app/search-page/utils/trip.model';
import { Leg } from 'src/app/search-page/utils/leg.model';
import { SearchService } from 'src/app/search-page/data-access/search.service';

@Component({
  selector: 'app-trip-details',
  standalone: true,
  imports: [CommonModule, ForceListPipe],
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css'],
})
export class TripDetailsComponent implements OnInit {
  @Input() trip: Trip = { Leg: [] };
  details: Detail[] = [];
  content: [Detail, Leg][] = [];
  done = false;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
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
              console.log('tyeas');
            });
        }
      });
    }

    setTimeout(() => {
      this.details.forEach((detail) => {
        let correctName = Array.isArray(detail.JourneyName)
          ? detail.JourneyName[0].name
          : (detail.JourneyName as { name: string }).name;
        let match = <Leg>this.trip.Leg.find((leg) => leg.sname === correctName);
        let include = false;
        detail.Stop = detail.Stop.filter((stop) => {
          if (stop.name === match.Origin.name) {
            include = true;
          }
          if (stop.name === match.Destination.name) {
            include = false;
            return true;
          }
          return include;
        });
        this.content.push([detail, match]);
      });
      this.done = true;
    }, 1500);
  }
}
