import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloClientDemoComponent } from './apollo-client-demo.component';

describe('ApolloClientDemoComponent', () => {
  let component: ApolloClientDemoComponent;
  let fixture: ComponentFixture<ApolloClientDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApolloClientDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApolloClientDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
