import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  @Input() students: any[] = [];

  @Output() editStudent = new EventEmitter<any>();

  @Output() deleteStudent = new EventEmitter<number>();

  onEdit(student: any) {
    this.editStudent.emit(student);
  }

  onDelete(id: number) {
    this.deleteStudent.emit(id);
  }
}
