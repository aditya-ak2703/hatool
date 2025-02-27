import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./content.service";
import * as i2 from "./chatbox/chatbox.component";
export class HatoolLibComponent {
    constructor(contentService) {
        this.contentService = contentService;
    }
    ngOnInit() {
        this.content = this.content ? this.content : this.contentService.M;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: HatoolLibComponent, deps: [{ token: i1.ContentService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: HatoolLibComponent, selector: "htl-hatool", inputs: { content: "content" }, ngImport: i0, template: `
      <htl-chatbox [content]='content'></htl-chatbox>
  `, isInline: true, styles: [":host{display:block;width:100%;height:100%}\n"], dependencies: [{ kind: "component", type: i2.ChatboxComponent, selector: "htl-chatbox", inputs: ["content"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: HatoolLibComponent, decorators: [{
            type: Component,
            args: [{ selector: 'htl-hatool', template: `
      <htl-chatbox [content]='content'></htl-chatbox>
  `, styles: [":host{display:block;width:100%;height:100%}\n"] }]
        }], ctorParameters: () => [{ type: i1.ContentService }], propDecorators: { content: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGF0b29sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2hhdG9vbC9zcmMvbGliL2hhdG9vbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFXekQsTUFBTSxPQUFPLGtCQUFrQjtJQUk3QixZQUFvQixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7SUFBSSxDQUFDO0lBRXZELFFBQVE7UUFDTixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7K0dBUlUsa0JBQWtCO21HQUFsQixrQkFBa0Isa0ZBTG5COztHQUVUOzs0RkFHVSxrQkFBa0I7a0JBUDlCLFNBQVM7K0JBQ0UsWUFBWSxZQUNaOztHQUVUO21GQUtRLE9BQU87c0JBQWYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udGVudFNlcnZpY2UgfSBmcm9tICcuL2NvbnRlbnQuc2VydmljZSc7XG5pbXBvcnQgeyBDb250ZW50TWFuYWdlciB9IGZyb20gJy4vY29udGVudC1tYW5hZ2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaHRsLWhhdG9vbCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8aHRsLWNoYXRib3ggW2NvbnRlbnRdPSdjb250ZW50Jz48L2h0bC1jaGF0Ym94PlxuICBgLFxuICBzdHlsZVVybHM6IFsnLi9oYXRvb2wuY29tcG9uZW50Lmxlc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBIYXRvb2xMaWJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGNvbnRlbnQ6IENvbnRlbnRNYW5hZ2VyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGVudFNlcnZpY2U6IENvbnRlbnRTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLmNvbnRlbnQgPyB0aGlzLmNvbnRlbnQgOiB0aGlzLmNvbnRlbnRTZXJ2aWNlLk07XG4gIH1cblxufVxuIl19