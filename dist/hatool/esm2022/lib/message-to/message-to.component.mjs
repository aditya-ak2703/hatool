import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class MessageToComponent {
    constructor() { }
    ngOnInit() {
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessageToComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: MessageToComponent, selector: "htl-message-to", inputs: { params: "params", first: "first", content: "content" }, ngImport: i0, template: "<div class='message-to-wrapper' [class.first]='first'>\n  <p class='speech-bubble'>\n    <span [innerHtml]='params.message'></span>\n  </p>\n</div>\n", styles: [":host{display:flex;justify-content:left;flex:0 0 auto;align-items:flex-end;justify-content:flex-end}:host .message-to-wrapper{display:flex;flex-wrap:wrap;align-items:flex-start;flex-flow:row}:host p{flex:0 1 auto;text-align:right}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessageToComponent, decorators: [{
            type: Component,
            args: [{ selector: 'htl-message-to', template: "<div class='message-to-wrapper' [class.first]='first'>\n  <p class='speech-bubble'>\n    <span [innerHtml]='params.message'></span>\n  </p>\n</div>\n", styles: [":host{display:flex;justify-content:left;flex:0 0 auto;align-items:flex-end;justify-content:flex-end}:host .message-to-wrapper{display:flex;flex-wrap:wrap;align-items:flex-start;flex-flow:row}:host p{flex:0 1 auto;text-align:right}\n"] }]
        }], ctorParameters: () => [], propDecorators: { params: [{
                type: Input
            }], first: [{
                type: Input
            }], content: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS10by5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9oYXRvb2wvc3JjL2xpYi9tZXNzYWdlLXRvL21lc3NhZ2UtdG8uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaGF0b29sL3NyYy9saWIvbWVzc2FnZS10by9tZXNzYWdlLXRvLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVF6RCxNQUFNLE9BQU8sa0JBQWtCO0lBTTdCLGdCQUFnQixDQUFDO0lBRWpCLFFBQVE7SUFDUixDQUFDOytHQVRVLGtCQUFrQjttR0FBbEIsa0JBQWtCLHdIQ1IvQix1SkFLQTs7NEZER2Esa0JBQWtCO2tCQUw5QixTQUFTOytCQUNFLGdCQUFnQjt3REFNakIsTUFBTTtzQkFBZCxLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRlbnRNYW5hZ2VyIH0gZnJvbSAnLi4vY29udGVudC1tYW5hZ2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaHRsLW1lc3NhZ2UtdG8nLFxuICB0ZW1wbGF0ZVVybDogJy4vbWVzc2FnZS10by5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21lc3NhZ2UtdG8uY29tcG9uZW50Lmxlc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBNZXNzYWdlVG9Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIHBhcmFtczogYW55O1xuICBASW5wdXQoKSBmaXJzdDogYm9vbGVhbjtcbiAgQElucHV0KCkgY29udGVudDogQ29udGVudE1hbmFnZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCI8ZGl2IGNsYXNzPSdtZXNzYWdlLXRvLXdyYXBwZXInIFtjbGFzcy5maXJzdF09J2ZpcnN0Jz5cbiAgPHAgY2xhc3M9J3NwZWVjaC1idWJibGUnPlxuICAgIDxzcGFuIFtpbm5lckh0bWxdPSdwYXJhbXMubWVzc2FnZSc+PC9zcGFuPlxuICA8L3A+XG48L2Rpdj5cbiJdfQ==