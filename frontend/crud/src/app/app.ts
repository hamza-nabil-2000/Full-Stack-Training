import { Component, ViewChild } from '@angular/core';
import { Form } from './form/form';
import { Table } from './table/table';

@Component({
  selector: 'app-root',
  imports: [Form, Table],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  students: any[] = [];

  @ViewChild(Form) formComponent!: Form;

  onAddStudent(newStudent: any) {
    const newId = this.students.length
      ? Math.max(...this.students.map((s) => s.id)) + 1
      : 1;
    this.students.push({ id: newId, ...newStudent });
  }

  onEditStudent(student: any) {
    this.formComponent.startEdit({ ...student });
  }

  onUpdateStudent(updated: any) {
    const idx = this.students.findIndex((s) => s.id === updated.id);
    if (idx !== -1) {
      this.students[idx] = updated;
    }
  }

  onDeleteStudent(id: number) {
    this.students = this.students.filter((s) => s.id !== id);
  }
}
