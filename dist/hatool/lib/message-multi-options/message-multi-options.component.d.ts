import { OnInit, AfterViewInit } from '@angular/core';
import { ContentManager } from '../content-manager';
import * as i0 from "@angular/core";
export declare class MessageMultiOptionsComponent implements OnInit, AfterViewInit {
    params: any;
    content: ContentManager;
    active: boolean;
    enabled: boolean;
    selected: boolean;
    checked: boolean;
    value: any;
    constructor();
    ngOnInit(): void;
    get multi(): boolean;
    ngAfterViewInit(): void;
    toggle(field: any): void;
    onSubmit(): void;
    checkChecked(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MessageMultiOptionsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MessageMultiOptionsComponent, "htl-message-multi-options", never, { "params": { "alias": "params"; "required": false; }; "content": { "alias": "content"; "required": false; }; }, {}, never, never, false, never>;
}
