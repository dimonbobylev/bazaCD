import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from './service/data-handler.service';
import {SoftCD} from './model/SoftCD';
import {TestData} from './data/TestData';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  allSoft: SoftCD[];

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllSoft().subscribe(soft => this.allSoft = soft);
  }
  onAddSoft(soft: SoftCD): void {
    this.dataHandler.addSoft(soft);
  }
  // обновление задачи
  onUpdateSoft(soft: SoftCD): void {
    this.dataHandler.updateSoft(soft);
  }
  onDeleteSoft(soft: SoftCD): void {
    this.dataHandler.delSoft(soft.id);
  }

}
