import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from 'src/app/search-page/utils/trip.model';
import { ForceListPipe } from 'src/app/search-page/utils/force-list.pipe';

@Component({
  selector: 'app-trip-item',
  standalone: true,
  imports: [CommonModule, ForceListPipe],
  templateUrl: './trip-item.component.html',
  styleUrls: ['./trip-item.component.css'],
})
export class TripItemComponent {
  @Input() trip!: Trip;
}
