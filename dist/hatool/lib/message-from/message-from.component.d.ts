import { OnInit } from '@angular/core';
import { ContentManager } from '../content-manager';
import * as i0 from "@angular/core";
export declare class MessageFromComponent implements OnInit {
    params: any;
    first: boolean;
    content: ContentManager;
    constructor();
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MessageFromComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MessageFromComponent, "htl-message-from", never, { "params": { "alias": "params"; "required": false; }; "first": { "alias": "first"; "required": false; }; "content": { "alias": "content"; "required": false; }; }, {}, never, never, false, never>;
}
