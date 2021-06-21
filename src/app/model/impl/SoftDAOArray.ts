import {SoftDAO} from '../interface/SoftDAO';
import {Observable} from 'rxjs';
import {SoftCD} from '../SoftCD';


export class SoftDAOArray implements SoftDAO {
  add(T): Observable<SoftCD> {
    return undefined;
  }

  delete(id: number): Observable<SoftCD> {
    // const softTmp = TestData.softCDs.find(t => t.id === id); // удаляем по id
    // TestData.softCDs.splice(TestData.softCDs.indexOf(softTmp), 1);
    //
    return undefined;
  }

  get(id: number): Observable<SoftCD> {
    return undefined;
  }

  getAll(): Observable<SoftCD[]> {
    return undefined;
  }

  getCountInArticle(article: string): Observable<number> {
    return undefined;
  }

  update(soft: SoftCD): Observable<SoftCD> {
    // const softTmp = TestData.softCDs.find(t => t.id === soft.id); // обновляем по id
    // TestData.softCDs.splice(TestData.softCDs.indexOf(softTmp), 1, soft);

    return undefined;

  }

}
