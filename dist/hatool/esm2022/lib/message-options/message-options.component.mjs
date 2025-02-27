import { Component, Input } from '@angular/core';
import { defer, from } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class MessageOptionsComponent {
    constructor(el) {
        this.el = el;
        this.active = false;
        this.enabled = true;
        this.selected = null;
        this.isSelected = false;
        this.echoSelected = false;
    }
    ngOnInit() {
        if (this.params.selected !== null && this.params.selected !== undefined) {
            this.selected = this.params.selected;
            this.isSelected = true;
        }
        this.selectedJson = JSON.stringify(this.selected);
    }
    get multi() {
        return !!this.params.multi;
    }
    equalsSelected(value) {
        return JSON.stringify(value) === this.selectedJson;
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.active = true;
            if (!this.isSelected) {
                // console.log('FOCUSING OPTIONS', this.el.nativeElement.querySelector('button'));
                // this.el.nativeElement.querySelector('button').focus();
            }
        }, 0);
    }
    onSubmit(selected) {
        const value = selected.value;
        let obs = null;
        if (selected.func) {
            obs = defer(selected.func);
        }
        else {
            obs = from([value]);
        }
        obs.subscribe((retVal) => {
            if (retVal !== null) {
                this.enabled = false;
                this.selected = retVal;
                this.isSelected = true;
                this.echoSelected = selected.echo;
                this.selectedJson = JSON.stringify(this.selected);
                this.content.reportValue(this.selected);
            }
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessageOptionsComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: MessageOptionsComponent, selector: "htl-message-options", inputs: { params: "params", content: "content" }, ngImport: i0, template: "<span class='options' [class.selected]='isSelected' role='group'>\n  <ng-container *ngFor='let option of params.options'>\n    <button (click)='onSubmit(option)' \n            (animationend)='content.reportUpdated(null)'\n            [disabled]='!enabled' \n            [class]='option.class || \"\"'\n            [class.active]='active'\n            [class.selected]='isSelected && equalsSelected(option.value)'\n            [class.echo]='option.echo'\n            [class.not-selected]='isSelected && !equalsSelected(option.value)'\n    ><span [innerHtml]='option.display'></span></button>\n  </ng-container>\n  <a class='fixme' *ngIf='params.fixme && echoSelected' (click)='params.fixme()' [innerHTML]='params.fixmeMessage'></a>\n</span>", styles: [":host{flex:0 0 auto}:host .options{display:flex;flex-flow:row wrap;justify-content:space-evenly}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessageOptionsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'htl-message-options', template: "<span class='options' [class.selected]='isSelected' role='group'>\n  <ng-container *ngFor='let option of params.options'>\n    <button (click)='onSubmit(option)' \n            (animationend)='content.reportUpdated(null)'\n            [disabled]='!enabled' \n            [class]='option.class || \"\"'\n            [class.active]='active'\n            [class.selected]='isSelected && equalsSelected(option.value)'\n            [class.echo]='option.echo'\n            [class.not-selected]='isSelected && !equalsSelected(option.value)'\n    ><span [innerHtml]='option.display'></span></button>\n  </ng-container>\n  <a class='fixme' *ngIf='params.fixme && echoSelected' (click)='params.fixme()' [innerHTML]='params.fixmeMessage'></a>\n</span>", styles: [":host{flex:0 0 auto}:host .options{display:flex;flex-flow:row wrap;justify-content:space-evenly}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { params: [{
                type: Input
            }], content: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1vcHRpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2hhdG9vbC9zcmMvbGliL21lc3NhZ2Utb3B0aW9ucy9tZXNzYWdlLW9wdGlvbnMuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaGF0b29sL3NyYy9saWIvbWVzc2FnZS1vcHRpb25zL21lc3NhZ2Utb3B0aW9ucy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBbUQsTUFBTSxlQUFlLENBQUM7QUFHMUcsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQWMsTUFBTSxNQUFNLENBQUM7OztBQU8vQyxNQUFNLE9BQU8sdUJBQXVCO0lBWWxDLFlBQW9CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBUGxDLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixZQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2YsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGlCQUFZLEdBQUcsS0FBSyxDQUFDO0lBR2lCLENBQUM7SUFFdkMsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ3hFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDckMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDekIsQ0FBQztRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELElBQUksS0FBSztRQUNQLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQzdCLENBQUM7SUFFRCxjQUFjLENBQUMsS0FBSztRQUNsQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQztJQUNyRCxDQUFDO0lBRUQsZUFBZTtRQUNiLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNyQixrRkFBa0Y7Z0JBQ2xGLHlEQUF5RDtZQUMzRCxDQUFDO1FBQ0gsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQUVELFFBQVEsQ0FBQyxRQUFRO1FBQ2YsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUM3QixJQUFJLEdBQUcsR0FBb0IsSUFBSSxDQUFDO1FBQ2hDLElBQUksUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2xCLEdBQUcsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLENBQUM7YUFBTSxDQUFDO1lBQ04sR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDdEIsQ0FBQztRQUNELEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUN2QixJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUUsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO2dCQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFlBQVksR0FBSSxRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDMUMsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzsrR0ExRFUsdUJBQXVCO21HQUF2Qix1QkFBdUIsNkdDVnBDLHF1QkFhTzs7NEZESE0sdUJBQXVCO2tCQUxuQyxTQUFTOytCQUNFLHFCQUFxQjsrRUFNdEIsTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgQWZ0ZXJWaWV3SW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRlbnRTZXJ2aWNlIH0gZnJvbSAnLi4vY29udGVudC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRlbnRNYW5hZ2VyIH0gZnJvbSAnLi4vY29udGVudC1tYW5hZ2VyJztcbmltcG9ydCB7IGRlZmVyLCBmcm9tLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2h0bC1tZXNzYWdlLW9wdGlvbnMnLFxuICB0ZW1wbGF0ZVVybDogJy4vbWVzc2FnZS1vcHRpb25zLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWVzc2FnZS1vcHRpb25zLmNvbXBvbmVudC5sZXNzJ11cbn0pXG5leHBvcnQgY2xhc3MgTWVzc2FnZU9wdGlvbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuXG4gIEBJbnB1dCgpIHBhcmFtczogYW55O1xuICBASW5wdXQoKSBjb250ZW50OiBDb250ZW50TWFuYWdlcjtcblxuICBhY3RpdmUgPSBmYWxzZTtcbiAgZW5hYmxlZCA9IHRydWU7XG4gIHNlbGVjdGVkID0gbnVsbDtcbiAgaXNTZWxlY3RlZCA9IGZhbHNlO1xuICBlY2hvU2VsZWN0ZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBzZWxlY3RlZEpzb246IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5wYXJhbXMuc2VsZWN0ZWQgIT09IG51bGwgJiYgdGhpcy5wYXJhbXMuc2VsZWN0ZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMucGFyYW1zLnNlbGVjdGVkO1xuICAgICAgdGhpcy5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZEpzb24gPSBKU09OLnN0cmluZ2lmeSh0aGlzLnNlbGVjdGVkKTtcbiAgfVxuXG4gIGdldCBtdWx0aSgpIHtcbiAgICByZXR1cm4gISF0aGlzLnBhcmFtcy5tdWx0aTtcbiAgfVxuXG4gIGVxdWFsc1NlbGVjdGVkKHZhbHVlKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlKSA9PT0gdGhpcy5zZWxlY3RlZEpzb247XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICBpZiAoIXRoaXMuaXNTZWxlY3RlZCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnRk9DVVNJTkcgT1BUSU9OUycsIHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKSk7XG4gICAgICAgIC8vIHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKS5mb2N1cygpO1xuICAgICAgfVxuICAgIH0sIDApO1xuICB9XG5cbiAgb25TdWJtaXQoc2VsZWN0ZWQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHNlbGVjdGVkLnZhbHVlO1xuICAgIGxldCBvYnM6IE9ic2VydmFibGU8YW55PiA9IG51bGw7XG4gICAgaWYgKHNlbGVjdGVkLmZ1bmMpIHtcbiAgICAgIG9icyA9IGRlZmVyKHNlbGVjdGVkLmZ1bmMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYnMgPSBmcm9tKFt2YWx1ZV0pO1xuICAgIH1cbiAgICBvYnMuc3Vic2NyaWJlKChyZXRWYWwpID0+IHtcbiAgICAgIGlmIChyZXRWYWwgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSByZXRWYWw7XG4gICAgICAgIHRoaXMuaXNTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuZWNob1NlbGVjdGVkICA9IHNlbGVjdGVkLmVjaG87XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRKc29uID0gSlNPTi5zdHJpbmdpZnkodGhpcy5zZWxlY3RlZCk7XG4gICAgICAgIHRoaXMuY29udGVudC5yZXBvcnRWYWx1ZSh0aGlzLnNlbGVjdGVkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIiwiPHNwYW4gY2xhc3M9J29wdGlvbnMnIFtjbGFzcy5zZWxlY3RlZF09J2lzU2VsZWN0ZWQnIHJvbGU9J2dyb3VwJz5cbiAgPG5nLWNvbnRhaW5lciAqbmdGb3I9J2xldCBvcHRpb24gb2YgcGFyYW1zLm9wdGlvbnMnPlxuICAgIDxidXR0b24gKGNsaWNrKT0nb25TdWJtaXQob3B0aW9uKScgXG4gICAgICAgICAgICAoYW5pbWF0aW9uZW5kKT0nY29udGVudC5yZXBvcnRVcGRhdGVkKG51bGwpJ1xuICAgICAgICAgICAgW2Rpc2FibGVkXT0nIWVuYWJsZWQnIFxuICAgICAgICAgICAgW2NsYXNzXT0nb3B0aW9uLmNsYXNzIHx8IFwiXCInXG4gICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT0nYWN0aXZlJ1xuICAgICAgICAgICAgW2NsYXNzLnNlbGVjdGVkXT0naXNTZWxlY3RlZCAmJiBlcXVhbHNTZWxlY3RlZChvcHRpb24udmFsdWUpJ1xuICAgICAgICAgICAgW2NsYXNzLmVjaG9dPSdvcHRpb24uZWNobydcbiAgICAgICAgICAgIFtjbGFzcy5ub3Qtc2VsZWN0ZWRdPSdpc1NlbGVjdGVkICYmICFlcXVhbHNTZWxlY3RlZChvcHRpb24udmFsdWUpJ1xuICAgID48c3BhbiBbaW5uZXJIdG1sXT0nb3B0aW9uLmRpc3BsYXknPjwvc3Bhbj48L2J1dHRvbj5cbiAgPC9uZy1jb250YWluZXI+XG4gIDxhIGNsYXNzPSdmaXhtZScgKm5nSWY9J3BhcmFtcy5maXhtZSAmJiBlY2hvU2VsZWN0ZWQnIChjbGljayk9J3BhcmFtcy5maXhtZSgpJyBbaW5uZXJIVE1MXT0ncGFyYW1zLmZpeG1lTWVzc2FnZSc+PC9hPlxuPC9zcGFuPiJdfQ==