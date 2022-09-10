import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForceListPipe } from 'src/app/search-page/utils/force-list.pipe';
import { Stop } from 'src/app/search-page/utils/stop.model';

@Component({
  selector: 'app-trip-details',
  standalone: true,
  imports: [CommonModule, ForceListPipe],
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css'],
})
export class TripDetailsComponent {
  @Input() details!: Stop[][];
  constructor() {
    console.log(this.details);
  }
}
