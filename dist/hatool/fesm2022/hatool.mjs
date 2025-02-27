import * as i0 from '@angular/core';
import { Injectable, LOCALE_ID, Inject, Input, Component, ViewChild, Directive, HostListener, NgModule } from '@angular/core';
import { Subject, of, defer, from } from 'rxjs';
import { first, tap, switchMap } from 'rxjs/operators';
import * as i1 from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import * as i1$1 from '@angular/common';
import { CommonModule } from '@angular/common';

class ContentManager {
    constructor() {
        this.messages = [];
        this.revision = 0;
        this.visibleRevision = 0;
        this.inputs = new Subject();
        this.updated = new Subject();
        this.inputEnabled = false;
        this.textArea = false;
        this.inputKind = 'text';
        this.placeholder = '';
        this.validator = null;
        this.fastScroll = false;
        this.scrollLock = false;
        this.fixme = null;
        this.debug = false;
        this.sendButtonText = 'Send';
        this.inputPlaceholder = 'Type something...';
        this.uploadFileText = 'Upload File...';
        this.uploadedFileText = 'Uploaded Successfully';
        this.notUploadedFileText = 'Failed to upload file';
        this.fixmeMessage = 'Fix';
        this.timeout = 1000;
        this.toQueue = [];
    }
    clear() {
        this.messages = [];
        this.toQueue = [];
    }
    reportValue(value) {
        this.inputs.next(value);
    }
    reportUpdated(value) {
        if (this.debug) {
            console.log('CONTENT UPDATED', this.timeout);
        }
        if (this.timeout) {
            window.setTimeout(() => {
                this.updated.next(value);
            }, this.timeout);
        }
    }
    add(kind, params) {
        const first = (this.messages.length === 0 ||
            kind !== this.messages[this.messages.length - 1].kind);
        const revision = this.revision;
        this.messages.push({ kind, params, first, revision });
    }
    queue(kind, params) {
        this.toQueue.push({ kind, params });
        if (this.toQueue.length === 1) {
            this.typing();
        }
    }
    queueFunction(callable) {
        return new Promise((resolve) => {
            this.queue('function', { callable, resolve });
        });
    }
    typing() {
        if (this.debug) {
            console.log('TYPING, queue len=' + this.toQueue.length);
        }
        if (this.toQueue.length > 0) {
            const item = this.toQueue[0];
            if (this.debug) {
                console.log('item=', item);
            }
            if (item.kind === 'function') {
                if (this.debug) {
                    console.log('RUNNING FUNCTION', item);
                }
                this.toQueue.shift();
                const future = item.params.callable();
                future.then((result) => {
                    if (this.debug) {
                        console.log('FUNCTION RESOLVED to', result, item);
                    }
                    item.params.resolve(result);
                    this.typing();
                });
            }
            else {
                this.add('typing', null);
                const callback = () => {
                    this.toQueue.shift();
                    if (this.debug) {
                        console.log('handling item=', item);
                    }
                    this.replace(item.kind, item.params);
                    this.typing();
                };
                let timeout = this.timeout;
                if (this.toQueue.length > 0) {
                    let stepTimeout = this.toQueue[0].params.timeout;
                    if (stepTimeout || stepTimeout === 0) {
                        timeout = stepTimeout;
                    }
                }
                if (timeout === 0) {
                    callback();
                }
                else {
                    window.setTimeout(() => {
                        callback();
                        this.reportUpdated(item);
                    }, timeout);
                }
            }
        }
        else {
            window.setTimeout(async () => {
                this.reportUpdated(null);
            }, this.timeout);
        }
    }
    replace(kind, params) {
        const first = (this.messages.length < 2 || kind !== this.messages[this.messages.length - 2].kind);
        this.messages[this.messages.length - 1] = { kind, params, first };
    }
    addFrom(message) {
        this.add('from', { message, fixme: this.fixme, fixmeMessage: this.fixmeMessage });
    }
    reportInput(value) {
        this.reportValue(value);
        this.reportUpdated(value);
        this.textArea = false;
        this.placeholder = '';
        this.validator = null;
    }
    queueFrom(message, timeout) {
        this.queue('from', { message, fixme: this.fixme, fixmeMessage: this.fixmeMessage, timeout });
    }
    addTo(message, timeout) {
        this.queue('to', { message, timeout });
    }
    addOptions(message, options, selected, multi) {
        if (message) {
            this.queue('to', { message });
        }
        this.queue('options', { options, selected, multi, fixme: this.fixme, fixmeMessage: this.fixmeMessage });
    }
    addUploader(message, options) {
        if (message) {
            this.queue('to', { message });
        }
        this.queue('uploader', options);
    }
    addCustomComponent(step, wait, timeout) {
        return new Promise((componentCreatedCallback) => {
            this.queue('component', {
                step,
                timeout,
                componentCreatedCallback: () => {
                    if (this.debug) {
                        console.log('CUSTOM COMPONENT CREATED', step);
                    }
                    return componentCreatedCallback();
                }
            });
        }).then(() => {
            if (wait) {
                return this.queueFunction(() => {
                    return step.__instance.wait();
                });
            }
            else {
                return;
            }
        });
    }
    setTextArea() {
        this.textArea = true;
    }
    setInputKind(kind, required, min, max, step) {
        this.inputKind = kind || 'text';
        this.inputRequired = !!required,
            this.inputMin = min === undefined ? null : min;
        this.inputMax = max === undefined ? null : max;
        this.inputStep = step === undefined ? null : step;
    }
    setInputSuggestions(suggestions) {
        this.inputSuggestions = suggestions;
    }
    setPlaceholder(placeholder) {
        this.placeholder = placeholder;
    }
    setValidator(validator) {
        this.validator = validator;
    }
    setFixme(fixme) {
        this.fixme = fixme;
    }
    setFastScroll(value) {
        this.fastScroll = value;
    }
    setScrollLock(value) {
        if (this.scrollLock !== value) {
            this.scrollLock = value;
            if (value) {
                this.revision += 1;
            }
            else {
                this.visibleRevision = this.revision;
                if (this.debug) {
                    console.log('SETTING VISIBLE REVISION', this.visibleRevision, 'LAST MESSAGE', this.messages[this.messages.length - 1]);
                }
            }
        }
    }
    async waitForInput(enableTextInput) {
        enableTextInput = (enableTextInput !== false);
        let activeElement = null;
        if (enableTextInput) {
            await this.queueFunction(async () => {
                if (this.debug) {
                    console.log('ENABLING INPUT');
                }
                activeElement = document.activeElement;
                this.inputEnabled = true;
            });
        }
        return this.inputs.pipe(first(), tap((value) => {
            if (this.debug) {
                console.log('DISABLING INPUT, value=', value);
            }
            this.inputEnabled = false;
            console.log('FOCUSING', activeElement);
            activeElement?.focus();
        })).toPromise();
    }
    setQueueTimeout(timeout) {
        let report = false;
        if (this.timeout === 0 && timeout !== 0) {
            report = true;
        }
        this.timeout = timeout;
        if (report) {
            this.reportUpdated(null);
        }
    }
}

