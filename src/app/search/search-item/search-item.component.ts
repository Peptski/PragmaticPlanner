import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css'],
})
export class SearchItemComponent implements OnInit {
  @Input() targetStop: string = '';
  @Input() templateElement: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  dragStartHandler(event: DragEvent): void {}

  dragEndHandler(event: DragEvent): void {}

  toggleActive() {
    this.templateElement = !this.templateElement;
  }
}
