import { Component } from '@angular/core';
import { SearchComponent } from './search-page/feature/search/search-list.component';
import { SettingsComponent } from './search-page/feature/settings/settings.component';
import { TripListComponent } from './search-page/feature/trip-list/trip-list.component';
import { Leg } from './search-page/utils/leg.model';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [SearchComponent, TripListComponent, SettingsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  trips: Leg[][] = [];
}
