import { OnInit, OnChanges, ElementRef } from '@angular/core';
import { ContentManager } from '../content-manager';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class MessagesComponent implements OnInit, OnChanges {
    container: ElementRef;
    content: ContentManager;
    updatedSub: Subscription;
    constructor();
    resize(e: any): void;
    updateScroll(): void;
    ngOnInit(): void;
    ngOnChanges(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MessagesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MessagesComponent, "htl-messages", never, { "content": { "alias": "content"; "required": false; }; }, {}, never, never, false, never>;
}
