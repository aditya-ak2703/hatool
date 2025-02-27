import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class MessageFromComponent {
    constructor() { }
    ngOnInit() {
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessageFromComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: MessageFromComponent, selector: "htl-message-from", inputs: { params: "params", first: "first", content: "content" }, ngImport: i0, template: "<div [class.message-from-wrapper]='true' [class.first]='first'>\n  <p class='speech-bubble'>\n    <span>{{ params.message }}</span>\n  </p>\n  <a class='fixme' *ngIf='params.fixme' (click)='params.fixme()' [innerHTML]='params.fixmeMessage'></a>\n</div>\n", styles: [":host{display:flex;justify-content:right;flex:0 0 auto;align-items:flex-start;justify-content:flex-start}:host .message-from-wrapper{display:flex;flex-wrap:wrap;align-items:flex-end;flex-flow:row}:host p{flex:0 1 auto;text-align:right}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessageFromComponent, decorators: [{
            type: Component,
            args: [{ selector: 'htl-message-from', template: "<div [class.message-from-wrapper]='true' [class.first]='first'>\n  <p class='speech-bubble'>\n    <span>{{ params.message }}</span>\n  </p>\n  <a class='fixme' *ngIf='params.fixme' (click)='params.fixme()' [innerHTML]='params.fixmeMessage'></a>\n</div>\n", styles: [":host{display:flex;justify-content:right;flex:0 0 auto;align-items:flex-start;justify-content:flex-start}:host .message-from-wrapper{display:flex;flex-wrap:wrap;align-items:flex-end;flex-flow:row}:host p{flex:0 1 auto;text-align:right}\n"] }]
        }], ctorParameters: () => [], propDecorators: { params: [{
                type: Input
            }], first: [{
                type: Input
            }], content: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1mcm9tLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2hhdG9vbC9zcmMvbGliL21lc3NhZ2UtZnJvbS9tZXNzYWdlLWZyb20uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaGF0b29sL3NyYy9saWIvbWVzc2FnZS1mcm9tL21lc3NhZ2UtZnJvbS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBUXpELE1BQU0sT0FBTyxvQkFBb0I7SUFNL0IsZ0JBQWdCLENBQUM7SUFFakIsUUFBUTtJQUNSLENBQUM7K0dBVFUsb0JBQW9CO21HQUFwQixvQkFBb0IsMEhDUmpDLGdRQU1BOzs0RkRFYSxvQkFBb0I7a0JBTGhDLFNBQVM7K0JBQ0Usa0JBQWtCO3dEQU1uQixNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udGVudE1hbmFnZXIgfSBmcm9tICcuLi9jb250ZW50LW1hbmFnZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdodGwtbWVzc2FnZS1mcm9tJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21lc3NhZ2UtZnJvbS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21lc3NhZ2UtZnJvbS5jb21wb25lbnQubGVzcyddXG59KVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VGcm9tQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBwYXJhbXM6IGFueTtcbiAgQElucHV0KCkgZmlyc3Q6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNvbnRlbnQ6IENvbnRlbnRNYW5hZ2VyO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiPGRpdiBbY2xhc3MubWVzc2FnZS1mcm9tLXdyYXBwZXJdPSd0cnVlJyBbY2xhc3MuZmlyc3RdPSdmaXJzdCc+XG4gIDxwIGNsYXNzPSdzcGVlY2gtYnViYmxlJz5cbiAgICA8c3Bhbj57eyBwYXJhbXMubWVzc2FnZSB9fTwvc3Bhbj5cbiAgPC9wPlxuICA8YSBjbGFzcz0nZml4bWUnICpuZ0lmPSdwYXJhbXMuZml4bWUnIChjbGljayk9J3BhcmFtcy5maXhtZSgpJyBbaW5uZXJIVE1MXT0ncGFyYW1zLmZpeG1lTWVzc2FnZSc+PC9hPlxuPC9kaXY+XG4iXX0=