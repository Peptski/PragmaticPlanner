import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchItemComponent } from './search-item/search-item.component';

@Component({
  selector: 'app-search-list',
  standalone: true,
  imports: [CommonModule, SearchItemComponent],
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css'],
})
export class SearchComponent implements OnInit {
  searchItems = ['Kaprifolgatan, Göteborg', 'Kårholmen, Göteborg'];

  constructor() {}

  ngOnInit(): void {}
}
