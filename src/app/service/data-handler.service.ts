import { Injectable } from '@angular/core';
import {SoftDAOArray} from '../model/impl/SoftDAOArray';
import {Observable, Subject} from 'rxjs';
import {SoftCD} from '../model/SoftCD';
import {TestData} from '../data/TestData';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  softSubject = new Subject<SoftCD[]>();

  private softDaoArray = new SoftDAOArray();

  constructor() { }

  getAllSoft(): Observable<SoftCD[]> {
    return this.softDaoArray.getAll();
  }
  addSoft(soft: SoftCD): void {
    // если id пустой - генерируем его
    if (soft.id === null || soft.id === 0) {
      soft.id = this.getLastId();
    }
    TestData.softCDs.push(soft);
    this.softSubject.next(TestData.softCDs);
  }
  // находит последний id (чтобы потом вставить новую запись с id, увеличенным на 1) - в реальной БД это происходит автоматически
  getLastId(): number {
    return Math.max.apply(Math, TestData.softCDs.map(et => et.id)) + 1;
  }
  updateSoft(soft: SoftCD): void {
    const softTmp = TestData.softCDs.find(t => t.id === soft.id); // обновляем по id
    TestData.softCDs.splice(TestData.softCDs.indexOf(softTmp), 1, soft);
    this.softSubject.next(TestData.softCDs);
  }
  delSoft(id: number): void {
    const softTmp = TestData.softCDs.find(t => t.id === id); // удаляем по id
    TestData.softCDs.splice(TestData.softCDs.indexOf(softTmp), 1);
    this.softSubject.next(TestData.softCDs);
  }
}
