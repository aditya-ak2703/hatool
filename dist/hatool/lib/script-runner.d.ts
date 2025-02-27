import { CBType, EventCBType } from './script-runner-types';
import { Observable } from 'rxjs';
export interface ScriptRunner {
    run(url: any, index: any, context: any, setCallback?: CBType, record?: any, eventCallback?: EventCBType): Observable<any>;
}
