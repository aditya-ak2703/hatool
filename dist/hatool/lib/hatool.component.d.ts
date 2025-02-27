import { OnInit } from '@angular/core';
import { ContentService } from './content.service';
import { ContentManager } from './content-manager';
import * as i0 from "@angular/core";
export declare class HatoolLibComponent implements OnInit {
    private contentService;
    content: ContentManager;
    constructor(contentService: ContentService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<HatoolLibComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<HatoolLibComponent, "htl-hatool", never, { "content": { "alias": "content"; "required": false; }; }, {}, never, never, false, never>;
}
