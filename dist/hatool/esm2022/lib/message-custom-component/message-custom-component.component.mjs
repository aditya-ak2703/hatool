import { Component, Input, ViewChild } from '@angular/core';
import { MessageCustomComponentAuxDirective } from '../message-custom-component-aux.directive';
import * as i0 from "@angular/core";
import * as i1 from "../message-custom-component-aux.directive";
export class MessageCustomComponentComponent {
    constructor(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
    }
    ngOnInit() {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.params.step.__component.cls);
        const viewContainerRef = this.inner.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.content = this.content;
        componentRef.instance.params = this.params.step;
        this.params.step.__instance = componentRef.instance;
        this.params.componentCreatedCallback();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessageCustomComponentComponent, deps: [{ token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: MessageCustomComponentComponent, selector: "htl-message-custom-component", inputs: { content: "content", params: "params" }, viewQueries: [{ propertyName: "inner", first: true, predicate: MessageCustomComponentAuxDirective, descendants: true, static: true }], ngImport: i0, template: "<ng-template htlMessageCustomComponentAux></ng-template>", styles: [""], dependencies: [{ kind: "directive", type: i1.MessageCustomComponentAuxDirective, selector: "[htlMessageCustomComponentAux]" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessageCustomComponentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'htl-message-custom-component', template: "<ng-template htlMessageCustomComponentAux></ng-template>" }]
        }], ctorParameters: () => [{ type: i0.ComponentFactoryResolver }], propDecorators: { content: [{
                type: Input
            }], params: [{
                type: Input
            }], inner: [{
                type: ViewChild,
                args: [MessageCustomComponentAuxDirective, { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1jdXN0b20tY29tcG9uZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2hhdG9vbC9zcmMvbGliL21lc3NhZ2UtY3VzdG9tLWNvbXBvbmVudC9tZXNzYWdlLWN1c3RvbS1jb21wb25lbnQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaGF0b29sL3NyYy9saWIvbWVzc2FnZS1jdXN0b20tY29tcG9uZW50L21lc3NhZ2UtY3VzdG9tLWNvbXBvbmVudC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUE0QixLQUFLLEVBQVUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTlGLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLDJDQUEyQyxDQUFDOzs7QUFPL0YsTUFBTSxPQUFPLCtCQUErQjtJQU8xQyxZQUFvQix3QkFBa0Q7UUFBbEQsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtJQUFJLENBQUM7SUFFM0UsUUFBUTtRQUNOLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVqSCxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7UUFDckQsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFekIsTUFBTSxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsZUFBZSxDQUFNLGdCQUFnQixDQUFDLENBQUM7UUFDN0UsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztRQUNwRCxJQUFJLENBQUMsTUFBTSxDQUFDLHdCQUF3QixFQUFFLENBQUM7SUFDekMsQ0FBQzsrR0FwQlUsK0JBQStCO21HQUEvQiwrQkFBK0IsNkpBSy9CLGtDQUFrQyw4RENkL0MsMERBQXdEOzs0RkRTM0MsK0JBQStCO2tCQUwzQyxTQUFTOytCQUNFLDhCQUE4Qjs2RkFNL0IsT0FBTztzQkFBZixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFFMkQsS0FBSztzQkFBckUsU0FBUzt1QkFBQyxrQ0FBa0MsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250ZW50TWFuYWdlciB9IGZyb20gJy4uL2NvbnRlbnQtbWFuYWdlcic7XG5pbXBvcnQgeyBNZXNzYWdlQ3VzdG9tQ29tcG9uZW50QXV4RGlyZWN0aXZlIH0gZnJvbSAnLi4vbWVzc2FnZS1jdXN0b20tY29tcG9uZW50LWF1eC5kaXJlY3RpdmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdodGwtbWVzc2FnZS1jdXN0b20tY29tcG9uZW50JyxcbiAgdGVtcGxhdGVVcmw6ICcuL21lc3NhZ2UtY3VzdG9tLWNvbXBvbmVudC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21lc3NhZ2UtY3VzdG9tLWNvbXBvbmVudC5jb21wb25lbnQubGVzcyddXG59KVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VDdXN0b21Db21wb25lbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGNvbnRlbnQ6IENvbnRlbnRNYW5hZ2VyO1xuICBASW5wdXQoKSBwYXJhbXM6IGFueTtcblxuICBAVmlld0NoaWxkKE1lc3NhZ2VDdXN0b21Db21wb25lbnRBdXhEaXJlY3RpdmUsIHsgc3RhdGljOiB0cnVlIH0pIGlubmVyOiBNZXNzYWdlQ3VzdG9tQ29tcG9uZW50QXV4RGlyZWN0aXZlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLnBhcmFtcy5zdGVwLl9fY29tcG9uZW50LmNscyk7XG5cbiAgICBjb25zdCB2aWV3Q29udGFpbmVyUmVmID0gdGhpcy5pbm5lci52aWV3Q29udGFpbmVyUmVmO1xuICAgIHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcblxuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50PGFueT4oY29tcG9uZW50RmFjdG9yeSk7XG4gICAgY29tcG9uZW50UmVmLmluc3RhbmNlLmNvbnRlbnQgPSB0aGlzLmNvbnRlbnQ7XG4gICAgY29tcG9uZW50UmVmLmluc3RhbmNlLnBhcmFtcyA9IHRoaXMucGFyYW1zLnN0ZXA7XG4gICAgdGhpcy5wYXJhbXMuc3RlcC5fX2luc3RhbmNlID0gY29tcG9uZW50UmVmLmluc3RhbmNlO1xuICAgIHRoaXMucGFyYW1zLmNvbXBvbmVudENyZWF0ZWRDYWxsYmFjaygpO1xuICB9XG5cbn1cbiIsIjxuZy10ZW1wbGF0ZSBodGxNZXNzYWdlQ3VzdG9tQ29tcG9uZW50QXV4PjwvbmctdGVtcGxhdGU+Il19