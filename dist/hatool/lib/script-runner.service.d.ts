import { HttpClient } from '@angular/common/http';
import { ContentService } from './content.service';
import { Observable } from 'rxjs';
import { CBType, EventCBType } from './script-runner-types';
import { ScriptRunner } from './script-runner';
import * as i0 from "@angular/core";
export declare class ScriptRunnerService implements ScriptRunner {
    private http;
    private content;
    private locale;
    R: ScriptRunner;
    constructor(http: HttpClient, content: ContentService, locale: any);
    run(url: any, index: any, context: any, setCallback?: CBType, record?: any, eventCallback?: EventCBType): Observable<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScriptRunnerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ScriptRunnerService>;
}