class ContentService {
    constructor() {
        this.M = new ContentManager();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ContentService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ContentService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ContentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class ScriptRunnerImpl {
    constructor(http, content, locale, customComponents = null) {
        this.http = http;
        this.content = content;
        this.locale = locale;
        this.customComponents = customComponents;
        this.record = {};
        this.context = {};
        this.snippets = {};
        this.runFastInternal = false;
        this.lastMessage = '';
        this.debug = false;
        this.fixme = null;
        // return from call and continue
        this.RETURN = 0;
        // script has completed
        this.COMPLETE = -1;
        // script requested to break and save state
        this.BREAK = -2;
        this.state = {};
        this.TIMEOUT = 1000;
        console.log('Running with locale', this.locale);
    }
    set timeout(value) {
        this.TIMEOUT = value;
    }
    set runFast(value) {
        this.runFastInternal = value;
        this.content.setScrollLock(value);
        window.setTimeout(() => {
            this.content.setFastScroll(value);
            if (!value) {
                this.content.queueFunction(async () => {
                    this.content.reportUpdated(null);
                });
            }
        }, 0);
    }
    get runFast() {
        return this.runFastInternal;
    }
    registerCustomComponents(customComponents) {
        this.customComponents = customComponents;
    }
    i18n(obj) {
        if (obj && obj['.tx']) {
            if (this.locale && obj['.tx'][this.locale]) {
                return obj['.tx'][this.locale];
            }
            else {
                return obj['.tx']._;
            }
        }
        return obj;
    }
    get(obj, field) {
        const parts = field.split('.');
        for (const part of parts) {
            obj = obj[part] || {};
        }
        if (obj.constructor !== Object || Object.entries(obj).length > 0) {
            return obj;
        }
        return null;
    }
    getDefault(f) {
        const ret = this.get(this.record, f);
        if (ret) {
            return ret + '';
        }
        else {
            return f;
        }
    }
    fillIn(message) {
        return message.trim().replace(RegExp('(\\{\\{((\\p{L}|\\p{N}|_|\\.)+)\\}\\})', 'gum'), (match, p1, p2) => {
            return this.getDefault(p2);
        });
    }
    run(urlOrScript, index, context, setCallback, record) {
        this.context = context;
        this.setCallback = setCallback || ((k, v) => null);
        this.record = record || this.record;
        this.runFast = this.state && Object.keys(this.state).length > 0;
        if (this.runFast) {
            this.content.setQueueTimeout(0);
        }
        else {
            this.content.setQueueTimeout(this.TIMEOUT);
        }
        if (this.debug) {
            console.log('STATE:', this.state, Object.keys(this.state));
            console.log('RUN FAST enabled:', this.runFast);
        }
        let fetcher = null;
        if (urlOrScript.hasOwnProperty('s')) {
            fetcher = of(urlOrScript);
        }
        else {
            fetcher = this.http.get(urlOrScript);
        }
        return fetcher.pipe(switchMap((s) => {
            s = s.s[index];
            for (const snippet of s.snippets) {
                this.snippets[snippet.name] = snippet;
            }
            return this.runSnippet(this.snippets.default);
        }));
    }
    check_res(res, snippet) {
        if (this.debug) {
            console.log('RETURN VALUE:', res);
            console.log('CURRENT SNIPPET:', snippet);
        }
        if (('' + res).indexOf('pop:') === 0) {
            if (!snippet.hasOwnProperty('name') || res.slice(4) !== snippet.name) {
                return res;
            }
        }
        else if (res < 0) {
            return res;
        }
        else if (res > 0) {
            if (snippet.name) {
                return res - 1;
            }
            else {
                return res;
            }
        }
        return 0;
    }
    isInState(key) {
        return key && this.state.hasOwnProperty(key);
    }
    clearState(key) {
        if (this.isInState(key)) {
            delete this.state[key];
        }
    }
    getState(key) {
        return this.state[key];
    }
    setState(key, value) {
        if (key) {
            this.state[key] = value;
        }
    }
    isCustomStep(step) {
        if (step.__component) {
            return true;
        }
        if (this.customComponents) {
            for (const comp of this.customComponents) {
                if (step.hasOwnProperty(comp.keyword)) {
                    step.__component = comp;
                    return true;
                }
            }
        }
        return false;
    }
    async doCommand(stepDo, uid) {
        let callable = this.context[stepDo.cmd];
        const args = [];
        if (stepDo.params) {
            for (const param of stepDo.params) {
                if (param === 'record') {
                    args.push(this.record);
                }
                else if (param === 'context') {
                    args.push(this.context);
                }
                else if (param === 'uploader') {
                    this.content.addUploader(null);
                    if (this.isInState(uid)) {
                        callable = null;
                        this.content.queueFrom('...');
                        break;
                    }
                    else {
                        args.push(await this.content.waitForInput(false));
                        this.setState(uid, true);
                    }
                }
                else {
                    args.push(this.i18n(param));
                }
            }
        }
        if (callable) {
            const ret = await this.content.queueFunction(async () => {
                const ret2 = await callable(...args);
                return ret2;
            });
            if (this.debug) {
                console.log('CALLABLE', stepDo.cmd, 'RETURNED', ret);
            }
            if (stepDo.variable) {
                this.record[stepDo.variable] = ret;
                await this.setCallback(stepDo.variable, ret, this.record);
            }
            return ret;
        }
        else {
            console.log(`ERROR: function ${stepDo.cmd} is not defined`);
        }
        return null;
    }
    async runSnippet(snippet) {
        if (this.debug) {
            console.log('RUN SNIPPET', snippet);
        }
        for (const step of snippet.steps) {
            const uid = this.lastMessage + '-' + step.uid;
            if (this.debug) {
                console.log('STEP:', step);
            }
            if (step.hasOwnProperty('say')) {
                const message = this.fillIn(this.i18n(step.say));
                this.lastMessage = message;
                this.content.addTo(message);
            }
            else if (step.hasOwnProperty('wait')) {
                let ret = null;
                if (uid && this.fixme) {
                    this.content.setFixme(() => {
                        this.clearState(uid);
                        this.fixme();
                    });
                }
                if (step.wait.optionsFrom) {
                    step.wait.options = this.record[step.wait.optionsFrom];
                }
                if (step.wait.options) {
                    const options = [];
                    for (const option of step.wait.options) {
                        option.value = option.hasOwnProperty('value') ? option.value : option.show;
                        option.value = option.value.hasOwnProperty('.tx') ? option.value['.tx']._ : option.value;
                        const cOption = {
                            display: this.i18n(option.show),
                            value: option.value,
                            field: option.field,
                            class: option.class,
                            echo: option.echo !== false,
                            func: option.do ? (async () => await this.doCommand(option.do)) : null,
                        };
                        if (option.unless && this.record[option.unless]) {
                            cOption.class = 'unless ' + (cOption.class || '');
                        }
                        options.push(cOption);
                    }
                    const multi = !!step.wait.multi;
                    if (this.isInState(uid) && this.runFast) {
                        ret = this.getState(uid);
                        this.content.addOptions(null, options, ret, multi);
                    }
                    else {
                        if (this.runFast) {
                            if (this.debug) {
                                console.log('RUN FAST TURNED OFF');
                            }
                            await this.content.queueFunction(async () => {
                                this.content.setQueueTimeout(this.TIMEOUT);
                                this.runFast = false;
                            });
                        }
                        this.content.addOptions(null, options, null, multi);
                        ret = await this.content.waitForInput(false);
                        this.setState(uid, ret);
                    }
                    if (step.wait.variable) {
                        this.record[step.wait.variable] = ret;
                        await this.setCallback(step.wait.variable, ret, this.record);
                    }
                    for (const option of step.wait.options) {
                        if (ret === option.value) {
                            if (this.runFast && option.do) {
                                await this.doCommand(option.do);
                            }
                            if (option.steps) {
                                let res = await this.runSnippet(option);
                                res = this.check_res(res, snippet);
                                if (res !== 0) {
                                    return res;
                                }
                            }
                            break;
                        }
                    }
                }
                else {
                    if (!!step.wait.long) {
                        this.content.setTextArea();
                    }
                    this.content.setInputKind(step.wait['input-kind'] || 'text', step.wait.required !== false, step.wait['input-min'], step.wait['input-max'], step.wait['input-step']);
                    if (step.wait.suggestionsFrom) {
                        step.wait.suggestions = this.record[step.wait.suggestionsFrom];
                    }
                    this.content.setInputSuggestions(step.wait.suggestions);
                    if (!!step.wait.placeholder) {
                        this.content.setPlaceholder(this.i18n(step.wait.placeholder));
                    }
                    if (!!step.wait.validation) {
                        const vre = new RegExp('^' + step.wait.validation + '$');
                        this.content.setValidator((x) => {
                            return vre.test(x);
                        });
                    }
                    else {
                        this.content.setValidator((x) => true);
                    }
                    if (this.isInState(uid) && this.runFast) {
                        ret = this.getState(uid);
                    }
                    else {
                        if (this.runFast) {
                            if (this.debug) {
                                console.log('RUN FAST TURNED OFF');
                            }
                            await this.content.queueFunction(async () => {
                                this.content.setQueueTimeout(this.TIMEOUT);
                                this.runFast = false;
                            });
                        }
                        this.content.queueFunction(async () => {
                            this.content.reportUpdated(null);
                        });
                        ret = await this.content.waitForInput(true);
                        this.setState(uid, ret);
                    }
                    this.record[step.wait.variable] = ret;
                    let response = ret + '';
                    if (step.wait.response && step.wait.response.length) {
                        response = this.fillIn(step.wait.response);
                    }
                    if (this.debug) {
                        console.log(`FORMATTED ${JSON.stringify(ret)} to "${response}" (using ${step.wait.response})`);
                    }
                    if (response.length) {
                        this.content.queueFrom(response);
                    }
                    await this.setCallback(step.wait.variable, ret, this.record);
                }
                this.content.setFixme(null);
            }
            else if (step.hasOwnProperty('do')) {
                await this.doCommand(step.do, uid);
            }
            else if (step.hasOwnProperty('switch')) {
                const arg = step.switch.arg;
                const value = this.get(this.record, arg);
                if (this.debug) {
                    console.log('SWITCH on value', value, '(', arg, ',', this.record, ')');
                }
                let selected = null;
                let defaultCase = null;
                for (const theCase of step.switch.cases) {
                    if (this.debug) {
                        console.log('CASE', theCase);
                    }
                    if (theCase.default) {
                        if (this.debug) {
                            console.log('CASE DEFAULT');
                        }
                        defaultCase = theCase;
                    }
                    if (theCase.hasOwnProperty('match') && theCase.match === value) {
                        selected = theCase;
                    }
                    else if (theCase.hasOwnProperty('pattern') && RegExp(theCase.pattern).test(value)) {
                        selected = theCase;
                    }
                    else if (theCase.hasOwnProperty('undefined') && theCase.undefined && (value === null || value === undefined)) {
                        selected = theCase;
                    }
                }
                if (this.debug) {
                    console.log('CASE SELECTED', selected);
                }
                selected = selected || defaultCase;
                if (selected) {
                    if (selected.steps) {
                        let res = await this.runSnippet(selected);
                        res = this.check_res(res, snippet);
                        if (res !== 0) {
                            return res;
                        }
                    }
                }
                else {
                    console.log(`ERROR: no viable option for ${value} (${step.switch.arg}) in switch`);
                }
            }
            else if (step.hasOwnProperty('goto')) {
                if (step.goto === 'complete') {
                    return this.COMPLETE;
                }
                if (step.goto === 'break') {
                    return this.BREAK;
                }
                if (step.goto === 'return') {
                    return this.RETURN + 2;
                }
                const gotoSnippet = this.snippets[step.goto];
                if (gotoSnippet) {
                    let res = await this.runSnippet(gotoSnippet);
                    res = this.check_res(res, snippet);
                    if (res !== 0) {
                        return res;
                    }
                }
                else {
                    console.log(`ERROR: unknown snippet requested ${step.goto}`);
                }
            }
            else if (step.hasOwnProperty('pop')) {
                return 'pop:' + step.pop;
            }
            else if (this.isCustomStep(step)) {
                step.__runner = this;
                step.__runFast = this.runFast;
                let ret = null;
                if (this.isInState(uid) && this.runFast) {
                    await this.content.addCustomComponent(step, false);
                    ret = this.getState(uid);
                }
                else {
                    ret = await this.content.addCustomComponent(step, true, step.__component.timeout);
                    this.setState(uid, ret);
                }
                if (ret) {
                    this.content.queueFrom(ret, 0);
                }
            }
            else {
                throw new Error(`Bad step ${JSON.stringify(step)}`);
            }
        }
        return this.RETURN;
    }
}

class ScriptRunnerService {
    constructor(http, content, locale) {
        this.http = http;
        this.content = content;
        this.locale = locale;
        this.R = new ScriptRunnerImpl(http, content.M, this.locale);
    }
    run(url, index, context, setCallback, record, eventCallback) {
        return this.R.run(url, index, context, setCallback, record, eventCallback);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ScriptRunnerService, deps: [{ token: i1.HttpClient }, { token: ContentService }, { token: LOCALE_ID }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ScriptRunnerService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ScriptRunnerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }, { type: ContentService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [LOCALE_ID]
                }] }] });

