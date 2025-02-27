import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class MessageMultiOptionsComponent {
    constructor() {
        this.active = false;
        this.enabled = true;
        this.selected = false;
        this.checked = false;
        this.value = null;
    }
    ngOnInit() {
        this.value = this.params.selected || {};
        this.selected = !!this.params.selected;
        this.checkChecked();
    }
    get multi() {
        return !!this.params.multi;
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.active = true;
            this.content.reportUpdated(null);
        }, 0);
    }
    toggle(field) {
        this.value[field] = !this.value[field];
        this.checkChecked();
    }
    onSubmit() {
        this.enabled = false;
        this.selected = true;
        this.content.reportValue(this.value);
    }
    checkChecked() {
        this.checked = Object.values(this.value).indexOf(true) >= 0;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessageMultiOptionsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: MessageMultiOptionsComponent, selector: "htl-message-multi-options", inputs: { params: "params", content: "content" }, ngImport: i0, template: "<span class='options' [class.selected]='selected' [class.checked]='checked'>\n  <ng-container *ngFor='let option of params.options'>\n    <button (click)='option.field ? toggle(option.field) : onSubmit()' \n            (animationend)='content.reportUpdated(null)'\n            [disabled]='!enabled' \n            [class]='option.class || \"\"'\n            [class.active]='active'\n            [class.selected]='!!value[option.field]'\n            [class.echo]='option.echo'\n            [class.not-selected]='selected && !value[option.field]'\n    ><span [innerHtml]='option.display'></span></button>\n  </ng-container>\n  <a class='fixme' *ngIf='params.fixme' (click)='params.fixme()' [innerHTML]='params.fixmeMessage'></a>\n</span>", styles: [":host{flex:0 0 auto}:host .options{display:flex;flex-flow:row wrap;justify-content:space-evenly}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessageMultiOptionsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'htl-message-multi-options', template: "<span class='options' [class.selected]='selected' [class.checked]='checked'>\n  <ng-container *ngFor='let option of params.options'>\n    <button (click)='option.field ? toggle(option.field) : onSubmit()' \n            (animationend)='content.reportUpdated(null)'\n            [disabled]='!enabled' \n            [class]='option.class || \"\"'\n            [class.active]='active'\n            [class.selected]='!!value[option.field]'\n            [class.echo]='option.echo'\n            [class.not-selected]='selected && !value[option.field]'\n    ><span [innerHtml]='option.display'></span></button>\n  </ng-container>\n  <a class='fixme' *ngIf='params.fixme' (click)='params.fixme()' [innerHTML]='params.fixmeMessage'></a>\n</span>", styles: [":host{flex:0 0 auto}:host .options{display:flex;flex-flow:row wrap;justify-content:space-evenly}\n"] }]
        }], ctorParameters: () => [], propDecorators: { params: [{
                type: Input
            }], content: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1tdWx0aS1vcHRpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2hhdG9vbC9zcmMvbGliL21lc3NhZ2UtbXVsdGktb3B0aW9ucy9tZXNzYWdlLW11bHRpLW9wdGlvbnMuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaGF0b29sL3NyYy9saWIvbWVzc2FnZS1tdWx0aS1vcHRpb25zL21lc3NhZ2UtbXVsdGktb3B0aW9ucy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBdUMsTUFBTSxlQUFlLENBQUM7OztBQVM5RixNQUFNLE9BQU8sNEJBQTRCO0lBV3ZDO1FBTkEsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFDZixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsVUFBSyxHQUFHLElBQUksQ0FBQztJQUVHLENBQUM7SUFFakIsUUFBUTtRQUNOLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUVELGVBQWU7UUFDYixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFLO1FBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlELENBQUM7K0dBM0NVLDRCQUE0QjttR0FBNUIsNEJBQTRCLG1IQ1R6QyxndUJBYU87OzRGREpNLDRCQUE0QjtrQkFMeEMsU0FBUzsrQkFDRSwyQkFBMkI7d0RBTTVCLE1BQU07c0JBQWQsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEFmdGVyVmlld0luaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250ZW50U2VydmljZSB9IGZyb20gJy4uL2NvbnRlbnQuc2VydmljZSc7XG5pbXBvcnQgeyBDb250ZW50TWFuYWdlciB9IGZyb20gJy4uL2NvbnRlbnQtbWFuYWdlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2h0bC1tZXNzYWdlLW11bHRpLW9wdGlvbnMnLFxuICB0ZW1wbGF0ZVVybDogJy4vbWVzc2FnZS1tdWx0aS1vcHRpb25zLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWVzc2FnZS1tdWx0aS1vcHRpb25zLmNvbXBvbmVudC5sZXNzJ11cbn0pXG5leHBvcnQgY2xhc3MgTWVzc2FnZU11bHRpT3B0aW9uc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgQElucHV0KCkgcGFyYW1zOiBhbnk7XG4gIEBJbnB1dCgpIGNvbnRlbnQ6IENvbnRlbnRNYW5hZ2VyO1xuXG4gIGFjdGl2ZSA9IGZhbHNlO1xuICBlbmFibGVkID0gdHJ1ZTtcbiAgc2VsZWN0ZWQgPSBmYWxzZTtcbiAgY2hlY2tlZCA9IGZhbHNlO1xuICB2YWx1ZSA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5wYXJhbXMuc2VsZWN0ZWQgfHwge307XG4gICAgdGhpcy5zZWxlY3RlZCA9ICEhdGhpcy5wYXJhbXMuc2VsZWN0ZWQ7XG4gICAgdGhpcy5jaGVja0NoZWNrZWQoKTtcbiAgfVxuXG4gIGdldCBtdWx0aSgpIHtcbiAgICByZXR1cm4gISF0aGlzLnBhcmFtcy5tdWx0aTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgIHRoaXMuY29udGVudC5yZXBvcnRVcGRhdGVkKG51bGwpO1xuICAgIH0sIDApO1xuICB9XG5cbiAgdG9nZ2xlKGZpZWxkKSB7XG4gICAgdGhpcy52YWx1ZVtmaWVsZF0gPSAhdGhpcy52YWx1ZVtmaWVsZF07XG4gICAgdGhpcy5jaGVja0NoZWNrZWQoKTtcbiAgfVxuXG4gIG9uU3VibWl0KCkge1xuICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xuICAgIHRoaXMuY29udGVudC5yZXBvcnRWYWx1ZSh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIGNoZWNrQ2hlY2tlZCgpIHtcbiAgICB0aGlzLmNoZWNrZWQgPSBPYmplY3QudmFsdWVzKHRoaXMudmFsdWUpLmluZGV4T2YodHJ1ZSkgPj0gMDtcbiAgfVxufVxuIiwiPHNwYW4gY2xhc3M9J29wdGlvbnMnIFtjbGFzcy5zZWxlY3RlZF09J3NlbGVjdGVkJyBbY2xhc3MuY2hlY2tlZF09J2NoZWNrZWQnPlxuICA8bmctY29udGFpbmVyICpuZ0Zvcj0nbGV0IG9wdGlvbiBvZiBwYXJhbXMub3B0aW9ucyc+XG4gICAgPGJ1dHRvbiAoY2xpY2spPSdvcHRpb24uZmllbGQgPyB0b2dnbGUob3B0aW9uLmZpZWxkKSA6IG9uU3VibWl0KCknIFxuICAgICAgICAgICAgKGFuaW1hdGlvbmVuZCk9J2NvbnRlbnQucmVwb3J0VXBkYXRlZChudWxsKSdcbiAgICAgICAgICAgIFtkaXNhYmxlZF09JyFlbmFibGVkJyBcbiAgICAgICAgICAgIFtjbGFzc109J29wdGlvbi5jbGFzcyB8fCBcIlwiJ1xuICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09J2FjdGl2ZSdcbiAgICAgICAgICAgIFtjbGFzcy5zZWxlY3RlZF09JyEhdmFsdWVbb3B0aW9uLmZpZWxkXSdcbiAgICAgICAgICAgIFtjbGFzcy5lY2hvXT0nb3B0aW9uLmVjaG8nXG4gICAgICAgICAgICBbY2xhc3Mubm90LXNlbGVjdGVkXT0nc2VsZWN0ZWQgJiYgIXZhbHVlW29wdGlvbi5maWVsZF0nXG4gICAgPjxzcGFuIFtpbm5lckh0bWxdPSdvcHRpb24uZGlzcGxheSc+PC9zcGFuPjwvYnV0dG9uPlxuICA8L25nLWNvbnRhaW5lcj5cbiAgPGEgY2xhc3M9J2ZpeG1lJyAqbmdJZj0ncGFyYW1zLmZpeG1lJyAoY2xpY2spPSdwYXJhbXMuZml4bWUoKScgW2lubmVySFRNTF09J3BhcmFtcy5maXhtZU1lc3NhZ2UnPjwvYT5cbjwvc3Bhbj4iXX0=