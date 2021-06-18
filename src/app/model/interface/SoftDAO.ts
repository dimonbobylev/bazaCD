// специфичные методы для работы с задачами (которые не входят в обычный CRUD)
import {SoftCD} from '../SoftCD';
import {CommonDAO} from './CommonDAO';
import {Observable} from 'rxjs';

export interface SoftDAO extends CommonDAO<SoftCD> {

  // кол-во поставок эталонов для выбранного комплекса
  getCountInArticle(article: string): Observable<number>;

}