class MessageFromComponent {
    constructor() { }
    ngOnInit() {
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessageFromComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: MessageFromComponent, selector: "htl-message-from", inputs: { params: "params", first: "first", content: "content" }, ngImport: i0, template: "<div [class.message-from-wrapper]='true' [class.first]='first'>\n  <p class='speech-bubble'>\n    <span>{{ params.message }}</span>\n  </p>\n  <a class='fixme' *ngIf='params.fixme' (click)='params.fixme()' [innerHTML]='params.fixmeMessage'></a>\n</div>\n", styles: [":host{display:flex;justify-content:right;flex:0 0 auto;align-items:flex-start;justify-content:flex-start}:host .message-from-wrapper{display:flex;flex-wrap:wrap;align-items:flex-end;flex-flow:row}:host p{flex:0 1 auto;text-align:right}\n"], dependencies: [{ kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessageFromComponent, decorators: [{
            type: Component,
            args: [{ selector: 'htl-message-from', template: "<div [class.message-from-wrapper]='true' [class.first]='first'>\n  <p class='speech-bubble'>\n    <span>{{ params.message }}</span>\n  </p>\n  <a class='fixme' *ngIf='params.fixme' (click)='params.fixme()' [innerHTML]='params.fixmeMessage'></a>\n</div>\n", styles: [":host{display:flex;justify-content:right;flex:0 0 auto;align-items:flex-start;justify-content:flex-start}:host .message-from-wrapper{display:flex;flex-wrap:wrap;align-items:flex-end;flex-flow:row}:host p{flex:0 1 auto;text-align:right}\n"] }]
        }], ctorParameters: () => [], propDecorators: { params: [{
                type: Input
            }], first: [{
                type: Input
            }], content: [{
                type: Input
            }] } });

class MessageToComponent {
    constructor() { }
    ngOnInit() {
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessageToComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: MessageToComponent, selector: "htl-message-to", inputs: { params: "params", first: "first", content: "content" }, ngImport: i0, template: "<div class='message-to-wrapper' [class.first]='first'>\n  <p class='speech-bubble'>\n    <span [innerHtml]='params.message'></span>\n  </p>\n</div>\n", styles: [":host{display:flex;justify-content:left;flex:0 0 auto;align-items:flex-end;justify-content:flex-end}:host .message-to-wrapper{display:flex;flex-wrap:wrap;align-items:flex-start;flex-flow:row}:host p{flex:0 1 auto;text-align:right}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessageToComponent, decorators: [{
            type: Component,
            args: [{ selector: 'htl-message-to', template: "<div class='message-to-wrapper' [class.first]='first'>\n  <p class='speech-bubble'>\n    <span [innerHtml]='params.message'></span>\n  </p>\n</div>\n", styles: [":host{display:flex;justify-content:left;flex:0 0 auto;align-items:flex-end;justify-content:flex-end}:host .message-to-wrapper{display:flex;flex-wrap:wrap;align-items:flex-start;flex-flow:row}:host p{flex:0 1 auto;text-align:right}\n"] }]
        }], ctorParameters: () => [], propDecorators: { params: [{
                type: Input
            }], first: [{
                type: Input
            }], content: [{
                type: Input
            }] } });

class MessageTypingComponent {
    constructor() { }
    ngOnInit() {
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessageTypingComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: MessageTypingComponent, selector: "htl-message-typing", inputs: { content: "content" }, ngImport: i0, template: "<div class=\"typing is-typing-init is-typing-active\">\n    <span class=\"typing__bullet\"></span>\n    <span class=\"typing__bullet\"></span>\n    <span class=\"typing__bullet\"></span>\n</div>\n", styles: [":host{display:flex;flex-flow:row;justify-content:flex-end;flex:0 0 auto}:host .typing{direction:ltr;display:none;padding:35px;font-size:0;animation:fadeInUp .2s linear 1 both}:host .typing__bullet{display:inline-block;width:7px;height:7px;border-radius:50%;background-color:#0000004d;transition:all .3s linear}:host .typing__bullet:not(:last-child){margin-right:3px}:host .typing.is-typing-init{display:inline-block}:host .typing.is-typing-active .typing__bullet{background-color:#000;animation:bounce .6s linear infinite both}:host .typing.is-typing-active .typing__bullet:nth-child(2){animation-delay:.15s}:host .typing.is-typing-active .typing__bullet:nth-child(3){animation-delay:.3s}@keyframes bounce{0%,80%,to{opacity:1;transform:translateY(0)}50%{opacity:.5;transform:translateY(-100%)}}@keyframes fadeInUp{0%{opacity:0;transform:translateY(50%)}to{opacity:1;transform:translateY(0)}}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessageTypingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'htl-message-typing', template: "<div class=\"typing is-typing-init is-typing-active\">\n    <span class=\"typing__bullet\"></span>\n    <span class=\"typing__bullet\"></span>\n    <span class=\"typing__bullet\"></span>\n</div>\n", styles: [":host{display:flex;flex-flow:row;justify-content:flex-end;flex:0 0 auto}:host .typing{direction:ltr;display:none;padding:35px;font-size:0;animation:fadeInUp .2s linear 1 both}:host .typing__bullet{display:inline-block;width:7px;height:7px;border-radius:50%;background-color:#0000004d;transition:all .3s linear}:host .typing__bullet:not(:last-child){margin-right:3px}:host .typing.is-typing-init{display:inline-block}:host .typing.is-typing-active .typing__bullet{background-color:#000;animation:bounce .6s linear infinite both}:host .typing.is-typing-active .typing__bullet:nth-child(2){animation-delay:.15s}:host .typing.is-typing-active .typing__bullet:nth-child(3){animation-delay:.3s}@keyframes bounce{0%,80%,to{opacity:1;transform:translateY(0)}50%{opacity:.5;transform:translateY(-100%)}}@keyframes fadeInUp{0%{opacity:0;transform:translateY(50%)}to{opacity:1;transform:translateY(0)}}\n"] }]
        }], ctorParameters: () => [], propDecorators: { content: [{
                type: Input
            }] } });

