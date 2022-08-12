import { Component } from '@angular/core';
import { SearchComponent } from './search/search-list.component';
import { SettingsComponent } from './settings/settings.component';
import { Trip } from './shared/trip.model';
import { TripListComponent } from './trip-list/trip-list.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [SearchComponent, TripListComponent, SettingsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  trips: Trip[] = [];
}
