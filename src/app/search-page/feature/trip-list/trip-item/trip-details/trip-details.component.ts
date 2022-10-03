import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForceListPipe } from 'src/app/search-page/utils/force-list.pipe';
import { Detail } from 'src/app/search-page/utils/detail.model';
import { Trip } from 'src/app/search-page/utils/trip.model';
import { Leg } from 'src/app/search-page/utils/leg.model';

@Component({
  selector: 'app-trip-details',
  standalone: true,
  imports: [CommonModule, ForceListPipe],
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css'],
})
export class TripDetailsComponent implements OnInit {
  @Input() details: Detail[] = [];
  @Input() trip: Trip = { Leg: [] };
  content: [Detail, Leg][] = [];

  constructor() {}

  ngOnInit(): void {
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
    }, 250);
  }
}