class MessageOptionsComponent {
    constructor(el) {
        this.el = el;
        this.active = false;
        this.enabled = true;
        this.selected = null;
        this.isSelected = false;
        this.echoSelected = false;
    }
    ngOnInit() {
        if (this.params.selected !== null && this.params.selected !== undefined) {
            this.selected = this.params.selected;
            this.isSelected = true;
        }
        this.selectedJson = JSON.stringify(this.selected);
    }
    get multi() {
        return !!this.params.multi;
    }
    equalsSelected(value) {
        return JSON.stringify(value) === this.selectedJson;
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.active = true;
            if (!this.isSelected) {
                // console.log('FOCUSING OPTIONS', this.el.nativeElement.querySelector('button'));
                // this.el.nativeElement.querySelector('button').focus();
            }
        }, 0);
    }
    onSubmit(selected) {
        const value = selected.value;
        let obs = null;
        if (selected.func) {
            obs = defer(selected.func);
        }
        else {
            obs = from([value]);
        }
        obs.subscribe((retVal) => {
            if (retVal !== null) {
                this.enabled = false;
                this.selected = retVal;
                this.isSelected = true;
                this.echoSelected = selected.echo;
                this.selectedJson = JSON.stringify(this.selected);
                this.content.reportValue(this.selected);
            }
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessageOptionsComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: MessageOptionsComponent, selector: "htl-message-options", inputs: { params: "params", content: "content" }, ngImport: i0, template: "<span class='options' [class.selected]='isSelected' role='group'>\n  <ng-container *ngFor='let option of params.options'>\n    <button (click)='onSubmit(option)' \n            (animationend)='content.reportUpdated(null)'\n            [disabled]='!enabled' \n            [class]='option.class || \"\"'\n            [class.active]='active'\n            [class.selected]='isSelected && equalsSelected(option.value)'\n            [class.echo]='option.echo'\n            [class.not-selected]='isSelected && !equalsSelected(option.value)'\n    ><span [innerHtml]='option.display'></span></button>\n  </ng-container>\n  <a class='fixme' *ngIf='params.fixme && echoSelected' (click)='params.fixme()' [innerHTML]='params.fixmeMessage'></a>\n</span>", styles: [":host{flex:0 0 auto}:host .options{display:flex;flex-flow:row wrap;justify-content:space-evenly}\n"], dependencies: [{ kind: "directive", type: i1$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessageOptionsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'htl-message-options', template: "<span class='options' [class.selected]='isSelected' role='group'>\n  <ng-container *ngFor='let option of params.options'>\n    <button (click)='onSubmit(option)' \n            (animationend)='content.reportUpdated(null)'\n            [disabled]='!enabled' \n            [class]='option.class || \"\"'\n            [class.active]='active'\n            [class.selected]='isSelected && equalsSelected(option.value)'\n            [class.echo]='option.echo'\n            [class.not-selected]='isSelected && !equalsSelected(option.value)'\n    ><span [innerHtml]='option.display'></span></button>\n  </ng-container>\n  <a class='fixme' *ngIf='params.fixme && echoSelected' (click)='params.fixme()' [innerHTML]='params.fixmeMessage'></a>\n</span>", styles: [":host{flex:0 0 auto}:host .options{display:flex;flex-flow:row wrap;justify-content:space-evenly}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { params: [{
                type: Input
            }], content: [{
                type: Input
            }] } });

class MessageUploaderComponent {
    constructor() {
        this.progressInternal = 0;
        this.activeInternal = false;
        this.successInternal = false;
        this.selectedInternal = false;
        this.selectedFile = null;
    }
    ngOnInit() {
    }
    addFiles() {
        this.file.nativeElement.click();
    }
    onFilesAdded() {
        const files = this.file.nativeElement.files;
        for (const key in files) {
            if (!isNaN(parseInt(key, 10))) {
                this.selectedFile = files[key];
                this.selectedInternal = true;
                this.content.reportValue(this);
                break;
            }
        }
    }
    set progress(progress) {
        if (this.selectedInternal && this.activeInternal) {
            this.progressInternal = progress;
        }
    }
    set active(active) {
        if (this.selectedInternal) {
            this.activeInternal = active;
        }
    }
    set success(success) {
        if (this.activeInternal) {
            this.successInternal = success;
            this.activeInternal = false;
            this.progressInternal = 100;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessageUploaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: MessageUploaderComponent, selector: "htl-message-uploader", inputs: { params: "params", content: "content" }, viewQueries: [{ propertyName: "file", first: true, predicate: ["file"], descendants: true, static: true }], ngImport: i0, template: "<input type=\"file\" #file (change)=\"onFilesAdded()\" />\n<div class='button' (click)='addFiles()' \n     [class.selected]='selectedInternal'\n     [class.active]='activeInternal'\n     [class.success]='successInternal'\n     >\n    <div *ngIf='!activeInternal && !selectedInternal' class='message'>{{ content.uploadFileText }}</div>\n    <div *ngIf='activeInternal' class='message'>{{ selectedFile.name }}</div>\n    <div *ngIf='!activeInternal && selectedInternal && successInternal' class='message'>{{ content.uploadedFileText }}</div>\n    <div *ngIf='!activeInternal && selectedInternal && !successInternal' class='message'>{{ content.notUploadedFileText }}</div>\n    <div *ngIf='activeInternal' class='progress'>\n        <div class='bar' [style.left]='(progressInternal-100) + \"%\"'>\n        </div>\n    </div>\n</div>\n", styles: [":host{display:flex;flex-flow:row;justify-content:center;flex:0 0 auto}:host input[type=file]{display:none}:host .button{display:flex;flex-flow:column;justify-content:center;align-items:center}:host .button .message{width:100%;text-align:center}:host .button .progress{height:2px;width:80%;border:none;background-color:#ccc;overflow:hidden}:host .button .progress .bar{position:relative;width:100%;height:100%;background-color:green}\n"], dependencies: [{ kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessageUploaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'htl-message-uploader', template: "<input type=\"file\" #file (change)=\"onFilesAdded()\" />\n<div class='button' (click)='addFiles()' \n     [class.selected]='selectedInternal'\n     [class.active]='activeInternal'\n     [class.success]='successInternal'\n     >\n    <div *ngIf='!activeInternal && !selectedInternal' class='message'>{{ content.uploadFileText }}</div>\n    <div *ngIf='activeInternal' class='message'>{{ selectedFile.name }}</div>\n    <div *ngIf='!activeInternal && selectedInternal && successInternal' class='message'>{{ content.uploadedFileText }}</div>\n    <div *ngIf='!activeInternal && selectedInternal && !successInternal' class='message'>{{ content.notUploadedFileText }}</div>\n    <div *ngIf='activeInternal' class='progress'>\n        <div class='bar' [style.left]='(progressInternal-100) + \"%\"'>\n        </div>\n    </div>\n</div>\n", styles: [":host{display:flex;flex-flow:row;justify-content:center;flex:0 0 auto}:host input[type=file]{display:none}:host .button{display:flex;flex-flow:column;justify-content:center;align-items:center}:host .button .message{width:100%;text-align:center}:host .button .progress{height:2px;width:80%;border:none;background-color:#ccc;overflow:hidden}:host .button .progress .bar{position:relative;width:100%;height:100%;background-color:green}\n"] }]
        }], ctorParameters: () => [], propDecorators: { params: [{
                type: Input
            }], content: [{
                type: Input
            }], file: [{
                type: ViewChild,
                args: ['file', { static: true }]
            }] } });

