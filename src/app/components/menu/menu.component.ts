import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DateFind} from '../../model/SoftCD';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  @Output()
  dateFilterOut = new EventEmitter<DateFind>();

  dateStart: Date;
  tmpDateStart: Date;
  dateFinish: Date;
  tmpDateFinish: Date;
  dateFilter: DateFind;

  constructor() {
  }

  ngOnInit(): void {
    this.dateStart = new Date(2020, 1, 1);
    this.tmpDateStart = this.dateStart;
    this.dateFinish = new Date();
    this.tmpDateFinish = this.dateFinish;
    this.dateFilter = new DateFind(this.dateStart, this.dateFinish);
    // console.log('dateStart = ', this.dateFilter.dateStart);
    // console.log('dateFinish = ', this.dateFilter.dateFinish);
  }

  startSearch(): void {
    if (this.dateFilter.dateStart > this.dateFilter.dateFinish) {
      this.dateFilter.dateFinish = this.dateFilter.dateStart;
    }
    console.log('dateStart = ', this.dateFilter.dateStart);
    console.log('dateFinish = ', this.dateFilter.dateFinish);
    this.dateFilterOut.emit(this.dateFilter);
  }

  finishSearch(): void {
    if (this.dateFilter.dateStart > this.dateFilter.dateFinish) {
      this.dateFilter.dateStart = this.dateFilter.dateFinish;
    }
    // console.log('dateStart = ', this.dateFilter.dateStart);
    // console.log('dateFinish = ', this.dateFilter.dateFinish);
    this.dateFilterOut.emit(this.dateFilter);
  }

  buttonStartClear(): void {
    this.dateFilter.dateStart = this.dateStart;
    if (this.dateFilter.dateStart > this.dateFilter.dateFinish) {
      this.dateFilter.dateFinish = this.dateFilter.dateStart;
    }
    this.dateFilterOut.emit(this.dateFilter);
  }

  buttonFinishClear(): void {
    this.dateFilter.dateFinish = this.dateFinish;
    if (this.dateFilter.dateStart > this.dateFilter.dateFinish) {
      this.dateFilter.dateStart = this.dateFilter.dateFinish;
    }
    this.dateFilterOut.emit(this.dateFilter);
  }

}
