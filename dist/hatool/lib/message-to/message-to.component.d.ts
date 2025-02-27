import { OnInit } from '@angular/core';
import { ContentManager } from '../content-manager';
import * as i0 from "@angular/core";
export declare class MessageToComponent implements OnInit {
    params: any;
    first: boolean;
    content: ContentManager;
    constructor();
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MessageToComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MessageToComponent, "htl-message-to", never, { "params": { "alias": "params"; "required": false; }; "first": { "alias": "first"; "required": false; }; "content": { "alias": "content"; "required": false; }; }, {}, never, never, false, never>;
}
