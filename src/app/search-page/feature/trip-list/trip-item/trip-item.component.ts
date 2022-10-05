import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from 'src/app/search-page/utils/trip.model';
import { ForceListPipe } from 'src/app/search-page/utils/force-list.pipe';
import { TripDetailsComponent } from './trip-details/trip-details.component';
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

  handleDetails() {
    this.open = !this.open;
  }
}