class MessageMultiOptionsComponent {
    constructor() {
        this.active = false;
        this.enabled = true;
        this.selected = false;
        this.checked = false;
        this.value = null;
    }
    ngOnInit() {
        this.value = this.params.selected || {};
        this.selected = !!this.params.selected;
        this.checkChecked();
    }
    get multi() {
        return !!this.params.multi;
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.active = true;
            this.content.reportUpdated(null);
        }, 0);
    }
    toggle(field) {
        this.value[field] = !this.value[field];
        this.checkChecked();
    }
    onSubmit() {
        this.enabled = false;
        this.selected = true;
        this.content.reportValue(this.value);
    }
    checkChecked() {
        this.checked = Object.values(this.value).indexOf(true) >= 0;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessageMultiOptionsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: MessageMultiOptionsComponent, selector: "htl-message-multi-options", inputs: { params: "params", content: "content" }, ngImport: i0, template: "<span class='options' [class.selected]='selected' [class.checked]='checked'>\n  <ng-container *ngFor='let option of params.options'>\n    <button (click)='option.field ? toggle(option.field) : onSubmit()' \n            (animationend)='content.reportUpdated(null)'\n            [disabled]='!enabled' \n            [class]='option.class || \"\"'\n            [class.active]='active'\n            [class.selected]='!!value[option.field]'\n            [class.echo]='option.echo'\n            [class.not-selected]='selected && !value[option.field]'\n    ><span [innerHtml]='option.display'></span></button>\n  </ng-container>\n  <a class='fixme' *ngIf='params.fixme' (click)='params.fixme()' [innerHTML]='params.fixmeMessage'></a>\n</span>", styles: [":host{flex:0 0 auto}:host .options{display:flex;flex-flow:row wrap;justify-content:space-evenly}\n"], dependencies: [{ kind: "directive", type: i1$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessageMultiOptionsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'htl-message-multi-options', template: "<span class='options' [class.selected]='selected' [class.checked]='checked'>\n  <ng-container *ngFor='let option of params.options'>\n    <button (click)='option.field ? toggle(option.field) : onSubmit()' \n            (animationend)='content.reportUpdated(null)'\n            [disabled]='!enabled' \n            [class]='option.class || \"\"'\n            [class.active]='active'\n            [class.selected]='!!value[option.field]'\n            [class.echo]='option.echo'\n            [class.not-selected]='selected && !value[option.field]'\n    ><span [innerHtml]='option.display'></span></button>\n  </ng-container>\n  <a class='fixme' *ngIf='params.fixme' (click)='params.fixme()' [innerHTML]='params.fixmeMessage'></a>\n</span>", styles: [":host{flex:0 0 auto}:host .options{display:flex;flex-flow:row wrap;justify-content:space-evenly}\n"] }]
        }], ctorParameters: () => [], propDecorators: { params: [{
                type: Input
            }], content: [{
                type: Input
            }] } });

