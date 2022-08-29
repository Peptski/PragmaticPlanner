import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { SearchItemComponent } from './search-item/search-item.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSearchParams } from '../../data-access/reducers/search.reducer';

@Component({
  selector: 'app-search-list',
  standalone: true,
  imports: [CommonModule, SearchItemComponent, DragDropModule],
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css'],
})
export class SearchComponent {
  searchItems$: Observable<string[][]>;

  constructor(private store: Store) {
    this.searchItems$ = store.select(selectSearchParams);
  }

  drop(event: CdkDragDrop<string[]>) {
    // moveItemInArray(this.searchItems, event.previousIndex, event.currentIndex);
    //this.searchItem from stream
  }
}
