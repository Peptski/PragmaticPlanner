import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from 'src/app/shared/trip.model';

@Component({
  selector: 'app-trip-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-item.component.html',
  styleUrls: ['./trip-item.component.css'],
})
export class TripItemComponent implements OnInit {
  @Input() trip!: Trip;

  constructor() {}

  ngOnInit(): void {
    if (!Array.isArray(this.trip.Leg)) this.trip.Leg = [this.trip.Leg];
  }
}
