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