class MessageCustomComponentAuxDirective {
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessageCustomComponentAuxDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.3.12", type: MessageCustomComponentAuxDirective, selector: "[htlMessageCustomComponentAux]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessageCustomComponentAuxDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[htlMessageCustomComponentAux]'
                }]
        }], ctorParameters: () => [{ type: i0.ViewContainerRef }] });

class MessageCustomComponentComponent {
    constructor(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
    }
    ngOnInit() {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.params.step.__component.cls);
        const viewContainerRef = this.inner.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.content = this.content;
        componentRef.instance.params = this.params.step;
        this.params.step.__instance = componentRef.instance;
        this.params.componentCreatedCallback();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessageCustomComponentComponent, deps: [{ token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: MessageCustomComponentComponent, selector: "htl-message-custom-component", inputs: { content: "content", params: "params" }, viewQueries: [{ propertyName: "inner", first: true, predicate: MessageCustomComponentAuxDirective, descendants: true, static: true }], ngImport: i0, template: "<ng-template htlMessageCustomComponentAux></ng-template>", styles: [""], dependencies: [{ kind: "directive", type: MessageCustomComponentAuxDirective, selector: "[htlMessageCustomComponentAux]" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessageCustomComponentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'htl-message-custom-component', template: "<ng-template htlMessageCustomComponentAux></ng-template>" }]
        }], ctorParameters: () => [{ type: i0.ComponentFactoryResolver }], propDecorators: { content: [{
                type: Input
            }], params: [{
                type: Input
            }], inner: [{
                type: ViewChild,
                args: [MessageCustomComponentAuxDirective, { static: true }]
            }] } });

