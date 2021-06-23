export class SoftCD {
  id: number;
  inv: string;
  date: Date;
  article: string;
  title: string;

  constructor(id: number, inv: string, date: Date, article: string, title: string) {
    this.id = id;
    this.inv = inv;
    this.date = date;
    this.article = article;
    this.title = title;
  }
}
export class DateFind {
  dateStart: Date;
  dateFinish: Date;

  constructor(dateStart: Date, dateFinish: Date) {
    this.dateStart = dateStart;
    this.dateFinish = dateFinish;
  }
}
export class StatisticsArray  {
  year: number;
  count: number;

  constructor(year: number, count: number) {
    this.year = year;
    this.count = count;
  }
}
