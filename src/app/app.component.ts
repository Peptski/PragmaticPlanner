import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectError } from './search-page/data-access/reducers/search.reducer';
import { SearchService } from './search-page/data-access/search.service';
import { SearchComponent } from './search-page/feature/search/search-list.component';
import { SettingsComponent } from './search-page/feature/settings/settings.component';
import { TripListComponent } from './search-page/feature/trip-list/trip-list.component';
import { ErrorTextPipe } from './search-page/utils/error.pipe';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    SearchComponent,
    TripListComponent,
    SettingsComponent,
    CommonModule,
    ErrorTextPipe,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  error$: Observable<string>;

  constructor(private searchService: SearchService, private store: Store) {
    this.searchService.newToken();
    this.error$ = this.store.select(selectError);
  }
}
