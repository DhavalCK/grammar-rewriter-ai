import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrammarRewriterComponent } from './grammar-rewriter.component';

describe('GrammarRewriterComponent', () => {
  let component: GrammarRewriterComponent;
  let fixture: ComponentFixture<GrammarRewriterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrammarRewriterComponent]
    });
    fixture = TestBed.createComponent(GrammarRewriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
