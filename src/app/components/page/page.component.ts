import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DataHandlerService} from '../../service/data-handler.service';
import {SoftCD} from '../../model/SoftCD';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {EditDialogComponent} from '../../dialog/edit-dialog/edit-dialog.component';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit, AfterViewInit {

  dataSource: MatTableDataSource<SoftCD>; // контейнер - источник данных для таблицы
  // поля для таблицы (те, что отображают данные из задачи - должны совпадать с названиями переменных класса)
  displayedColumns: string[] = ['id', 'inv', 'date', 'article', 'title', 'operations'];

  // ссылки на компоненты таблицы
  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;

  allSoft: SoftCD[];
  @Output()
  deleteSoft = new EventEmitter<SoftCD>();
  // текущие задачи для отображения на странице
  @Input('soft')
  private set setTasks(soft: SoftCD[]) { // напрямую не присваиваем значения в переменную, только через @Input
    this.allSoft = soft;
    this.fillTable();
  }
  @Output()
  addSoft = new EventEmitter<SoftCD>();
  @Output()
  updateSoft = new EventEmitter<SoftCD>();
  @Output()
  delSoft = new EventEmitter<SoftCD>();
  constructor(
    private dataHandler: DataHandlerService, // доступ к данным
    private dialog: MatDialog, // работа с диалоговым окном
  ) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fillTable();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort; // компонент для сортировки данных (если необходимо)
    this.dataSource.paginator = this.paginator; // обновить компонент постраничности (кол-во записей, страниц)
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // обновляем таблицу
  fillTable(): void {
    if (!this.dataSource) {
      return;
    }
    this.dataHandler.softSubject.subscribe(() => {
      this.dataSource.data = this.allSoft; // обновить источник данных (т.к. данные массива soft обновились)
    });
    this.dataSource.data = this.allSoft; // обновить источник данных (т.к. данные массива soft обновились)
    // this.addTableObjects();
  }

  private addTableObjects(): void {
    this.dataSource.sort = this.sort; // компонент для сортировки данных (если необходимо)
    this.dataSource.paginator = this.paginator; // обновить компонент постраничности (кол-во записей, страниц)
  }

  openDeleteDialog(soft: SoftCD): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить эталон?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // если нажали ОК
        this.deleteSoft.emit(soft);
      }
    });
  }

  openEditDialog(element: SoftCD): void {
    // открытие диалогового окна
    const dialogRef = this.dialog.open(EditDialogComponent, {data: [element, 'Редактирование'], autoFocus: false});
    dialogRef.afterClosed().subscribe( result => {
      if (result === 'delete') {
        // console.log('page: ', this.allEtalons);
        // console.log('page: ', element);
        this.deleteSoft.emit(element);
        return;
      }
      // обработка результатов
      if (result as SoftCD) { // если нажали ОК и есть результат
        this.updateSoft.emit(result);
        return;
      }
    });
  }
  openAddSoftDialog(): void {

    // то же самое, что и при редактировании, но только передаем пустой объект Task
    const soft = new SoftCD(null, '', new Date(''), '', '');

    const dialogRef = this.dialog.open(EditDialogComponent, {data: [soft, 'Добавление задачи']});

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // если нажали ОК и есть результат
        this.addSoft.emit(soft);
      }
    });

  }
}
