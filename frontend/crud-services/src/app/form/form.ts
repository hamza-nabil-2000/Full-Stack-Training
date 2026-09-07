import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Student } from '../services/student';

@Component({
  selector: 'app-form',
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
    this.studentService.getSelectedStudent().subscribe((data: { id: number; name: string; age: string; subject: string }) => {
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
    const student = {
      id: this.selectedId,
      ...this.studentForm.value,
    };
    if (this.selectedId === 0) {
      this.studentService.addStudent(student).subscribe(() => {
        this.resetForm();
      });
    } else {
      this.studentService.updateStudent(student).subscribe(() => {
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.selectedId = 0;
    this.studentForm.reset({ name: '', age: '', subject: '' });
    this.studentService.resetSelectedStudent().subscribe();
  }
}
