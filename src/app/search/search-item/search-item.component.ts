import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from 'src/app/shared/search.service';
import { Stop } from 'src/app/shared/stop.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css'],
})
export class SearchItemComponent implements OnInit, OnDestroy {
  @Input() targetStop: string = '';
  @Input() templateElement: boolean = false;
  @Input() index!: number;
  searchForm!: FormGroup;
  patternMatching: Stop[] = [];

  subscriptions: Subscription[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(this.targetStop),
    });

    this.subscriptions.push(
      this.searchForm.valueChanges.subscribe(({ search }) =>
        this.searchService.patternMatching(search, this.index)
      )
    );

    this.subscriptions.push(
      this.searchService.searchUpdated.subscribe((patternMatching) => {
        this.patternMatching = patternMatching;
        console.log(this.patternMatching);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  toggleActive() {
    this.templateElement = !this.templateElement;
  }
}
