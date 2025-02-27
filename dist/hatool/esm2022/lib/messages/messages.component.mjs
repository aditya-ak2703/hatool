import { Component, ViewChild, Input, HostListener } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../message-switch/message-switch.component";
export class MessagesComponent {
    constructor() {
    }
    resize(e) {
        this.updateScroll();
    }
    updateScroll() {
        setTimeout(() => {
            const el = this.container.nativeElement;
            if (this.content.debug) {
                console.log('SCROLLING TO BOTTOM');
            }
            el.scrollTo({ left: 0, top: el.scrollHeight, behavior: this.content.fastScroll ? 'auto' : 'smooth' });
        }, 0);
    }
    ngOnInit() {
    }
    ngOnChanges() {
        if (this.updatedSub) {
            this.updatedSub.unsubscribe();
        }
        this.updatedSub = this.content.updated.subscribe(() => {
            this.updateScroll();
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessagesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: MessagesComponent, selector: "htl-messages", inputs: { content: "content" }, host: { listeners: { "window:resize": "resize($event)" } }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<div class='container' [class.fast-scroll]='content.fastScroll' [class.scroll-lock]='content.scrollLock' #container>\n  <ng-container *ngFor='let item of content.messages'>\n    <htl-message-switch [content]='content' [item]='item'\n                        [style.display]='content.visibleRevision < item.revision ? \"none\" : \"block\"'>\n    ></htl-message-switch>\n  </ng-container>\n</div>", styles: [":host{display:flex;flex-flow:column;justify-content:flex-end;overflow-y:hidden;flex:1 1 100%}:host .container{display:flex;flex-flow:column;height:100%;margin-left:0;margin-right:0;flex-basis:auto;flex-grow:1;flex-shrink:1;overflow-wrap:break-word;overflow-y:auto;overflow:-moz-scrollbars-none;-ms-overflow-style:none;scroll-behavior:smooth}:host .container.scroll-lock{overflow-y:hidden}:host .container::-webkit-scrollbar{width:0!important}:host .container :first-child{margin-top:auto}:host .container.fast-scroll{scroll-behavior:auto}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: i2.MessageSwitchComponent, selector: "htl-message-switch", inputs: ["content", "item"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessagesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'htl-messages', template: "<div class='container' [class.fast-scroll]='content.fastScroll' [class.scroll-lock]='content.scrollLock' #container>\n  <ng-container *ngFor='let item of content.messages'>\n    <htl-message-switch [content]='content' [item]='item'\n                        [style.display]='content.visibleRevision < item.revision ? \"none\" : \"block\"'>\n    ></htl-message-switch>\n  </ng-container>\n</div>", styles: [":host{display:flex;flex-flow:column;justify-content:flex-end;overflow-y:hidden;flex:1 1 100%}:host .container{display:flex;flex-flow:column;height:100%;margin-left:0;margin-right:0;flex-basis:auto;flex-grow:1;flex-shrink:1;overflow-wrap:break-word;overflow-y:auto;overflow:-moz-scrollbars-none;-ms-overflow-style:none;scroll-behavior:smooth}:host .container.scroll-lock{overflow-y:hidden}:host .container::-webkit-scrollbar{width:0!important}:host .container :first-child{margin-top:auto}:host .container.fast-scroll{scroll-behavior:auto}\n"] }]
        }], ctorParameters: () => [], propDecorators: { container: [{
                type: ViewChild,
                args: ['container', { static: true }]
            }], content: [{
                type: Input
            }], resize: [{
                type: HostListener,
                args: ['window:resize', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaGF0b29sL3NyYy9saWIvbWVzc2FnZXMvbWVzc2FnZXMuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaGF0b29sL3NyYy9saWIvbWVzc2FnZXMvbWVzc2FnZXMuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBcUIsU0FBUyxFQUFjLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFVekcsTUFBTSxPQUFPLGlCQUFpQjtJQU81QjtJQUNBLENBQUM7SUFHRCxNQUFNLENBQUMsQ0FBQztRQUNOLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsWUFBWTtRQUNWLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxNQUFNLEVBQUUsR0FBZ0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7WUFDckQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDckMsQ0FBQztZQUNELEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7SUFFRCxRQUFRO0lBQ1IsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hDLENBQUM7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDcEQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzsrR0FuQ1UsaUJBQWlCO21HQUFqQixpQkFBaUIsMlJDVjlCLDJZQU1NOzs0RkRJTyxpQkFBaUI7a0JBTDdCLFNBQVM7K0JBQ0UsY0FBYzt3REFNa0IsU0FBUztzQkFBbEQsU0FBUzt1QkFBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUMvQixPQUFPO3NCQUFmLEtBQUs7Z0JBUU4sTUFBTTtzQkFETCxZQUFZO3VCQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkNoYW5nZXMsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgSW5wdXQsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udGVudFNlcnZpY2UgfSBmcm9tICcuLi9jb250ZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udGVudE1hbmFnZXIgfSBmcm9tICcuLi9jb250ZW50LW1hbmFnZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2h0bC1tZXNzYWdlcycsXG4gIHRlbXBsYXRlVXJsOiAnLi9tZXNzYWdlcy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21lc3NhZ2VzLmNvbXBvbmVudC5sZXNzJ11cbn0pXG5leHBvcnQgY2xhc3MgTWVzc2FnZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cbiAgQFZpZXdDaGlsZCgnY29udGFpbmVyJywgeyBzdGF0aWM6IHRydWUgfSkgY29udGFpbmVyOiBFbGVtZW50UmVmO1xuICBASW5wdXQoKSBjb250ZW50OiBDb250ZW50TWFuYWdlcjtcblxuICB1cGRhdGVkU3ViOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcbiAgcmVzaXplKGUpIHtcbiAgICB0aGlzLnVwZGF0ZVNjcm9sbCgpO1xuICB9XG5cbiAgdXBkYXRlU2Nyb2xsKCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgZWw6IEhUTUxFbGVtZW50ID0gdGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudDtcbiAgICAgIGlmICh0aGlzLmNvbnRlbnQuZGVidWcpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1NDUk9MTElORyBUTyBCT1RUT00nKTtcbiAgICAgIH1cbiAgICAgIGVsLnNjcm9sbFRvKHtsZWZ0OiAwLCB0b3A6IGVsLnNjcm9sbEhlaWdodCwgYmVoYXZpb3I6IHRoaXMuY29udGVudC5mYXN0U2Nyb2xsID8gJ2F1dG8nIDogJ3Ntb290aCcgfSk7XG4gICAgfSwgMCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmICh0aGlzLnVwZGF0ZWRTdWIpIHtcbiAgICAgIHRoaXMudXBkYXRlZFN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZWRTdWIgPSB0aGlzLmNvbnRlbnQudXBkYXRlZC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy51cGRhdGVTY3JvbGwoKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz0nY29udGFpbmVyJyBbY2xhc3MuZmFzdC1zY3JvbGxdPSdjb250ZW50LmZhc3RTY3JvbGwnIFtjbGFzcy5zY3JvbGwtbG9ja109J2NvbnRlbnQuc2Nyb2xsTG9jaycgI2NvbnRhaW5lcj5cbiAgPG5nLWNvbnRhaW5lciAqbmdGb3I9J2xldCBpdGVtIG9mIGNvbnRlbnQubWVzc2FnZXMnPlxuICAgIDxodGwtbWVzc2FnZS1zd2l0Y2ggW2NvbnRlbnRdPSdjb250ZW50JyBbaXRlbV09J2l0ZW0nXG4gICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuZGlzcGxheV09J2NvbnRlbnQudmlzaWJsZVJldmlzaW9uIDwgaXRlbS5yZXZpc2lvbiA/IFwibm9uZVwiIDogXCJibG9ja1wiJz5cbiAgICA+PC9odGwtbWVzc2FnZS1zd2l0Y2g+XG4gIDwvbmctY29udGFpbmVyPlxuPC9kaXY+Il19