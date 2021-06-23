import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SoftDAOArray} from '../model/impl/SoftDAOArray';
import {Observable, Subject} from 'rxjs';
import {SoftCD, StatisticsArray} from '../model/SoftCD';


@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  statisticsArray: StatisticsArray[] = [];
  SoftCDUrl = 'http://127.0.0.1:5000/softCD/';
  addSoftCDUrl = 'http://127.0.0.1:5000/';
  softSubject = new Subject<SoftCD[]>();

  private softDaoArray = new SoftDAOArray();

  constructor(private http: HttpClient) { }


  getStatistics(soft: SoftCD[]): StatisticsArray[] {
    // console.log('DataHandlerService: ', soft);
    for (const item of soft) {
      const year = (String(item.date)).slice(0, 4);
      const intYear = +year;
      let boolYear = false;
      if (this.statisticsArray) {
        for (const count of this.statisticsArray) {
          if (intYear === count.year) {
            boolYear = true;
            break;
          }
        }
      }
      if (boolYear === false) {
        const stArr: StatisticsArray = new StatisticsArray(intYear, 0);
        this.statisticsArray.push(stArr);
      }
    }
    let countYear = 0;
    for (const item of this.statisticsArray) {
      let counter = 0;
      for (const item1 of soft) {
        const year = String(item1.date).slice(0, 4);
        const intYear = +year;
        if (item.year ===  intYear) {
          counter = counter + 1;
          // console.log('item.year: ', item.year, ' intYear: ', intYear, ' counter: ', counter);
        }
      }
      this.statisticsArray[countYear].count = counter;
      // console.log('year: ', this.statisticsArray[countYear].count, ' countYear: ', countYear, ' counter: ', counter);
      countYear = countYear + 1;
    }
    // console.log('DataHandlerService: ' , this.statisticsArray);
    return this.statisticsArray;
  }

  readSoftCDUrl(): any {
    return this.http.get<SoftCD[]>(this.SoftCDUrl);
  }
  getAllSoft(): Observable<SoftCD[]> {
    return this.softDaoArray.getAll();
  }
  addSoft(soft: SoftCD): void {
    // если id пустой - генерируем его
    // if (soft.id === null || soft.id === 0) {
    //   soft.id = this.getLastId();
    // }
    // TestData.softCDs.push(soft);
    // this.softSubject.next(TestData.softCDs);

    // this.http.post('http://127.0.0.1:5000/', 'test');
    // const qaz7 = this.http.get<SoftCD[]>(this.SoftCDUrl);
  }
  // находит последний id (чтобы потом вставить новую запись с id, увеличенным на 1) - в реальной БД это происходит автоматически
  getLastId(): void {
    // return Math.max.apply(Math, TestData.softCDs.map(et => et.id)) + 1;
  }
  updateSoft(soft: SoftCD): void {
    // const softTmp = TestData.softCDs.find(t => t.id === soft.id); // обновляем по id
    // TestData.softCDs.splice(TestData.softCDs.indexOf(softTmp), 1, soft);
    // this.softSubject.next(TestData.softCDs);
  }
  delSoft(id: number): void {
    // const softTmp = TestData.softCDs.find(t => t.id === id); // удаляем по id
    // TestData.softCDs.splice(TestData.softCDs.indexOf(softTmp), 1);
    // this.softSubject.next(TestData.softCDs);
  }
}
