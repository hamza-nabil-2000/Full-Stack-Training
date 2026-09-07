import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Student, StudentModel } from '../services/student';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form implements OnInit {
  studentForm: FormGroup;
  selectedId = 0;

  constructor(
    private fb: FormBuilder,
    private studentService: Student
  ) {
    this.studentForm = this.fb.group({
      name: [''],
      age: [''],
      subject: [''],
    });
  }

  ngOnInit(): void {
    this.studentService.getSelectedStudent().subscribe((data: StudentModel) => {
      if (data) {
        this.selectedId = data.id;
        this.studentForm.patchValue({
          name: data.name,
          age: data.age,
          subject: data.subject,
        });
      }
    });
  }

  onSubmit() {
    if (this.selectedId === 0) {
      const newStudent = {
        ...this.studentForm.value,
      };
      this.studentService.addStudent(newStudent).subscribe({
        next: () => {
          this.resetForm();
        },
        error: (err) => {
          console.error('Failed to add student', err);
        },
      });
    } else {
      const updatedStudent = {
        id: this.selectedId,
        ...this.studentForm.value,
      };
      this.studentService.updateStudent(updatedStudent).subscribe({
        next: () => {
          this.resetForm();
        },
        error: (err) => {
          console.error('Failed to update student', err);
        },
      });
    }
  }

  resetForm() {
    this.selectedId = 0;
    this.studentForm.reset({ name: '', age: '', subject: '' });
    this.studentService.resetSelectedStudent().subscribe();
  }
}
