import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForceListPipe } from 'src/app/search-page/utils/force-list.pipe';
import { Detail } from 'src/app/search-page/utils/detail.model';

@Component({
  selector: 'app-trip-details',
  standalone: true,
  imports: [CommonModule, ForceListPipe],
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css'],
})
export class TripDetailsComponent {
  @Input() details!: Detail[];
  constructor() {}
}
