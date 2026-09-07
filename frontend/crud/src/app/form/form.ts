import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  @Input() studentToEdit: any = null;

  @Output() addStudent = new EventEmitter<any>();

  @Output() updateStudent = new EventEmitter<any>();

  studentForm = new FormGroup({
    name: new FormControl(''),
    age: new FormControl<number>(0),
    subject: new FormControl(''),
  });

  editMode = false;

  startEdit(student: any) {
    this.studentToEdit = student;
    this.editMode = true;
    this.studentForm.patchValue({
      name: student?.name ?? '',
      age: student?.age ?? 0,
      subject: student?.subject ?? '',
    });
  }

  clearForm() {
    this.studentToEdit = null;
    this.editMode = false;
    this.studentForm.reset({ name: '', age: 0, subject: '' });
  }

  onSubmit() {
    const payload = this.studentForm.getRawValue();
    if (this.editMode && this.studentToEdit) {
      this.updateStudent.emit({ id: this.studentToEdit.id, ...payload });
    } else {
      this.addStudent.emit(payload);
    }

    this.clearForm();
  }
}
