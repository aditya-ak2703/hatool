import { OnInit } from '@angular/core';
import { ContentManager } from '../content-manager';
import * as i0 from "@angular/core";
export declare class MessageSwitchComponent implements OnInit {
    content: ContentManager;
    item: any;
    constructor();
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MessageSwitchComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MessageSwitchComponent, "htl-message-switch", never, { "content": { "alias": "content"; "required": false; }; "item": { "alias": "item"; "required": false; }; }, {}, never, never, false, never>;
}
