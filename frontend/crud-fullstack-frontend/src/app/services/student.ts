import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject, tap, map } from 'rxjs';

export interface StudentModel {
  id: number;
  name: string;
  age: number;
  subject: string;
}

@Injectable({
  providedIn: 'root',
})
export class Student {
  private readonly API_URL = 'http://localhost:3000/students';

  private selectedStudentSubject = new BehaviorSubject<StudentModel>({
    id: 0,
    name: '',
    age: 0,
    subject: '',
  });

  private studentsChangedSubject = new Subject<void>();
  studentsChanged$ = this.studentsChangedSubject.asObservable();

  constructor(private http: HttpClient) {}

  getStudents(): Observable<StudentModel[]> {
    return this.http.get<any[]>(this.API_URL).pipe(
      map((data) =>
        data.map((item) => ({
          id: item.id,
          name: item.name ?? item.Name,
          age: item.age ?? item.Age,
          subject: item.subject ?? item.Subject,
        }))
      )
    );
  }

  getSelectedStudent(): Observable<StudentModel> {
    return this.selectedStudentSubject.asObservable();
  }

  addStudent(student: Partial<StudentModel>): Observable<StudentModel> {
    const payload = {
      Name: student.name ?? '',
      Age: Number(student.age),
      Subject: student.subject ?? '',
    };
    return this.http
      .post<StudentModel>(this.API_URL, payload)
      .pipe(tap(() => this.studentsChangedSubject.next()));
  }

  updateStudent(updated: Partial<StudentModel> & { id: number }): Observable<StudentModel> {
    const payload = {
      Name: updated.name ?? '',
      Age: Number(updated.age),
      Subject: updated.subject ?? '',
    };
    return this.http
      .patch<StudentModel>(`${this.API_URL}/${updated.id}`, payload)
      .pipe(tap(() => this.studentsChangedSubject.next()));
  }

  deleteStudent(id: number): Observable<void> {
    if (this.selectedStudentSubject.value?.id === id) {
      this.resetSelectedStudent();
    }
    return this.http
      .delete<void>(`${this.API_URL}/${id}`)
      .pipe(tap(() => this.studentsChangedSubject.next()));
  }

  setSelectedStudent(student: StudentModel): Observable<StudentModel> {
    this.selectedStudentSubject.next({ ...student });
    return this.getSelectedStudent();
  }

  resetSelectedStudent(): Observable<StudentModel> {
    this.selectedStudentSubject.next({ id: 0, name: '', age: 0, subject: '' });
    return this.getSelectedStudent();
  }
}
