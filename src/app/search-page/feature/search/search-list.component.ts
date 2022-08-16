import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { SearchItemComponent } from './search-item/search-item.component';

@Component({
  selector: 'app-search-list',
  standalone: true,
  imports: [CommonModule, SearchItemComponent, DragDropModule],
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css'],
})
export class SearchComponent implements OnInit {
  searchItems = ['', ''];

  constructor() {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.searchItems, event.previousIndex, event.currentIndex);
  }
}
