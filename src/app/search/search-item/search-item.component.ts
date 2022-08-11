import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css']
})
export class SearchItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
