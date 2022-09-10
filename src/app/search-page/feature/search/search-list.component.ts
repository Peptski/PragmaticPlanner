import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchItemComponent } from './search-item/search-item.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSearchParams } from '../../data-access/reducers/search.reducer';

@Component({
  selector: 'app-search-list',
  standalone: true,
  imports: [CommonModule, SearchItemComponent],
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css'],
})
export class SearchComponent {
  searchItems$: Observable<string[][]>;

  constructor(private store: Store) {
    this.searchItems$ = store.select(selectSearchParams);
  }
}
