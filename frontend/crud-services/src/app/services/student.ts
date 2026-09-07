import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Student {
  private students: any[] = [];
  private selectedStudentSubject = new BehaviorSubject<any>({
    id: 0,
    name: '',
    age: '',
    subject: '',
  });
  private idCounter = 1;

  getStudents(): Observable<any[]> {
    return new Observable((observer) => {
      observer.next(this.students);
      observer.complete();
    });
  }

  getSelectedStudent(): Observable<any> {
    return this.selectedStudentSubject.asObservable();
  }

  addStudent(student: any): Observable<any[]> {
    student.id = this.idCounter++;
    this.students.push(student);
    return this.getStudents();
  }

  updateStudent(updated: any): Observable<any[]> {
    const index = this.students.findIndex((s) => s.id === updated.id);
    if (index !== -1) {
      this.students[index] = updated;
    }
    return this.getStudents();
  }

  deleteStudent(id: number): Observable<any[]> {
    this.students = this.students.filter((s) => s.id !== id);

    if (this.selectedStudentSubject.value?.id === id) {
      this.resetSelectedStudent();
    }

    return this.getStudents();
  }

  setSelectedStudent(student: any): Observable<any> {
    this.selectedStudentSubject.next({ ...student });
    return this.getSelectedStudent();
  }

  resetSelectedStudent(): Observable<any> {
    this.selectedStudentSubject.next({ id: 0, name: '', age: '', subject: '' });
    return this.getSelectedStudent();
  }
}
