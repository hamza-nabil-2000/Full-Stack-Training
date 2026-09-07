
import { Component } from '@angular/core';
import { Student, StudentModel } from '../services/student';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class Table {
  students: StudentModel[] = [];

  constructor(private studentService: Student) { };

  ngOnInit(): void {
    this.loadStudents();
    this.studentService.studentsChanged$.subscribe(() => {
      this.loadStudents();
    });
  }

  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
      },
      error: (err) => {
        console.error('Failed to load students', err);
      },
    });
  }

  editStudent(student: any) {
    this.studentService.setSelectedStudent(student).subscribe();
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    });
  }
}
