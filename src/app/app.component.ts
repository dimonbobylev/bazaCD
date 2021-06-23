import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from './service/data-handler.service';
import {DateFind, SoftCD, StatisticsArray} from './model/SoftCD';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  allSoft: SoftCD[];
  statisticsArray: StatisticsArray[] = [];


  constructor(private dataHandler: DataHandlerService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.dataHandler.readSoftCDUrl()
      .subscribe
      (
        (response) => {
          this.allSoft = response;
          this.statisticsArray = this.dataHandler.getStatistics(this.allSoft);
         },
        (error) => {
          console.log('No Data Found' + error);
        }
      );
 }
  // добавление эталона
  onAddSoft(soft: SoftCD): void {
    this.http.post<any>('http://127.0.0.1:5000/onAddSoft', soft)
      .subscribe(back => {
        this.allSoft = back;
        this.statisticsArray = this.dataHandler.getStatistics(this.allSoft);
      });
  }
  // обновление эталона
  onUpdateSoft(soft: SoftCD): void {
    this.http.post<any>('http://127.0.0.1:5000/onUpdateSoft', soft)
      .subscribe(back => {
        // console.log('onUpdateSoft: ' , back);
        this.allSoft = back;
        this.statisticsArray = this.dataHandler.getStatistics(this.allSoft);
      });
  }
  // удаление эталона
  onDeleteSoft(soft: SoftCD): void {
    this.http.post<any>('http://127.0.0.1:5000/onDeleteSoft', soft)
      .subscribe(back => {
        this.allSoft = back;
        this.statisticsArray = this.dataHandler.getStatistics(this.allSoft);
      });
  }
  // выборка эталонов по дате
  dateFilter(dateFil: DateFind): void {
    this.http.post<any>('http://127.0.0.1:5000/onDateFilter', dateFil)
      .subscribe(back => this.allSoft = back);
  }
}
