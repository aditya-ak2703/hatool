import { NgModule } from '@angular/core';
import { HatoolLibComponent } from './hatool.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { MessagesComponent } from './messages/messages.component';
import { InputComponent } from './input/input.component';
import { MessageFromComponent } from './message-from/message-from.component';
import { MessageToComponent } from './message-to/message-to.component';
import { MessageTypingComponent } from './message-typing/message-typing.component';
import { MessageOptionsComponent } from './message-options/message-options.component';
import { MessageUploaderComponent } from './message-uploader/message-uploader.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageMultiOptionsComponent } from './message-multi-options/message-multi-options.component';
import { MessageCustomComponentComponent } from './message-custom-component/message-custom-component.component';
import { MessageCustomComponentAuxDirective } from './message-custom-component-aux.directive';
import { MessageSwitchComponent } from './message-switch/message-switch.component';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
export class HatoolLibModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: HatoolLibModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.12", ngImport: i0, type: HatoolLibModule, declarations: [HatoolLibComponent,
            ChatboxComponent,
            MessagesComponent,
            InputComponent,
            MessageFromComponent,
            MessageToComponent,
            MessageTypingComponent,
            MessageOptionsComponent,
            MessageUploaderComponent,
            MessageMultiOptionsComponent,
            MessageCustomComponentComponent,
            MessageCustomComponentAuxDirective,
            MessageSwitchComponent], imports: [CommonModule,
            HttpClientModule], exports: [HatoolLibComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: HatoolLibModule, imports: [CommonModule,
            HttpClientModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: HatoolLibModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        HatoolLibComponent,
                        ChatboxComponent,
                        MessagesComponent,
                        InputComponent,
                        MessageFromComponent,
                        MessageToComponent,
                        MessageTypingComponent,
                        MessageOptionsComponent,
                        MessageUploaderComponent,
                        MessageMultiOptionsComponent,
                        MessageCustomComponentComponent,
                        MessageCustomComponentAuxDirective,
                        MessageSwitchComponent,
                    ],
                    imports: [
                        CommonModule,
                        HttpClientModule
                    ],
                    exports: [HatoolLibComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGF0b29sLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2hhdG9vbC9zcmMvbGliL2hhdG9vbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDbkYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDdEYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDekYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDdkcsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDaEgsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDOUYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDbkYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQXdCL0MsTUFBTSxPQUFPLGVBQWU7K0dBQWYsZUFBZTtnSEFBZixlQUFlLGlCQXBCeEIsa0JBQWtCO1lBQ2xCLGdCQUFnQjtZQUNoQixpQkFBaUI7WUFDakIsY0FBYztZQUNkLG9CQUFvQjtZQUNwQixrQkFBa0I7WUFDbEIsc0JBQXNCO1lBQ3RCLHVCQUF1QjtZQUN2Qix3QkFBd0I7WUFDeEIsNEJBQTRCO1lBQzVCLCtCQUErQjtZQUMvQixrQ0FBa0M7WUFDbEMsc0JBQXNCLGFBR3RCLFlBQVk7WUFDWixnQkFBZ0IsYUFFUixrQkFBa0I7Z0hBRWpCLGVBQWUsWUFMeEIsWUFBWTtZQUNaLGdCQUFnQjs7NEZBSVAsZUFBZTtrQkF0QjNCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLGtCQUFrQjt3QkFDbEIsZ0JBQWdCO3dCQUNoQixpQkFBaUI7d0JBQ2pCLGNBQWM7d0JBQ2Qsb0JBQW9CO3dCQUNwQixrQkFBa0I7d0JBQ2xCLHNCQUFzQjt3QkFDdEIsdUJBQXVCO3dCQUN2Qix3QkFBd0I7d0JBQ3hCLDRCQUE0Qjt3QkFDNUIsK0JBQStCO3dCQUMvQixrQ0FBa0M7d0JBQ2xDLHNCQUFzQjtxQkFDdkI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osZ0JBQWdCO3FCQUNqQjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztpQkFDOUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSGF0b29sTGliQ29tcG9uZW50IH0gZnJvbSAnLi9oYXRvb2wuY29tcG9uZW50JztcbmltcG9ydCB7IENoYXRib3hDb21wb25lbnQgfSBmcm9tICcuL2NoYXRib3gvY2hhdGJveC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVzc2FnZXNDb21wb25lbnQgfSBmcm9tICcuL21lc3NhZ2VzL21lc3NhZ2VzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbnB1dENvbXBvbmVudCB9IGZyb20gJy4vaW5wdXQvaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCB7IE1lc3NhZ2VGcm9tQ29tcG9uZW50IH0gZnJvbSAnLi9tZXNzYWdlLWZyb20vbWVzc2FnZS1mcm9tLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZXNzYWdlVG9Db21wb25lbnQgfSBmcm9tICcuL21lc3NhZ2UtdG8vbWVzc2FnZS10by5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVzc2FnZVR5cGluZ0NvbXBvbmVudCB9IGZyb20gJy4vbWVzc2FnZS10eXBpbmcvbWVzc2FnZS10eXBpbmcuY29tcG9uZW50JztcbmltcG9ydCB7IE1lc3NhZ2VPcHRpb25zQ29tcG9uZW50IH0gZnJvbSAnLi9tZXNzYWdlLW9wdGlvbnMvbWVzc2FnZS1vcHRpb25zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZXNzYWdlVXBsb2FkZXJDb21wb25lbnQgfSBmcm9tICcuL21lc3NhZ2UtdXBsb2FkZXIvbWVzc2FnZS11cGxvYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE1lc3NhZ2VNdWx0aU9wdGlvbnNDb21wb25lbnQgfSBmcm9tICcuL21lc3NhZ2UtbXVsdGktb3B0aW9ucy9tZXNzYWdlLW11bHRpLW9wdGlvbnMuY29tcG9uZW50JztcbmltcG9ydCB7IE1lc3NhZ2VDdXN0b21Db21wb25lbnRDb21wb25lbnQgfSBmcm9tICcuL21lc3NhZ2UtY3VzdG9tLWNvbXBvbmVudC9tZXNzYWdlLWN1c3RvbS1jb21wb25lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IE1lc3NhZ2VDdXN0b21Db21wb25lbnRBdXhEaXJlY3RpdmUgfSBmcm9tICcuL21lc3NhZ2UtY3VzdG9tLWNvbXBvbmVudC1hdXguZGlyZWN0aXZlJztcbmltcG9ydCB7IE1lc3NhZ2VTd2l0Y2hDb21wb25lbnQgfSBmcm9tICcuL21lc3NhZ2Utc3dpdGNoL21lc3NhZ2Utc3dpdGNoLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBIYXRvb2xMaWJDb21wb25lbnQsXG4gICAgQ2hhdGJveENvbXBvbmVudCxcbiAgICBNZXNzYWdlc0NvbXBvbmVudCxcbiAgICBJbnB1dENvbXBvbmVudCxcbiAgICBNZXNzYWdlRnJvbUNvbXBvbmVudCxcbiAgICBNZXNzYWdlVG9Db21wb25lbnQsXG4gICAgTWVzc2FnZVR5cGluZ0NvbXBvbmVudCxcbiAgICBNZXNzYWdlT3B0aW9uc0NvbXBvbmVudCxcbiAgICBNZXNzYWdlVXBsb2FkZXJDb21wb25lbnQsXG4gICAgTWVzc2FnZU11bHRpT3B0aW9uc0NvbXBvbmVudCxcbiAgICBNZXNzYWdlQ3VzdG9tQ29tcG9uZW50Q29tcG9uZW50LFxuICAgIE1lc3NhZ2VDdXN0b21Db21wb25lbnRBdXhEaXJlY3RpdmUsXG4gICAgTWVzc2FnZVN3aXRjaENvbXBvbmVudCxcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtIYXRvb2xMaWJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEhhdG9vbExpYk1vZHVsZSB7IH1cbiJdfQ==