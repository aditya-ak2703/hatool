import { ComponentFactoryResolver, OnInit } from '@angular/core';
import { ContentManager } from '../content-manager';
import { MessageCustomComponentAuxDirective } from '../message-custom-component-aux.directive';
import * as i0 from "@angular/core";
export declare class MessageCustomComponentComponent implements OnInit {
    private componentFactoryResolver;
    content: ContentManager;
    params: any;
    inner: MessageCustomComponentAuxDirective;
    constructor(componentFactoryResolver: ComponentFactoryResolver);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MessageCustomComponentComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MessageCustomComponentComponent, "htl-message-custom-component", never, { "content": { "alias": "content"; "required": false; }; "params": { "alias": "params"; "required": false; }; }, {}, never, never, false, never>;
}