class MessageSwitchComponent {
    constructor() { }
    ngOnInit() {
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessageSwitchComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: MessageSwitchComponent, selector: "htl-message-switch", inputs: { content: "content", item: "item" }, ngImport: i0, template: "<htl-message-from [content]='content' *ngIf='item.kind==\"from\"' [params]='item.params' [first]='item.first'></htl-message-from>\n<htl-message-to [content]='content' *ngIf='item.kind==\"to\"' [params]='item.params' [first]='item.first'></htl-message-to>\n<htl-message-typing [content]='content' *ngIf='item.kind==\"typing\"'></htl-message-typing>\n<htl-message-options [content]='content' *ngIf='item.kind==\"options\" && !item.params.multi'\n                     [params]='item.params'></htl-message-options>\n<htl-message-multi-options [content]='content' *ngIf='item.kind==\"options\" && !!item.params.multi'\n                           [params]='item.params'></htl-message-multi-options>\n<htl-message-uploader [content]='content' *ngIf='item.kind==\"uploader\"' [params]='item.params'></htl-message-uploader>\n<htl-message-custom-component [content]='content' *ngIf='item.kind==\"component\"' [params]='item.params'></htl-message-custom-component>\n", styles: [":host{display:block;width:100%}\n"], dependencies: [{ kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: MessageFromComponent, selector: "htl-message-from", inputs: ["params", "first", "content"] }, { kind: "component", type: MessageToComponent, selector: "htl-message-to", inputs: ["params", "first", "content"] }, { kind: "component", type: MessageTypingComponent, selector: "htl-message-typing", inputs: ["content"] }, { kind: "component", type: MessageOptionsComponent, selector: "htl-message-options", inputs: ["params", "content"] }, { kind: "component", type: MessageUploaderComponent, selector: "htl-message-uploader", inputs: ["params", "content"] }, { kind: "component", type: MessageMultiOptionsComponent, selector: "htl-message-multi-options", inputs: ["params", "content"] }, { kind: "component", type: MessageCustomComponentComponent, selector: "htl-message-custom-component", inputs: ["content", "params"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessageSwitchComponent, decorators: [{
            type: Component,
            args: [{ selector: 'htl-message-switch', template: "<htl-message-from [content]='content' *ngIf='item.kind==\"from\"' [params]='item.params' [first]='item.first'></htl-message-from>\n<htl-message-to [content]='content' *ngIf='item.kind==\"to\"' [params]='item.params' [first]='item.first'></htl-message-to>\n<htl-message-typing [content]='content' *ngIf='item.kind==\"typing\"'></htl-message-typing>\n<htl-message-options [content]='content' *ngIf='item.kind==\"options\" && !item.params.multi'\n                     [params]='item.params'></htl-message-options>\n<htl-message-multi-options [content]='content' *ngIf='item.kind==\"options\" && !!item.params.multi'\n                           [params]='item.params'></htl-message-multi-options>\n<htl-message-uploader [content]='content' *ngIf='item.kind==\"uploader\"' [params]='item.params'></htl-message-uploader>\n<htl-message-custom-component [content]='content' *ngIf='item.kind==\"component\"' [params]='item.params'></htl-message-custom-component>\n", styles: [":host{display:block;width:100%}\n"] }]
        }], ctorParameters: () => [], propDecorators: { content: [{
                type: Input
            }], item: [{
                type: Input
            }] } });

class MessagesComponent {
    constructor() {
    }
    resize(e) {
        this.updateScroll();
    }
    updateScroll() {
        setTimeout(() => {
            const el = this.container.nativeElement;
            if (this.content.debug) {
                console.log('SCROLLING TO BOTTOM');
            }
            el.scrollTo({ left: 0, top: el.scrollHeight, behavior: this.content.fastScroll ? 'auto' : 'smooth' });
        }, 0);
    }
    ngOnInit() {
    }
    ngOnChanges() {
        if (this.updatedSub) {
            this.updatedSub.unsubscribe();
        }
        this.updatedSub = this.content.updated.subscribe(() => {
            this.updateScroll();
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessagesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: MessagesComponent, selector: "htl-messages", inputs: { content: "content" }, host: { listeners: { "window:resize": "resize($event)" } }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<div class='container' [class.fast-scroll]='content.fastScroll' [class.scroll-lock]='content.scrollLock' #container>\n  <ng-container *ngFor='let item of content.messages'>\n    <htl-message-switch [content]='content' [item]='item'\n                        [style.display]='content.visibleRevision < item.revision ? \"none\" : \"block\"'>\n    ></htl-message-switch>\n  </ng-container>\n</div>", styles: [":host{display:flex;flex-flow:column;justify-content:flex-end;overflow-y:hidden;flex:1 1 100%}:host .container{display:flex;flex-flow:column;height:100%;margin-left:0;margin-right:0;flex-basis:auto;flex-grow:1;flex-shrink:1;overflow-wrap:break-word;overflow-y:auto;overflow:-moz-scrollbars-none;-ms-overflow-style:none;scroll-behavior:smooth}:host .container.scroll-lock{overflow-y:hidden}:host .container::-webkit-scrollbar{width:0!important}:host .container :first-child{margin-top:auto}:host .container.fast-scroll{scroll-behavior:auto}\n"], dependencies: [{ kind: "directive", type: i1$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: MessageSwitchComponent, selector: "htl-message-switch", inputs: ["content", "item"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: MessagesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'htl-messages', template: "<div class='container' [class.fast-scroll]='content.fastScroll' [class.scroll-lock]='content.scrollLock' #container>\n  <ng-container *ngFor='let item of content.messages'>\n    <htl-message-switch [content]='content' [item]='item'\n                        [style.display]='content.visibleRevision < item.revision ? \"none\" : \"block\"'>\n    ></htl-message-switch>\n  </ng-container>\n</div>", styles: [":host{display:flex;flex-flow:column;justify-content:flex-end;overflow-y:hidden;flex:1 1 100%}:host .container{display:flex;flex-flow:column;height:100%;margin-left:0;margin-right:0;flex-basis:auto;flex-grow:1;flex-shrink:1;overflow-wrap:break-word;overflow-y:auto;overflow:-moz-scrollbars-none;-ms-overflow-style:none;scroll-behavior:smooth}:host .container.scroll-lock{overflow-y:hidden}:host .container::-webkit-scrollbar{width:0!important}:host .container :first-child{margin-top:auto}:host .container.fast-scroll{scroll-behavior:auto}\n"] }]
        }], ctorParameters: () => [], propDecorators: { container: [{
                type: ViewChild,
                args: ['container', { static: true }]
            }], content: [{
                type: Input
            }], resize: [{
                type: HostListener,
                args: ['window:resize', ['$event']]
            }] } });

class InputComponent {
    constructor() {
        this.inputRequired = true;
        this.suggestions = null;
        this.visibleSuggestions = null;
        this.value = null;
        this.valid = true;
        try {
            const collator = new Intl.Collator(['he', 'en', 'ru', 'ar', 'fr', 'es'], { sensitivity: 'base' });
            this.comparer = collator.compare;
        }
        catch (e) {
            this.comparer = (x, y) => x.toUpperCase() === y.toUpperCase() ? 0 : 1;
        }
    }
    ngOnInit() {
        setTimeout(() => {
            this.validate();
        }, 0);
    }
    ngOnChanges() {
        window.setTimeout(() => {
            if (this.input) {
                const el = this.input.nativeElement;
                if (el) {
                    el.focus();
                }
            }
        }, 0);
    }
    onSubmit() {
        const el = this.input.nativeElement;
        this.value = el.value;
        this.visibleSuggestions = null;
        el.value = '';
        this.content.reportInput(this.value);
    }
    updateSuggestions(value) {
        if (this.suggestions && this.suggestions.length && value.length > 1) {
            this.visibleSuggestions = [];
            const prefixLength = value.length;
            for (const suggestion of this.suggestions) {
                const prefix = suggestion.slice(0, prefixLength);
                if (this.comparer(value, prefix) === 0) {
                    this.visibleSuggestions.push([prefix, suggestion.slice(prefixLength)]);
                }
            }
        }
        else {
            this.visibleSuggestions = null;
        }
    }
    selectSuggestion(value, event) {
        value = value[0] + value[1];
        if (this.input) {
            this.input.nativeElement.value = value;
            this.validate();
            if (this.valid) {
                this.onSubmit();
                this.visibleSuggestions = null;
            }
        }
        if (event) {
            event.preventDefault();
        }
    }
    validate() {
        if (this.input) {
            const value = this.input.nativeElement.value;
            this.updateSuggestions(value);
            this.valid = !this.inputRequired || !!value;
            if (!this.valid) {
                console.log('invalid as inputRequired=' + this.inputRequired + ', value=' + value);
                return false;
            }
            this.valid = (!this.input.nativeElement.validity || this.input.nativeElement.validity.valid);
            if (!this.valid) {
                console.log('invalid as nativeElement.validity=' + this.input.nativeElement.validity +
                    ', validity.valid=' + this.input.nativeElement.validity.valid);
                return false;
            }
            this.valid = (!this.validator || this.validator(value));
            if (!this.valid) {
                console.log('invalid as validator=' + this.validator + ', validator(value)=' + this.validator(value));
                return false;
            }
        }
        else {
            this.valid = !this.validator || this.validator('');
            if (!this.valid) {
                console.log('invalid as validator=' + this.validator + ', validator("")=' + this.validator(''));
                return false;
            }
        }
        return this.valid;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: InputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: InputComponent, selector: "htl-input", inputs: { content: "content", inputEnabled: "inputEnabled", textArea: "textArea", inputKind: "inputKind", inputMin: "inputMin", inputMax: "inputMax", inputStep: "inputStep", placeholder: "placeholder", inputRequired: "inputRequired", suggestions: "suggestions", validator: "validator" }, viewQueries: [{ propertyName: "input", first: true, predicate: ["input"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf='textArea && inputEnabled'>\n    <div class='textarea'>\n      <textarea rows='4' #input autofocus (keyup)='validate()' (change)='validate()'\n                [placeholder]='placeholder || content.inputPlaceholder'\n      ></textarea>\n      <button (click)='onSubmit()' [innerHTML]='content.sendButtonText' [disabled]='!valid'></button>\n    </div>\n</ng-container>\n<ng-container *ngIf='!textArea || !inputEnabled'>\n    <div class='suggestions-wrapper' *ngIf='visibleSuggestions && visibleSuggestions.length > 0'>\n      <div class='suggestions'>\n        <span class='suggestion' *ngFor='let suggestion of visibleSuggestions'\n             (click)='selectSuggestion(suggestion)' (touchstart)='selectSuggestion(suggestion, $event)'>\n          <strong>{{ suggestion[0] }}</strong>{{ suggestion[1] }}\n        </span>\n      </div>\n    </div>\n    <div class='input' *ngIf='inputEnabled' [class.invalid]='!valid'>\n      <input [type]='inputKind' #input (keyup)='validate() && ($event.keyCode == 13) && onSubmit()' (change)='validate()'\n            [attr.min]='inputMin' [attr.max]='inputMax' [attr.step]='inputStep'\n            [disabled]='!inputEnabled' [placeholder]='placeholder || content.inputPlaceholder'             \n            autofocus />\n      <button [disabled]='!valid' (click)='onSubmit()' [innerHTML]='content.sendButtonText' aria-label='SEND'></button>\n    </div>\n</ng-container>\n", styles: [":host{display:flex;flex-flow:column;flex:0 0 auto}:host .textarea,:host .input{display:flex;flex-flow:row;justify-content:stretch;align-items:center}:host .textarea button,:host .input button{flex:0 0 auto}:host .textarea textarea,:host .input textarea,:host .textarea input,:host .input input{flex:1 1 100%}:host .suggestions-wrapper{position:relative;overflow:visible;width:100%;height:0px}:host .suggestions-wrapper .suggestions{position:absolute;bottom:0;border:1px solid #89a9a8;margin:8px 0;z-index:1;width:100%;max-height:200px;overflow-y:scroll;overflow-x:hidden;display:flex;flex-flow:column;align-items:stretch;padding:0 8px;border-radius:8px;box-shadow:0 4px 8px #0000001f;background-color:#fff}:host .suggestions-wrapper .suggestions .suggestion{display:flex;flex:0 0 auto;flex-flow:row;align-items:center;justify-content:flex-start;height:40px;font-size:22px;border-bottom:solid 1px rgba(0,0,0,.12);padding:0 8px;white-space:pre;cursor:pointer}\n"], dependencies: [{ kind: "directive", type: i1$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: InputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'htl-input', template: "<ng-container *ngIf='textArea && inputEnabled'>\n    <div class='textarea'>\n      <textarea rows='4' #input autofocus (keyup)='validate()' (change)='validate()'\n                [placeholder]='placeholder || content.inputPlaceholder'\n      ></textarea>\n      <button (click)='onSubmit()' [innerHTML]='content.sendButtonText' [disabled]='!valid'></button>\n    </div>\n</ng-container>\n<ng-container *ngIf='!textArea || !inputEnabled'>\n    <div class='suggestions-wrapper' *ngIf='visibleSuggestions && visibleSuggestions.length > 0'>\n      <div class='suggestions'>\n        <span class='suggestion' *ngFor='let suggestion of visibleSuggestions'\n             (click)='selectSuggestion(suggestion)' (touchstart)='selectSuggestion(suggestion, $event)'>\n          <strong>{{ suggestion[0] }}</strong>{{ suggestion[1] }}\n        </span>\n      </div>\n    </div>\n    <div class='input' *ngIf='inputEnabled' [class.invalid]='!valid'>\n      <input [type]='inputKind' #input (keyup)='validate() && ($event.keyCode == 13) && onSubmit()' (change)='validate()'\n            [attr.min]='inputMin' [attr.max]='inputMax' [attr.step]='inputStep'\n            [disabled]='!inputEnabled' [placeholder]='placeholder || content.inputPlaceholder'             \n            autofocus />\n      <button [disabled]='!valid' (click)='onSubmit()' [innerHTML]='content.sendButtonText' aria-label='SEND'></button>\n    </div>\n</ng-container>\n", styles: [":host{display:flex;flex-flow:column;flex:0 0 auto}:host .textarea,:host .input{display:flex;flex-flow:row;justify-content:stretch;align-items:center}:host .textarea button,:host .input button{flex:0 0 auto}:host .textarea textarea,:host .input textarea,:host .textarea input,:host .input input{flex:1 1 100%}:host .suggestions-wrapper{position:relative;overflow:visible;width:100%;height:0px}:host .suggestions-wrapper .suggestions{position:absolute;bottom:0;border:1px solid #89a9a8;margin:8px 0;z-index:1;width:100%;max-height:200px;overflow-y:scroll;overflow-x:hidden;display:flex;flex-flow:column;align-items:stretch;padding:0 8px;border-radius:8px;box-shadow:0 4px 8px #0000001f;background-color:#fff}:host .suggestions-wrapper .suggestions .suggestion{display:flex;flex:0 0 auto;flex-flow:row;align-items:center;justify-content:flex-start;height:40px;font-size:22px;border-bottom:solid 1px rgba(0,0,0,.12);padding:0 8px;white-space:pre;cursor:pointer}\n"] }]
        }], ctorParameters: () => [], propDecorators: { content: [{
                type: Input
            }], inputEnabled: [{
                type: Input
            }], textArea: [{
                type: Input
            }], inputKind: [{
                type: Input
            }], inputMin: [{
                type: Input
            }], inputMax: [{
                type: Input
            }], inputStep: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], inputRequired: [{
                type: Input
            }], suggestions: [{
                type: Input
            }], validator: [{
                type: Input
            }], input: [{
                type: ViewChild,
                args: ['input']
            }] } });

class ChatboxComponent {
    constructor() { }
    ngOnInit() {
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ChatboxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: ChatboxComponent, selector: "htl-chatbox", inputs: { content: "content" }, ngImport: i0, template: "<htl-messages [content]='content'></htl-messages>\n<htl-input [inputEnabled]='content.inputEnabled' [textArea]='content.textArea'\n           [inputKind]='content.inputKind' [inputMin]='content.inputMin' [inputMax]='content.inputMax' [inputStep]='content.inputStep'\n           [inputRequired]='content.inputRequired' [suggestions]='content.inputSuggestions'\n           [content]='content' [placeholder]='content.placeholder' [validator]='content.validator'\n           [class.enabled]='content.inputEnabled'\n></htl-input>\n", styles: [":host{width:100%;height:100%;display:flex;flex-flow:column}\n"], dependencies: [{ kind: "component", type: MessagesComponent, selector: "htl-messages", inputs: ["content"] }, { kind: "component", type: InputComponent, selector: "htl-input", inputs: ["content", "inputEnabled", "textArea", "inputKind", "inputMin", "inputMax", "inputStep", "placeholder", "inputRequired", "suggestions", "validator"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ChatboxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'htl-chatbox', template: "<htl-messages [content]='content'></htl-messages>\n<htl-input [inputEnabled]='content.inputEnabled' [textArea]='content.textArea'\n           [inputKind]='content.inputKind' [inputMin]='content.inputMin' [inputMax]='content.inputMax' [inputStep]='content.inputStep'\n           [inputRequired]='content.inputRequired' [suggestions]='content.inputSuggestions'\n           [content]='content' [placeholder]='content.placeholder' [validator]='content.validator'\n           [class.enabled]='content.inputEnabled'\n></htl-input>\n", styles: [":host{width:100%;height:100%;display:flex;flex-flow:column}\n"] }]
        }], ctorParameters: () => [], propDecorators: { content: [{
                type: Input
            }] } });

class HatoolLibComponent {
    constructor(contentService) {
        this.contentService = contentService;
    }
    ngOnInit() {
        this.content = this.content ? this.content : this.contentService.M;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: HatoolLibComponent, deps: [{ token: ContentService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: HatoolLibComponent, selector: "htl-hatool", inputs: { content: "content" }, ngImport: i0, template: `
      <htl-chatbox [content]='content'></htl-chatbox>
  `, isInline: true, styles: [":host{display:block;width:100%;height:100%}\n"], dependencies: [{ kind: "component", type: ChatboxComponent, selector: "htl-chatbox", inputs: ["content"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: HatoolLibComponent, decorators: [{
            type: Component,
            args: [{ selector: 'htl-hatool', template: `
      <htl-chatbox [content]='content'></htl-chatbox>
  `, styles: [":host{display:block;width:100%;height:100%}\n"] }]
        }], ctorParameters: () => [{ type: ContentService }], propDecorators: { content: [{
                type: Input
            }] } });

class HatoolLibModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: HatoolLibModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.12", ngImport: i0, type: HatoolLibModule, declarations: [HatoolLibComponent,
            ChatboxComponent,
            MessagesComponent,
            InputComponent,
            MessageFromComponent,
            MessageToComponent,
            MessageTypingComponent,
            MessageOptionsComponent,
            MessageUploaderComponent,
            MessageMultiOptionsComponent,
            MessageCustomComponentComponent,
            MessageCustomComponentAuxDirective,
            MessageSwitchComponent], imports: [CommonModule,
            HttpClientModule], exports: [HatoolLibComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: HatoolLibModule, imports: [CommonModule,
            HttpClientModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: HatoolLibModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        HatoolLibComponent,
                        ChatboxComponent,
                        MessagesComponent,
                        InputComponent,
                        MessageFromComponent,
                        MessageToComponent,
                        MessageTypingComponent,
                        MessageOptionsComponent,
                        MessageUploaderComponent,
                        MessageMultiOptionsComponent,
                        MessageCustomComponentComponent,
                        MessageCustomComponentAuxDirective,
                        MessageSwitchComponent,
                    ],
                    imports: [
                        CommonModule,
                        HttpClientModule
                    ],
                    exports: [HatoolLibComponent]
                }]
        }] });

/*
 * Public API Surface of hatool
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ContentManager, ContentService, HatoolLibComponent, HatoolLibModule, ScriptRunnerImpl, ScriptRunnerService };
//# sourceMappingURL=hatool.mjs.map
