import { Component, Input, ViewChild } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class InputComponent {
    constructor() {
        this.inputRequired = true;
        this.suggestions = null;
        this.visibleSuggestions = null;
        this.value = null;
        this.valid = true;
        try {
            const collator = new Intl.Collator(['he', 'en', 'ru', 'ar', 'fr', 'es'], { sensitivity: 'base' });
            this.comparer = collator.compare;
        }
        catch (e) {
            this.comparer = (x, y) => x.toUpperCase() === y.toUpperCase() ? 0 : 1;
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
                const el = this.input.nativeElement;
                if (el) {
                    el.focus();
                }
            }
        }, 0);
    }
    onSubmit() {
        const el = this.input.nativeElement;
        this.value = el.value;
        this.visibleSuggestions = null;
        el.value = '';
        this.content.reportInput(this.value);
    }
    updateSuggestions(value) {
        if (this.suggestions && this.suggestions.length && value.length > 1) {
            this.visibleSuggestions = [];
            const prefixLength = value.length;
            for (const suggestion of this.suggestions) {
                const prefix = suggestion.slice(0, prefixLength);
                if (this.comparer(value, prefix) === 0) {
                    this.visibleSuggestions.push([prefix, suggestion.slice(prefixLength)]);
                }
            }
        }
        else {
            this.visibleSuggestions = null;
        }
    }
    selectSuggestion(value, event) {
        value = value[0] + value[1];
        if (this.input) {
            this.input.nativeElement.value = value;
            this.validate();
            if (this.valid) {
                this.onSubmit();
                this.visibleSuggestions = null;
            }
        }
        if (event) {
            event.preventDefault();
        }
    }
    validate() {
        if (this.input) {
            const value = this.input.nativeElement.value;
            this.updateSuggestions(value);
            this.valid = !this.inputRequired || !!value;
            if (!this.valid) {
                console.log('invalid as inputRequired=' + this.inputRequired + ', value=' + value);
                return false;
            }
            this.valid = (!this.input.nativeElement.validity || this.input.nativeElement.validity.valid);
            if (!this.valid) {
                console.log('invalid as nativeElement.validity=' + this.input.nativeElement.validity +
                    ', validity.valid=' + this.input.nativeElement.validity.valid);
                return false;
            }
            this.valid = (!this.validator || this.validator(value));
            if (!this.valid) {
                console.log('invalid as validator=' + this.validator + ', validator(value)=' + this.validator(value));
                return false;
            }
        }
        else {
            this.valid = !this.validator || this.validator('');
            if (!this.valid) {
                console.log('invalid as validator=' + this.validator + ', validator("")=' + this.validator(''));
                return false;
            }
        }
        return this.valid;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: InputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: InputComponent, selector: "htl-input", inputs: { content: "content", inputEnabled: "inputEnabled", textArea: "textArea", inputKind: "inputKind", inputMin: "inputMin", inputMax: "inputMax", inputStep: "inputStep", placeholder: "placeholder", inputRequired: "inputRequired", suggestions: "suggestions", validator: "validator" }, viewQueries: [{ propertyName: "input", first: true, predicate: ["input"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf='textArea && inputEnabled'>\n    <div class='textarea'>\n      <textarea rows='4' #input autofocus (keyup)='validate()' (change)='validate()'\n                [placeholder]='placeholder || content.inputPlaceholder'\n      ></textarea>\n      <button (click)='onSubmit()' [innerHTML]='content.sendButtonText' [disabled]='!valid'></button>\n    </div>\n</ng-container>\n<ng-container *ngIf='!textArea || !inputEnabled'>\n    <div class='suggestions-wrapper' *ngIf='visibleSuggestions && visibleSuggestions.length > 0'>\n      <div class='suggestions'>\n        <span class='suggestion' *ngFor='let suggestion of visibleSuggestions'\n             (click)='selectSuggestion(suggestion)' (touchstart)='selectSuggestion(suggestion, $event)'>\n          <strong>{{ suggestion[0] }}</strong>{{ suggestion[1] }}\n        </span>\n      </div>\n    </div>\n    <div class='input' *ngIf='inputEnabled' [class.invalid]='!valid'>\n      <input [type]='inputKind' #input (keyup)='validate() && ($event.keyCode == 13) && onSubmit()' (change)='validate()'\n            [attr.min]='inputMin' [attr.max]='inputMax' [attr.step]='inputStep'\n            [disabled]='!inputEnabled' [placeholder]='placeholder || content.inputPlaceholder'             \n            autofocus />\n      <button [disabled]='!valid' (click)='onSubmit()' [innerHTML]='content.sendButtonText' aria-label='SEND'></button>\n    </div>\n</ng-container>\n", styles: [":host{display:flex;flex-flow:column;flex:0 0 auto}:host .textarea,:host .input{display:flex;flex-flow:row;justify-content:stretch;align-items:center}:host .textarea button,:host .input button{flex:0 0 auto}:host .textarea textarea,:host .input textarea,:host .textarea input,:host .input input{flex:1 1 100%}:host .suggestions-wrapper{position:relative;overflow:visible;width:100%;height:0px}:host .suggestions-wrapper .suggestions{position:absolute;bottom:0;border:1px solid #89a9a8;margin:8px 0;z-index:1;width:100%;max-height:200px;overflow-y:scroll;overflow-x:hidden;display:flex;flex-flow:column;align-items:stretch;padding:0 8px;border-radius:8px;box-shadow:0 4px 8px #0000001f;background-color:#fff}:host .suggestions-wrapper .suggestions .suggestion{display:flex;flex:0 0 auto;flex-flow:row;align-items:center;justify-content:flex-start;height:40px;font-size:22px;border-bottom:solid 1px rgba(0,0,0,.12);padding:0 8px;white-space:pre;cursor:pointer}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: InputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'htl-input', template: "<ng-container *ngIf='textArea && inputEnabled'>\n    <div class='textarea'>\n      <textarea rows='4' #input autofocus (keyup)='validate()' (change)='validate()'\n                [placeholder]='placeholder || content.inputPlaceholder'\n      ></textarea>\n      <button (click)='onSubmit()' [innerHTML]='content.sendButtonText' [disabled]='!valid'></button>\n    </div>\n</ng-container>\n<ng-container *ngIf='!textArea || !inputEnabled'>\n    <div class='suggestions-wrapper' *ngIf='visibleSuggestions && visibleSuggestions.length > 0'>\n      <div class='suggestions'>\n        <span class='suggestion' *ngFor='let suggestion of visibleSuggestions'\n             (click)='selectSuggestion(suggestion)' (touchstart)='selectSuggestion(suggestion, $event)'>\n          <strong>{{ suggestion[0] }}</strong>{{ suggestion[1] }}\n        </span>\n      </div>\n    </div>\n    <div class='input' *ngIf='inputEnabled' [class.invalid]='!valid'>\n      <input [type]='inputKind' #input (keyup)='validate() && ($event.keyCode == 13) && onSubmit()' (change)='validate()'\n            [attr.min]='inputMin' [attr.max]='inputMax' [attr.step]='inputStep'\n            [disabled]='!inputEnabled' [placeholder]='placeholder || content.inputPlaceholder'             \n            autofocus />\n      <button [disabled]='!valid' (click)='onSubmit()' [innerHTML]='content.sendButtonText' aria-label='SEND'></button>\n    </div>\n</ng-container>\n", styles: [":host{display:flex;flex-flow:column;flex:0 0 auto}:host .textarea,:host .input{display:flex;flex-flow:row;justify-content:stretch;align-items:center}:host .textarea button,:host .input button{flex:0 0 auto}:host .textarea textarea,:host .input textarea,:host .textarea input,:host .input input{flex:1 1 100%}:host .suggestions-wrapper{position:relative;overflow:visible;width:100%;height:0px}:host .suggestions-wrapper .suggestions{position:absolute;bottom:0;border:1px solid #89a9a8;margin:8px 0;z-index:1;width:100%;max-height:200px;overflow-y:scroll;overflow-x:hidden;display:flex;flex-flow:column;align-items:stretch;padding:0 8px;border-radius:8px;box-shadow:0 4px 8px #0000001f;background-color:#fff}:host .suggestions-wrapper .suggestions .suggestion{display:flex;flex:0 0 auto;flex-flow:row;align-items:center;justify-content:flex-start;height:40px;font-size:22px;border-bottom:solid 1px rgba(0,0,0,.12);padding:0 8px;white-space:pre;cursor:pointer}\n"] }]
        }], ctorParameters: () => [], propDecorators: { content: [{
                type: Input
            }], inputEnabled: [{
                type: Input
            }], textArea: [{
                type: Input
            }], inputKind: [{
                type: Input
            }], inputMin: [{
                type: Input
            }], inputMax: [{
                type: Input
            }], inputStep: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], inputRequired: [{
                type: Input
            }], suggestions: [{
                type: Input
            }], validator: [{
                type: Input
            }], input: [{
                type: ViewChild,
                args: ['input']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaGF0b29sL3NyYy9saWIvaW5wdXQvaW5wdXQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaGF0b29sL3NyYy9saWIvaW5wdXQvaW5wdXQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsU0FBUyxFQUF5QixNQUFNLGVBQWUsQ0FBQzs7O0FBUzNGLE1BQU0sT0FBTyxjQUFjO0lBcUJ6QjtRQVhTLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLGdCQUFXLEdBQWEsSUFBSSxDQUFDO1FBSXRDLHVCQUFrQixHQUFlLElBQUksQ0FBQztRQUd0QyxVQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2IsVUFBSyxHQUFHLElBQUksQ0FBQztRQUdYLElBQUksQ0FBQztZQUNILE1BQU0sUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBQyxXQUFXLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztZQUNoRyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFDbkMsQ0FBQztRQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDWCxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEYsQ0FBQztJQUNILENBQUM7SUFFRCxRQUFRO1FBQ04sVUFBVSxDQUFDLEdBQUcsRUFB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RCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNoRyxPQUFPLEtBQUssQ0FBQztZQUNmLENBQUM7UUFDSCxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7K0dBakhVLGNBQWM7bUdBQWQsY0FBYyxzY0NUM0IscTVDQXlCQTs7NEZEaEJhLGNBQWM7a0JBTDFCLFNBQVM7K0JBQ0UsV0FBVzt3REFNWixPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDYyxLQUFLO3NCQUF4QixTQUFTO3VCQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgT25DaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250ZW50U2VydmljZSB9IGZyb20gJy4uL2NvbnRlbnQuc2VydmljZSc7XG5pbXBvcnQgeyBDb250ZW50TWFuYWdlciB9IGZyb20gJy4uL2NvbnRlbnQtbWFuYWdlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2h0bC1pbnB1dCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2lucHV0LmNvbXBvbmVudC5sZXNzJ11cbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCkgY29udGVudDogQ29udGVudE1hbmFnZXI7XG4gIEBJbnB1dCgpIGlucHV0RW5hYmxlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgdGV4dEFyZWE6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGlucHV0S2luZDogc3RyaW5nO1xuICBASW5wdXQoKSBpbnB1dE1pbjtcbiAgQElucHV0KCkgaW5wdXRNYXg7XG4gIEBJbnB1dCgpIGlucHV0U3RlcDtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgQElucHV0KCkgaW5wdXRSZXF1aXJlZCA9IHRydWU7XG4gIEBJbnB1dCgpIHN1Z2dlc3Rpb25zOiBzdHJpbmdbXSA9IG51bGw7XG4gIEBJbnB1dCgpIHZhbGlkYXRvcjogKGFyZzogYW55KSA9PiBib29sZWFuO1xuICBAVmlld0NoaWxkKCdpbnB1dCcpIGlucHV0OiBFbGVtZW50UmVmO1xuXG4gIHZpc2libGVTdWdnZXN0aW9uczogc3RyaW5nW11bXSA9IG51bGw7XG4gIGNvbXBhcmVyOiAoeDogc3RyaW5nLCB5OiBzdHJpbmcpID0+IG51bWJlcjtcblxuICB2YWx1ZSA9IG51bGw7XG4gIHZhbGlkID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY29sbGF0b3IgPSBuZXcgSW50bC5Db2xsYXRvcihbJ2hlJywgJ2VuJywgJ3J1JywgJ2FyJywgJ2ZyJywgJ2VzJ10sIHtzZW5zaXRpdml0eTogJ2Jhc2UnfSk7XG4gICAgICB0aGlzLmNvbXBhcmVyID0gY29sbGF0b3IuY29tcGFyZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmNvbXBhcmVyID0gKHg6IHN0cmluZywgeTogc3RyaW5nKSA9PiB4LnRvVXBwZXJDYXNlKCkgPT09IHkudG9VcHBlckNhc2UoKSA/IDAgOiAxO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy52YWxpZGF0ZSgpO1xuICAgIH0sIDApO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuaW5wdXQpIHtcbiAgICAgICAgY29uc3QgZWw6IEhUTUxFbGVtZW50ID0gdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBpZiAoZWwpIHtcbiAgICAgICAgICBlbC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgMCk7XG4gIH1cblxuICBvblN1Ym1pdCgpIHtcbiAgICBjb25zdCBlbCA9IHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLnZhbHVlID0gZWwudmFsdWU7XG4gICAgdGhpcy52aXNpYmxlU3VnZ2VzdGlvbnMgPSBudWxsO1xuICAgIGVsLnZhbHVlID0gJyc7XG4gICAgdGhpcy5jb250ZW50LnJlcG9ydElucHV0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgdXBkYXRlU3VnZ2VzdGlvbnModmFsdWUpIHtcbiAgICBpZiAodGhpcy5zdWdnZXN0aW9ucyAmJiB0aGlzLnN1Z2dlc3Rpb25zLmxlbmd0aCAmJiB2YWx1ZS5sZW5ndGggPiAxKSB7XG4gICAgICB0aGlzLnZpc2libGVTdWdnZXN0aW9ucyA9IFtdO1xuICAgICAgY29uc3QgcHJlZml4TGVuZ3RoID0gdmFsdWUubGVuZ3RoO1xuICAgICAgZm9yIChjb25zdCBzdWdnZXN0aW9uIG9mIHRoaXMuc3VnZ2VzdGlvbnMpIHtcbiAgICAgICAgY29uc3QgcHJlZml4ID0gc3VnZ2VzdGlvbi5zbGljZSgwLCBwcmVmaXhMZW5ndGgpO1xuICAgICAgICBpZiAodGhpcy5jb21wYXJlcih2YWx1ZSwgcHJlZml4KSA9PT0gMCkge1xuICAgICAgICAgIHRoaXMudmlzaWJsZVN1Z2dlc3Rpb25zLnB1c2goW3ByZWZpeCwgc3VnZ2VzdGlvbi5zbGljZShwcmVmaXhMZW5ndGgpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52aXNpYmxlU3VnZ2VzdGlvbnMgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdFN1Z2dlc3Rpb24odmFsdWUsIGV2ZW50Pykge1xuICAgIHZhbHVlID0gdmFsdWVbMF0gKyB2YWx1ZVsxXTtcbiAgICBpZiAodGhpcy5pbnB1dCkge1xuICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLnZhbGlkYXRlKCk7XG4gICAgICBpZiAodGhpcy52YWxpZCkge1xuICAgICAgICB0aGlzLm9uU3VibWl0KCk7XG4gICAgICAgIHRoaXMudmlzaWJsZVN1Z2dlc3Rpb25zID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIHZhbGlkYXRlKCkge1xuICAgIGlmICh0aGlzLmlucHV0KSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICAgIHRoaXMudXBkYXRlU3VnZ2VzdGlvbnModmFsdWUpO1xuICAgICAgdGhpcy52YWxpZCA9ICF0aGlzLmlucHV0UmVxdWlyZWQgfHwgISF2YWx1ZTtcbiAgICAgIGlmICghdGhpcy52YWxpZCkge1xuICAgICAgICBjb25zb2xlLmxvZygnaW52YWxpZCBhcyBpbnB1dFJlcXVpcmVkPScgKyB0aGlzLmlucHV0UmVxdWlyZWQgKyAnLCB2YWx1ZT0nICsgdmFsdWUpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICB0aGlzLnZhbGlkID0gKCF0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsaWRpdHkgfHwgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnZhbGlkaXR5LnZhbGlkKTtcbiAgICAgIGlmICghdGhpcy52YWxpZCkge1xuICAgICAgICBjb25zb2xlLmxvZygnaW52YWxpZCBhcyBuYXRpdmVFbGVtZW50LnZhbGlkaXR5PScgKyB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsaWRpdHkgK1xuICAgICAgICAgICAgICAgICAgICAnLCB2YWxpZGl0eS52YWxpZD0nICsgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnZhbGlkaXR5LnZhbGlkKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgdGhpcy52YWxpZCA9ICghdGhpcy52YWxpZGF0b3IgfHwgdGhpcy52YWxpZGF0b3IodmFsdWUpKTtcbiAgICAgIGlmICghdGhpcy52YWxpZCkge1xuICAgICAgICBjb25zb2xlLmxvZygnaW52YWxpZCBhcyB2YWxpZGF0b3I9JyArIHRoaXMudmFsaWRhdG9yICsgJywgdmFsaWRhdG9yKHZhbHVlKT0nICsgdGhpcy52YWxpZGF0b3IodmFsdWUpKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbGlkID0gIXRoaXMudmFsaWRhdG9yIHx8IHRoaXMudmFsaWRhdG9yKCcnKTtcbiAgICAgIGlmICghdGhpcy52YWxpZCkge1xuICAgICAgICBjb25zb2xlLmxvZygnaW52YWxpZCBhcyB2YWxpZGF0b3I9JyArIHRoaXMudmFsaWRhdG9yICsgJywgdmFsaWRhdG9yKFwiXCIpPScgKyB0aGlzLnZhbGlkYXRvcignJykpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnZhbGlkO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPSd0ZXh0QXJlYSAmJiBpbnB1dEVuYWJsZWQnPlxuICAgIDxkaXYgY2xhc3M9J3RleHRhcmVhJz5cbiAgICAgIDx0ZXh0YXJlYSByb3dzPSc0JyAjaW5wdXQgYXV0b2ZvY3VzIChrZXl1cCk9J3ZhbGlkYXRlKCknIChjaGFuZ2UpPSd2YWxpZGF0ZSgpJ1xuICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09J3BsYWNlaG9sZGVyIHx8IGNvbnRlbnQuaW5wdXRQbGFjZWhvbGRlcidcbiAgICAgID48L3RleHRhcmVhPlxuICAgICAgPGJ1dHRvbiAoY2xpY2spPSdvblN1Ym1pdCgpJyBbaW5uZXJIVE1MXT0nY29udGVudC5zZW5kQnV0dG9uVGV4dCcgW2Rpc2FibGVkXT0nIXZhbGlkJz48L2J1dHRvbj5cbiAgICA8L2Rpdj5cbjwvbmctY29udGFpbmVyPlxuPG5nLWNvbnRhaW5lciAqbmdJZj0nIXRleHRBcmVhIHx8ICFpbnB1dEVuYWJsZWQnPlxuICAgIDxkaXYgY2xhc3M9J3N1Z2dlc3Rpb25zLXdyYXBwZXInICpuZ0lmPSd2aXNpYmxlU3VnZ2VzdGlvbnMgJiYgdmlzaWJsZVN1Z2dlc3Rpb25zLmxlbmd0aCA+IDAnPlxuICAgICAgPGRpdiBjbGFzcz0nc3VnZ2VzdGlvbnMnPlxuICAgICAgICA8c3BhbiBjbGFzcz0nc3VnZ2VzdGlvbicgKm5nRm9yPSdsZXQgc3VnZ2VzdGlvbiBvZiB2aXNpYmxlU3VnZ2VzdGlvbnMnXG4gICAgICAgICAgICAgKGNsaWNrKT0nc2VsZWN0U3VnZ2VzdGlvbihzdWdnZXN0aW9uKScgKHRvdWNoc3RhcnQpPSdzZWxlY3RTdWdnZXN0aW9uKHN1Z2dlc3Rpb24sICRldmVudCknPlxuICAgICAgICAgIDxzdHJvbmc+e3sgc3VnZ2VzdGlvblswXSB9fTwvc3Ryb25nPnt7IHN1Z2dlc3Rpb25bMV0gfX1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz0naW5wdXQnICpuZ0lmPSdpbnB1dEVuYWJsZWQnIFtjbGFzcy5pbnZhbGlkXT0nIXZhbGlkJz5cbiAgICAgIDxpbnB1dCBbdHlwZV09J2lucHV0S2luZCcgI2lucHV0IChrZXl1cCk9J3ZhbGlkYXRlKCkgJiYgKCRldmVudC5rZXlDb2RlID09IDEzKSAmJiBvblN1Ym1pdCgpJyAoY2hhbmdlKT0ndmFsaWRhdGUoKSdcbiAgICAgICAgICAgIFthdHRyLm1pbl09J2lucHV0TWluJyBbYXR0ci5tYXhdPSdpbnB1dE1heCcgW2F0dHIuc3RlcF09J2lucHV0U3RlcCdcbiAgICAgICAgICAgIFtkaXNhYmxlZF09JyFpbnB1dEVuYWJsZWQnIFtwbGFjZWhvbGRlcl09J3BsYWNlaG9sZGVyIHx8IGNvbnRlbnQuaW5wdXRQbGFjZWhvbGRlcicgICAgICAgICAgICAgXG4gICAgICAgICAgICBhdXRvZm9jdXMgLz5cbiAgICAgIDxidXR0b24gW2Rpc2FibGVkXT0nIXZhbGlkJyAoY2xpY2spPSdvblN1Ym1pdCgpJyBbaW5uZXJIVE1MXT0nY29udGVudC5zZW5kQnV0dG9uVGV4dCcgYXJpYS1sYWJlbD0nU0VORCc+PC9idXR0b24+XG4gICAgPC9kaXY+XG48L25nLWNvbnRhaW5lcj5cbiJdfQ==