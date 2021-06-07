import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'search-input',
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent implements OnInit {
  
  searchTerm :String
  @Output()
  searchEvent = new EventEmitter();
  
  constructor(
  ) {}
  ngOnInit() {
   
  }

  handleChange(){
    this.searchEvent.emit(this.searchTerm);
  }
}
