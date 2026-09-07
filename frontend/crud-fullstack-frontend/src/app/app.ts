import { Component } from '@angular/core';
import { Form } from "./form/form";
import { Table } from "./table/table";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Form, Table],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'crud-3-services';
}
