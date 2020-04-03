import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { ContentService } from '../content.service';
import { ContentManager } from '../content-manager';

@Component({
  selector: 'htl-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.less']
})
export class InputComponent implements OnInit, OnChanges {

  @Input() content: ContentManager;
  @Input() inputEnabled: boolean;
  @Input() textArea: boolean;
  @Input() inputKind: string;
  @Input() inputMin;
  @Input() inputMax;
  @Input() inputStep;
  @Input() placeholder: string;
  @Input() inputRequired = true;
  @Input() suggestions: string[] = null;
  @Input() validator: (any) => boolean;
  @ViewChild('input') input: ElementRef;

  visibleSuggestions: string[][] = null;
  comparer: (x: string, y: string) => number;

  value = null;
  valid = true;

  constructor() { 
    try {
      const collator = new Intl.Collator(['he', 'en', 'ru', 'ar', 'fr', 'es'], {sensitivity: 'base'});
      this.comparer = collator.compare;
    } catch (e) {
      this.comparer = (x: string, y: string) => x.toUpperCase() === y.toUpperCase() ? 0 : 1;
    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.validate();
    }, 0);
  }

  ngOnChanges() {
    window.setTimeout(() => {
      if (this.input) {
        const el: HTMLElement = this.input.nativeElement;
        if (el) {
          el.focus();
        }
      }
    }, 0);
  }

  onSubmit() {
    const el = this.input.nativeElement;
    this.value = el.value;
    el.value = '';
    if (!this.inputRequired || this.value.length > 0) {
      this.content.addFrom(this.value);
    }
  }

  updateSuggestions(value) {
    if (this.suggestions && this.suggestions.length && value.length > 1) {
      this.visibleSuggestions = [];
      const prefixLength = value.length;
      for (const suggestion of this.suggestions) {
        const prefix = suggestion.slice(0, prefixLength);
        if (this.comparer(value, prefix) === 0) {
          this.visibleSuggestions.push([prefix, suggestion.slice(prefixLength)])
        }
      }
    } else {
      this.visibleSuggestions = null;
    }
  }

  selectSuggestion(value) {
    if (this.input) {
      this.input.nativeElement.value = value;
      this.validate();
      if (this.valid) {
        this.onSubmit();
        this.visibleSuggestions = null;
      }
    }
  }

  validate() {
    if (this.input) {
      const value = this.input.nativeElement.value;
      this.updateSuggestions(value);
      this.valid = !this.inputRequired || !!value;
      this.valid = this.valid && (!this.input.nativeElement.validity || this.input.nativeElement.validity.valid);
      this.valid = this.valid && (!this.validator || this.validator(value));
    } else {
      this.valid = !this.validator || this.validator('');
    }
    return this.valid;
  }
}
