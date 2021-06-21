import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {SoftCD} from '../../model/SoftCD';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  dialogTitle: string; // заголовок окна
  soft: SoftCD; // задача для редактирования/создания
  article: string[] = ['K-420K', 'K-700', 'K-460'];
  // чтобы изменения не сказывались на самой задаче и можно было отменить изменения
  tmpTitle: string;
  tmpArticle: string;
  tmpNom: string;
  tmpDate: Date;

  constructor(
    private dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [SoftCD, string], // данные, которые передали в диалоговое окно
    private dialog: MatDialog // для открытия нового диалогового окна (из текущего) - например для подтверждения удаления
  ) { }

  ngOnInit(): void {
    this.soft = this.data[0];
    this.dialogTitle = this.data[1];

    this.tmpTitle = this.soft.title;
    this.tmpNom = this.soft.inv;
    this.tmpArticle = this.soft.article;
    this.tmpDate = this.soft.date;
    // console.log('editDialog: ', this.tmpDate);
  }
  // нажали ОК
  onConfirm(): void {
    // считываем все значения для сохранения в поля редактирования
    this.soft.title = this.tmpTitle;
    this.soft.article = this.tmpArticle;
    this.soft.date = this.tmpDate;
    this.soft.inv = this.tmpNom;
    // передаем добавленный/измененный эталон в обработчик
    // что с ним будут делать - уже на задача этого компонента
    this.dialogRef.close(this.soft);
    // console.log('editDialog: ', this.tmpDate);
  }

  // нажали отмену (ничего не сохраняем и закрываем окно)
  onCancel(): void {
    this.dialogRef.close(null);
  }
  delete(): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить эталон из базы?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete'); // нажали удалить
      }
    });
  }
}
