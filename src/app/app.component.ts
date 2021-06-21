import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from './service/data-handler.service';
import {SoftCD} from './model/SoftCD';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  allSoft: SoftCD[];

  constructor(private dataHandler: DataHandlerService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    // this.dataHandler.getAllSoft().subscribe(soft => this.allSoft = soft);
    this.dataHandler.readSoftCDUrl()
      .subscribe
      (
        (response) => {
          // this.allSoft = response[0]['soft'];
          this.allSoft = response;
          // console.log(this.allSoft);
        },
        (error) => {
          console.log('No Data Found' + error);
        }
      );
 }
  onAddSoft(soft: SoftCD): void {
    this.http.post<any>('http://127.0.0.1:5000/onAddSoft', soft)
      .subscribe(back => this.allSoft = back);
  }
  // обновление задачи
  onUpdateSoft(soft: SoftCD): void {
    this.http.post<any>('http://127.0.0.1:5000/onUpdateSoft', soft)
      .subscribe(back => {
        console.log('onUpdateSoft: ' , back);
        this.allSoft = back;
      });
  }
  onDeleteSoft(soft: SoftCD): void {
    this.http.post<any>('http://127.0.0.1:5000/onDeleteSoft', soft)
      .subscribe(back => {
        this.allSoft = back;
      });
  }

}
