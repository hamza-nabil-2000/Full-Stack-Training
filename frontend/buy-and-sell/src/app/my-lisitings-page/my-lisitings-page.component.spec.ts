import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLisitingsPageComponent } from './my-lisitings-page.component';

describe('MyLisitingsPageComponent', () => {
  let component: MyLisitingsPageComponent;
  let fixture: ComponentFixture<MyLisitingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyLisitingsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyLisitingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
