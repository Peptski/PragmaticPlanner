import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-item.component.html',
  styleUrls: ['./trip-item.component.css']
})
export class TripItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
