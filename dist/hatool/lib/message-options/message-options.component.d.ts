import { OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { ContentManager } from '../content-manager';
import * as i0 from "@angular/core";
export declare class MessageOptionsComponent implements OnInit, AfterViewInit {
    private el;
    params: any;
    content: ContentManager;
    active: boolean;
    enabled: boolean;
    selected: any;
    isSelected: boolean;
    echoSelected: boolean;
    private selectedJson;
    constructor(el: ElementRef);
    ngOnInit(): void;
    get multi(): boolean;
    equalsSelected(value: any): boolean;
    ngAfterViewInit(): void;
    onSubmit(selected: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MessageOptionsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MessageOptionsComponent, "htl-message-options", never, { "params": { "alias": "params"; "required": false; }; "content": { "alias": "content"; "required": false; }; }, {}, never, never, false, never>;
}
