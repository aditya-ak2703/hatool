import { Component, ViewChild, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class MessageUploaderComponent {
    constructor() {
        this.progressInternal = 0;
        this.activeInternal = false;
        this.successInternal = false;
        this.selectedInternal = false;
        this.selectedFile = null;
    }
    ngOnInit() {
    }
    addFiles() {
        this.file.nativeElement.click();
    }
    onFilesAdded() {
        const files = this.file.nativeElement.files;
        for (const key in files) {
            if (!isNaN(parseInt(key, 10))) {
                this.selectedFile = files[key];
                this.selectedInternal = true;
                this.content.reportValue(this);
                break;
            }
        }
    }
    set progress(progress) {
        if (this.selectedInternal && this.activeInternal) {
            this.progressInternal = progress;
        }
    }
    set active(active) {
        if (this.selectedInternal) {
            this.activeInternal = active;
        }
    }
    set success(success) {
        if (this.activeInternal) {
            this.successInternal = success;
            this.activeInternal = false;
            this.progressInternal = 100;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessageUploaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: MessageUploaderComponent, selector: "htl-message-uploader", inputs: { params: "params", content: "content" }, viewQueries: [{ propertyName: "file", first: true, predicate: ["file"], descendants: true, static: true }], ngImport: i0, template: "<input type=\"file\" #file (change)=\"onFilesAdded()\" />\n<div class='button' (click)='addFiles()' \n     [class.selected]='selectedInternal'\n     [class.active]='activeInternal'\n     [class.success]='successInternal'\n     >\n    <div *ngIf='!activeInternal && !selectedInternal' class='message'>{{ content.uploadFileText }}</div>\n    <div *ngIf='activeInternal' class='message'>{{ selectedFile.name }}</div>\n    <div *ngIf='!activeInternal && selectedInternal && successInternal' class='message'>{{ content.uploadedFileText }}</div>\n    <div *ngIf='!activeInternal && selectedInternal && !successInternal' class='message'>{{ content.notUploadedFileText }}</div>\n    <div *ngIf='activeInternal' class='progress'>\n        <div class='bar' [style.left]='(progressInternal-100) + \"%\"'>\n        </div>\n    </div>\n</div>\n", styles: [":host{display:flex;flex-flow:row;justify-content:center;flex:0 0 auto}:host input[type=file]{display:none}:host .button{display:flex;flex-flow:column;justify-content:center;align-items:center}:host .button .message{width:100%;text-align:center}:host .button .progress{height:2px;width:80%;border:none;background-color:#ccc;overflow:hidden}:host .button .progress .bar{position:relative;width:100%;height:100%;background-color:green}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessageUploaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'htl-message-uploader', template: "<input type=\"file\" #file (change)=\"onFilesAdded()\" />\n<div class='button' (click)='addFiles()' \n     [class.selected]='selectedInternal'\n     [class.active]='activeInternal'\n     [class.success]='successInternal'\n     >\n    <div *ngIf='!activeInternal && !selectedInternal' class='message'>{{ content.uploadFileText }}</div>\n    <div *ngIf='activeInternal' class='message'>{{ selectedFile.name }}</div>\n    <div *ngIf='!activeInternal && selectedInternal && successInternal' class='message'>{{ content.uploadedFileText }}</div>\n    <div *ngIf='!activeInternal && selectedInternal && !successInternal' class='message'>{{ content.notUploadedFileText }}</div>\n    <div *ngIf='activeInternal' class='progress'>\n        <div class='bar' [style.left]='(progressInternal-100) + \"%\"'>\n        </div>\n    </div>\n</div>\n", styles: [":host{display:flex;flex-flow:row;justify-content:center;flex:0 0 auto}:host input[type=file]{display:none}:host .button{display:flex;flex-flow:column;justify-content:center;align-items:center}:host .button .message{width:100%;text-align:center}:host .button .progress{height:2px;width:80%;border:none;background-color:#ccc;overflow:hidden}:host .button .progress .bar{position:relative;width:100%;height:100%;background-color:green}\n"] }]
        }], ctorParameters: () => [], propDecorators: { params: [{
                type: Input
            }], content: [{
                type: Input
            }], file: [{
                type: ViewChild,
                args: ['file', { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS11cGxvYWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9oYXRvb2wvc3JjL2xpYi9tZXNzYWdlLXVwbG9hZGVyL21lc3NhZ2UtdXBsb2FkZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaGF0b29sL3NyYy9saWIvbWVzc2FnZS11cGxvYWRlci9tZXNzYWdlLXVwbG9hZGVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsU0FBUyxFQUFjLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBVWhGLE1BQU0sT0FBTyx3QkFBd0I7SUFhbkM7UUFQQSxxQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDckIsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDdkIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBRXpCLGlCQUFZLEdBQVMsSUFBSSxDQUFDO0lBRVYsQ0FBQztJQUVqQixRQUFRO0lBQ1IsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsWUFBWTtRQUNWLE1BQU0sS0FBSyxHQUE0QixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDckUsS0FBSyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztnQkFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQy9CLE1BQU07WUFDUixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCxJQUFJLFFBQVEsQ0FBQyxRQUFRO1FBQ25CLElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDO1FBQ25DLENBQUM7SUFDSCxDQUFDO0lBRUQsSUFBSSxNQUFNLENBQUMsTUFBTTtRQUNmLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUM7UUFDL0IsQ0FBQztJQUNILENBQUM7SUFFRCxJQUFJLE9BQU8sQ0FBQyxPQUFPO1FBQ2pCLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDO1lBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1lBQzVCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHLENBQUM7UUFDOUIsQ0FBQztJQUNILENBQUM7K0dBcERVLHdCQUF3QjttR0FBeEIsd0JBQXdCLDBOQ1ZyQyxpMEJBZUE7OzRGRExhLHdCQUF3QjtrQkFMcEMsU0FBUzsrQkFDRSxzQkFBc0I7d0RBTXZCLE1BQU07c0JBQWQsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQytCLElBQUk7c0JBQXhDLFNBQVM7dUJBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250ZW50U2VydmljZSB9IGZyb20gJy4uL2NvbnRlbnQuc2VydmljZSc7XG5pbXBvcnQgeyBGaWxlVXBsb2FkZXIgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IENvbnRlbnRNYW5hZ2VyIH0gZnJvbSAnLi4vY29udGVudC1tYW5hZ2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaHRsLW1lc3NhZ2UtdXBsb2FkZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vbWVzc2FnZS11cGxvYWRlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21lc3NhZ2UtdXBsb2FkZXIuY29tcG9uZW50Lmxlc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBNZXNzYWdlVXBsb2FkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEZpbGVVcGxvYWRlciB7XG5cbiAgQElucHV0KCkgcGFyYW1zOiBhbnk7XG4gIEBJbnB1dCgpIGNvbnRlbnQ6IENvbnRlbnRNYW5hZ2VyO1xuICBAVmlld0NoaWxkKCdmaWxlJywgeyBzdGF0aWM6IHRydWUgfSkgZmlsZTogRWxlbWVudFJlZjtcblxuICBwcm9ncmVzc0ludGVybmFsID0gMDtcbiAgYWN0aXZlSW50ZXJuYWwgPSBmYWxzZTtcbiAgc3VjY2Vzc0ludGVybmFsID0gZmFsc2U7XG4gIHNlbGVjdGVkSW50ZXJuYWwgPSBmYWxzZTtcblxuICBzZWxlY3RlZEZpbGU6IEZpbGUgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBhZGRGaWxlcygpIHtcbiAgICB0aGlzLmZpbGUubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICB9XG5cbiAgb25GaWxlc0FkZGVkKCkge1xuICAgIGNvbnN0IGZpbGVzOiB7IFtrZXk6IHN0cmluZ106IEZpbGUgfSA9IHRoaXMuZmlsZS5uYXRpdmVFbGVtZW50LmZpbGVzO1xuICAgIGZvciAoY29uc3Qga2V5IGluIGZpbGVzKSB7XG4gICAgICBpZiAoIWlzTmFOKHBhcnNlSW50KGtleSwgMTApKSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkRmlsZSA9IGZpbGVzW2tleV07XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbnRlcm5hbCA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udGVudC5yZXBvcnRWYWx1ZSh0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0IHByb2dyZXNzKHByb2dyZXNzKSB7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRJbnRlcm5hbCAmJiB0aGlzLmFjdGl2ZUludGVybmFsKSB7XG4gICAgICB0aGlzLnByb2dyZXNzSW50ZXJuYWwgPSBwcm9ncmVzcztcbiAgICB9XG4gIH1cblxuICBzZXQgYWN0aXZlKGFjdGl2ZSkge1xuICAgIGlmICh0aGlzLnNlbGVjdGVkSW50ZXJuYWwpIHtcbiAgICAgIHRoaXMuYWN0aXZlSW50ZXJuYWwgPSBhY3RpdmU7XG4gICAgfVxuICB9XG5cbiAgc2V0IHN1Y2Nlc3Moc3VjY2Vzcykge1xuICAgIGlmICh0aGlzLmFjdGl2ZUludGVybmFsKSB7XG4gICAgICB0aGlzLnN1Y2Nlc3NJbnRlcm5hbCA9IHN1Y2Nlc3M7XG4gICAgICB0aGlzLmFjdGl2ZUludGVybmFsID0gZmFsc2U7XG4gICAgICB0aGlzLnByb2dyZXNzSW50ZXJuYWwgPSAxMDA7XG4gICAgfVxuICB9XG59XG4iLCI8aW5wdXQgdHlwZT1cImZpbGVcIiAjZmlsZSAoY2hhbmdlKT1cIm9uRmlsZXNBZGRlZCgpXCIgLz5cbjxkaXYgY2xhc3M9J2J1dHRvbicgKGNsaWNrKT0nYWRkRmlsZXMoKScgXG4gICAgIFtjbGFzcy5zZWxlY3RlZF09J3NlbGVjdGVkSW50ZXJuYWwnXG4gICAgIFtjbGFzcy5hY3RpdmVdPSdhY3RpdmVJbnRlcm5hbCdcbiAgICAgW2NsYXNzLnN1Y2Nlc3NdPSdzdWNjZXNzSW50ZXJuYWwnXG4gICAgID5cbiAgICA8ZGl2ICpuZ0lmPSchYWN0aXZlSW50ZXJuYWwgJiYgIXNlbGVjdGVkSW50ZXJuYWwnIGNsYXNzPSdtZXNzYWdlJz57eyBjb250ZW50LnVwbG9hZEZpbGVUZXh0IH19PC9kaXY+XG4gICAgPGRpdiAqbmdJZj0nYWN0aXZlSW50ZXJuYWwnIGNsYXNzPSdtZXNzYWdlJz57eyBzZWxlY3RlZEZpbGUubmFtZSB9fTwvZGl2PlxuICAgIDxkaXYgKm5nSWY9JyFhY3RpdmVJbnRlcm5hbCAmJiBzZWxlY3RlZEludGVybmFsICYmIHN1Y2Nlc3NJbnRlcm5hbCcgY2xhc3M9J21lc3NhZ2UnPnt7IGNvbnRlbnQudXBsb2FkZWRGaWxlVGV4dCB9fTwvZGl2PlxuICAgIDxkaXYgKm5nSWY9JyFhY3RpdmVJbnRlcm5hbCAmJiBzZWxlY3RlZEludGVybmFsICYmICFzdWNjZXNzSW50ZXJuYWwnIGNsYXNzPSdtZXNzYWdlJz57eyBjb250ZW50Lm5vdFVwbG9hZGVkRmlsZVRleHQgfX08L2Rpdj5cbiAgICA8ZGl2ICpuZ0lmPSdhY3RpdmVJbnRlcm5hbCcgY2xhc3M9J3Byb2dyZXNzJz5cbiAgICAgICAgPGRpdiBjbGFzcz0nYmFyJyBbc3R5bGUubGVmdF09Jyhwcm9ncmVzc0ludGVybmFsLTEwMCkgKyBcIiVcIic+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG4iXX0=