import {Component, Input, OnInit} from '@angular/core';
import {StatisticsArray} from '../../model/SoftCD';

@Component({
  selector: 'app-statistica',
  templateUrl: './statistica.component.html',
  styleUrls: ['./statistica.component.css']
})
export class StatisticaComponent implements OnInit {

  @Input() statArray: StatisticsArray[];

  constructor() { }

  ngOnInit(): void {

  }

}
