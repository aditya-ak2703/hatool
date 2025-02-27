import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { ScriptRunnerImpl } from './script-runner-impl';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./content.service";
export class ScriptRunnerService {
    constructor(http, content, locale) {
        this.http = http;
        this.content = content;
        this.locale = locale;
        this.R = new ScriptRunnerImpl(http, content.M, this.locale);
    }
    run(url, index, context, setCallback, record, eventCallback) {
        return this.R.run(url, index, context, setCallback, record, eventCallback);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ScriptRunnerService, deps: [{ token: i1.HttpClient }, { token: i2.ContentService }, { token: LOCALE_ID }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ScriptRunnerService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ScriptRunnerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }, { type: i2.ContentService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [LOCALE_ID]
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LXJ1bm5lci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvaGF0b29sL3NyYy9saWIvc2NyaXB0LXJ1bm5lci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUs5RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7OztBQU14RCxNQUFNLE9BQU8sbUJBQW1CO0lBSTlCLFlBQW9CLElBQWdCLEVBQ2hCLE9BQXVCLEVBQ0osTUFBTTtRQUZ6QixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBQ0osV0FBTSxHQUFOLE1BQU0sQ0FBQTtRQUMzQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksZ0JBQWdCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFTSxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsV0FBb0IsRUFBRSxNQUFZLEVBQ3ZELGFBQTJCO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQ2YsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFDeEMsYUFBYSxDQUNkLENBQUM7SUFDSixDQUFDOytHQWhCVSxtQkFBbUIsMEVBTVYsU0FBUzttSEFObEIsbUJBQW1CLGNBRmxCLE1BQU07OzRGQUVQLG1CQUFtQjtrQkFIL0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQU9jLE1BQU07MkJBQUMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIExPQ0FMRV9JRCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgQ29udGVudFNlcnZpY2UgfSBmcm9tICcuL2NvbnRlbnQuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDQlR5cGUsIEV2ZW50Q0JUeXBlIH0gZnJvbSAnLi9zY3JpcHQtcnVubmVyLXR5cGVzJztcbmltcG9ydCB7IFNjcmlwdFJ1bm5lckltcGwgfSBmcm9tICcuL3NjcmlwdC1ydW5uZXItaW1wbCc7XG5pbXBvcnQgeyBTY3JpcHRSdW5uZXIgfSBmcm9tICcuL3NjcmlwdC1ydW5uZXInO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTY3JpcHRSdW5uZXJTZXJ2aWNlIGltcGxlbWVudHMgU2NyaXB0UnVubmVyIHtcblxuICBSOiBTY3JpcHRSdW5uZXI7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICAgICAgICBwcml2YXRlIGNvbnRlbnQ6IENvbnRlbnRTZXJ2aWNlLFxuICAgICAgICAgICAgICBASW5qZWN0KExPQ0FMRV9JRCkgcHJpdmF0ZSBsb2NhbGUpIHtcbiAgICB0aGlzLlIgPSBuZXcgU2NyaXB0UnVubmVySW1wbChodHRwLCBjb250ZW50Lk0sIHRoaXMubG9jYWxlKTtcbiAgfVxuXG4gIHB1YmxpYyBydW4odXJsLCBpbmRleCwgY29udGV4dCwgc2V0Q2FsbGJhY2s/OiBDQlR5cGUsIHJlY29yZD86IGFueSxcbiAgICAgICAgICAgICBldmVudENhbGxiYWNrPzogRXZlbnRDQlR5cGUpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5SLnJ1bihcbiAgICAgIHVybCwgaW5kZXgsIGNvbnRleHQsIHNldENhbGxiYWNrLCByZWNvcmQsXG4gICAgICBldmVudENhbGxiYWNrXG4gICAgKTtcbiAgfVxufVxuIl19