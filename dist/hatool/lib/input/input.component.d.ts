import { OnInit, ElementRef, OnChanges } from '@angular/core';
import { ContentManager } from '../content-manager';
import * as i0 from "@angular/core";
export declare class InputComponent implements OnInit, OnChanges {
    content: ContentManager;
    inputEnabled: boolean;
    textArea: boolean;
    inputKind: string;
    inputMin: any;
    inputMax: any;
    inputStep: any;
    placeholder: string;
    inputRequired: boolean;
    suggestions: string[];
    validator: (arg: any) => boolean;
    input: ElementRef;
    visibleSuggestions: string[][];
    comparer: (x: string, y: string) => number;
    value: any;
    valid: boolean;
    constructor();
    ngOnInit(): void;
    ngOnChanges(): void;
    onSubmit(): void;
    updateSuggestions(value: any): void;
    selectSuggestion(value: any, event?: any): void;
    validate(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<InputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<InputComponent, "htl-input", never, { "content": { "alias": "content"; "required": false; }; "inputEnabled": { "alias": "inputEnabled"; "required": false; }; "textArea": { "alias": "textArea"; "required": false; }; "inputKind": { "alias": "inputKind"; "required": false; }; "inputMin": { "alias": "inputMin"; "required": false; }; "inputMax": { "alias": "inputMax"; "required": false; }; "inputStep": { "alias": "inputStep"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "inputRequired": { "alias": "inputRequired"; "required": false; }; "suggestions": { "alias": "suggestions"; "required": false; }; "validator": { "alias": "validator"; "required": false; }; }, {}, never, never, false, never>;
}
