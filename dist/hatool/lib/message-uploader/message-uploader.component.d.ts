import { OnInit, ElementRef } from '@angular/core';
import { FileUploader } from '../interfaces';
import { ContentManager } from '../content-manager';
import * as i0 from "@angular/core";
export declare class MessageUploaderComponent implements OnInit, FileUploader {
    params: any;
    content: ContentManager;
    file: ElementRef;
    progressInternal: number;
    activeInternal: boolean;
    successInternal: boolean;
    selectedInternal: boolean;
    selectedFile: File;
    constructor();
    ngOnInit(): void;
    addFiles(): void;
    onFilesAdded(): void;
    set progress(progress: any);
    set active(active: any);
    set success(success: any);
    static ɵfac: i0.ɵɵFactoryDeclaration<MessageUploaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MessageUploaderComponent, "htl-message-uploader", never, { "params": { "alias": "params"; "required": false; }; "content": { "alias": "content"; "required": false; }; }, {}, never, never, false, never>;
}
