
export class BlogPost {
  title: string;
  date: Date;
  filePath: string;
  hint: string;

  constructor(title: string, date: Date, hint: string, filePath: string) {
    this.title = title;
    this.date = date;
    this.hint = hint;
    this.filePath = filePath;
  }
}
