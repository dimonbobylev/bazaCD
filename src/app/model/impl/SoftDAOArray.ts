import {SoftDAO} from '../interface/SoftDAO';
import {Observable, of} from 'rxjs';
import {SoftCD} from '../SoftCD';
import {TestData} from '../../data/TestData';

export class SoftDAOArray implements SoftDAO {
  add(T): Observable<SoftCD> {
    return undefined;
  }

  delete(id: number): Observable<SoftCD> {
    const softTmp = TestData.softCDs.find(t => t.id === id); // удаляем по id
    TestData.softCDs.splice(TestData.softCDs.indexOf(softTmp), 1);

    return of(softTmp);
  }

  get(id: number): Observable<SoftCD> {
    return undefined;
  }

  getAll(): Observable<SoftCD[]> {
    return of(TestData.softCDs);
  }

  getCountInArticle(article: string): Observable<number> {
    return undefined;
  }

  update(soft: SoftCD): Observable<SoftCD> {
    const softTmp = TestData.softCDs.find(t => t.id === soft.id); // обновляем по id
    TestData.softCDs.splice(TestData.softCDs.indexOf(softTmp), 1, soft);

    return of(soft);

  }

}
