import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
export class ScriptRunnerImpl {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LXJ1bm5lci1pbXBsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvaGF0b29sL3NyYy9saWIvc2NyaXB0LXJ1bm5lci1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFNBQVMsRUFBTyxNQUFNLGdCQUFnQixDQUFDO0FBRWhELE1BQU0sT0FBTyxnQkFBZ0I7SUFzQnpCLFlBQW9CLElBQWdCLEVBQ2hCLE9BQXVCLEVBQ3ZCLE1BQWMsRUFDZCxtQkFBeUIsSUFBSTtRQUg3QixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBQ3ZCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWE7UUF4QmpELFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2IsYUFBUSxHQUFRLEVBQUUsQ0FBQztRQUVuQixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNWLFVBQUssR0FBRyxLQUFLLENBQUM7UUFDZCxVQUFLLEdBQWUsSUFBSSxDQUFDO1FBRWhDLGdDQUFnQztRQUN6QixXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLHVCQUF1QjtRQUNoQixhQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDckIsMkNBQTJDO1FBQ3BDLFVBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztRQUVYLFVBQUssR0FBRyxFQUFFLENBQUM7UUFFWCxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBT2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxJQUFJLE9BQU8sQ0FBQyxLQUFLO1FBQ2IsSUFBSSxDQUFD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QUFrQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDbEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQzVCLENBQUM7Z0JBQ0QsSUFBSSxHQUFHLEVBQUUsQ0FBQztvQkFDTixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLENBQUM7WUFDTCxDQUFDO2lCQUFNLENBQUM7Z0JBQ0osTUFBTSxJQUFJLEtBQUssQ0FBQyxZQUFZLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hELENBQUM7UUFDTCxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENCVHlwZSB9IGZyb20gJy4vc2NyaXB0LXJ1bm5lci10eXBlcyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgQ29udGVudE1hbmFnZXIgfSBmcm9tICcuL2NvbnRlbnQtbWFuYWdlcic7XG5pbXBvcnQgeyBTY3JpcHRSdW5uZXIgfSBmcm9tICcuL3NjcmlwdC1ydW5uZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgY2xhc3MgU2NyaXB0UnVubmVySW1wbCBpbXBsZW1lbnRzIFNjcmlwdFJ1bm5lciB7XG4gICAgcmVjb3JkID0ge307XG4gICAgY29udGV4dCA9IHt9O1xuICAgIHNuaXBwZXRzOiBhbnkgPSB7fTtcbiAgICBzZXRDYWxsYmFjazogQ0JUeXBlO1xuICAgIHJ1bkZhc3RJbnRlcm5hbCA9IGZhbHNlO1xuICAgIGxhc3RNZXNzYWdlID0gJyc7XG4gICAgcHVibGljIGRlYnVnID0gZmFsc2U7XG4gICAgcHVibGljIGZpeG1lOiAoKSA9PiB2b2lkID0gbnVsbDtcblxuICAgIC8vIHJldHVybiBmcm9tIGNhbGwgYW5kIGNvbnRpbnVlXG4gICAgcHVibGljIFJFVFVSTiA9IDA7XG4gICAgLy8gc2NyaXB0IGhhcyBjb21wbGV0ZWRcbiAgICBwdWJsaWMgQ09NUExFVEUgPSAtMTtcbiAgICAvLyBzY3JpcHQgcmVxdWVzdGVkIHRvIGJyZWFrIGFuZCBzYXZlIHN0YXRlXG4gICAgcHVibGljIEJSRUFLID0gLTI7XG5cbiAgICBwdWJsaWMgc3RhdGUgPSB7fTtcblxuICAgIHB1YmxpYyBUSU1FT1VUID0gMTAwMDtcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICAgICAgICAgIHByaXZhdGUgY29udGVudDogQ29udGVudE1hbmFnZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBsb2NhbGU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGN1c3RvbUNvbXBvbmVudHM6IGFueVtdPSBudWxsKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSdW5uaW5nIHdpdGggbG9jYWxlJywgdGhpcy5sb2NhbGUpO1xuICAgIH1cblxuICAgIHNldCB0aW1lb3V0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuVElNRU9VVCA9IHZhbHVlO1xuICAgIH1cblxuICAgIHNldCBydW5GYXN0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMucnVuRmFzdEludGVybmFsID0gdmFsdWU7XG4gICAgICAgIHRoaXMuY29udGVudC5zZXRTY3JvbGxMb2NrKHZhbHVlKTtcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LnNldEZhc3RTY3JvbGwodmFsdWUpO1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5xdWV1ZUZ1bmN0aW9uKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnJlcG9ydFVwZGF0ZWQobnVsbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIGdldCBydW5GYXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ydW5GYXN0SW50ZXJuYWw7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJDdXN0b21Db21wb25lbnRzKGN1c3RvbUNvbXBvbmVudHM6IGFueVtdKSB7XG4gICAgICAgIHRoaXMuY3VzdG9tQ29tcG9uZW50cyA9IGN1c3RvbUNvbXBvbmVudHM7XG4gICAgfVxuXG4gICAgaTE4bihvYmopIHtcbiAgICAgICAgaWYgKG9iaiAmJiBvYmpbJy50eCddKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sb2NhbGUgJiYgb2JqWycudHgnXVt0aGlzLmxvY2FsZV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqWycudHgnXVt0aGlzLmxvY2FsZV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmpbJy50eCddLl87XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICBnZXQob2JqOiBhbnksIGZpZWxkKSB7XG4gICAgICAgIGNvbnN0IHBhcnRzID0gZmllbGQuc3BsaXQoJy4nKTtcbiAgICAgICAgZm9yIChjb25zdCBwYXJ0IG9mIHBhcnRzKSB7XG4gICAgICAgICAgICBvYmogPSBvYmpbcGFydF0gfHwge307XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9iai5jb25zdHJ1Y3RvciAhPT0gT2JqZWN0IHx8IE9iamVjdC5lbnRyaWVzKG9iaikubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBnZXREZWZhdWx0KGYpIHtcbiAgICAgICAgY29uc3QgcmV0ID0gdGhpcy5nZXQodGhpcy5yZWNvcmQsIGYpO1xuICAgICAgICBpZiAocmV0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmV0ICsgJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbGxJbihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UudHJpbSgpLnJlcGxhY2UoXG4gICAgICAgICAgICBSZWdFeHAoJyhcXFxce1xcXFx7KChcXFxccHtMfXxcXFxccHtOfXxffFxcXFwuKSspXFxcXH1cXFxcfSknLCAnZ3VtJyksXG4gICAgICAgICAgICAobWF0Y2gsIHAxLCBwMikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldERlZmF1bHQocDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJ1bih1cmxPclNjcmlwdDogYW55LFxuICAgICAgICBpbmRleDogYW55LFxuICAgICAgICBjb250ZXh0OiBhbnksXG4gICAgICAgIHNldENhbGxiYWNrPzogQ0JUeXBlLFxuICAgICAgICByZWNvcmQ/OiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLnNldENhbGxiYWNrID0gc2V0Q2FsbGJhY2sgfHwgKChrLCB2KSA9PiBudWxsKTtcbiAgICAgICAgdGhpcy5yZWNvcmQgPSByZWNvcmQgfHwgdGhpcy5yZWNvcmQ7XG4gICAgICAgIHRoaXMucnVuRmFzdCA9IHRoaXMuc3RhdGUgJiYgT2JqZWN0LmtleXModGhpcy5zdGF0ZSkubGVuZ3RoID4gMDtcbiAgICAgICAgaWYgKHRoaXMucnVuRmFzdCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LnNldFF1ZXVlVGltZW91dCgwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5zZXRRdWV1ZVRpbWVvdXQodGhpcy5USU1FT1VUKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kZWJ1Zykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1NUQVRFOicsIHRoaXMuc3RhdGUsIE9iamVjdC5rZXlzKHRoaXMuc3RhdGUpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSVU4gRkFTVCBlbmFibGVkOicsIHRoaXMucnVuRmFzdCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGZldGNoZXIgPSBudWxsO1xuICAgICAgICBpZiAodXJsT3JTY3JpcHQuaGFzT3duUHJvcGVydHkoJ3MnKSkge1xuICAgICAgICAgICAgZmV0Y2hlciA9IG9mKHVybE9yU2NyaXB0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZldGNoZXIgPSB0aGlzLmh0dHAuZ2V0KHVybE9yU2NyaXB0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmV0Y2hlci5waXBlKFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcCgoczogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHMgPSBzLnNbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHNuaXBwZXQgb2Ygcy5zbmlwcGV0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zbmlwcGV0c1tzbmlwcGV0Lm5hbWVdID0gc25pcHBldDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ydW5TbmlwcGV0KHRoaXMuc25pcHBldHMuZGVmYXVsdCk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGNoZWNrX3JlcyhyZXMsIHNuaXBwZXQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGVidWcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSRVRVUk4gVkFMVUU6JywgcmVzKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDVVJSRU5UIFNOSVBQRVQ6Jywgc25pcHBldCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCgnJyArIHJlcykuaW5kZXhPZigncG9wOicpID09PSAwKSB7XG4gICAgICAgICAgICBpZiAoIXNuaXBwZXQuaGFzT3duUHJvcGVydHkoJ25hbWUnKSB8fCByZXMuc2xpY2UoNCkgIT09IHNuaXBwZXQubmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocmVzIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSBlbHNlIGlmIChyZXMgPiAwKSB7XG4gICAgICAgICAgICBpZiAoc25pcHBldC5uYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcyAtIDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgaXNJblN0YXRlKGtleSkge1xuICAgICAgICByZXR1cm4ga2V5ICYmIHRoaXMuc3RhdGUuaGFzT3duUHJvcGVydHkoa2V5KTtcbiAgICB9XG5cbiAgICBjbGVhclN0YXRlKGtleSkge1xuICAgICAgICBpZiAodGhpcy5pc0luU3RhdGUoa2V5KSkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuc3RhdGVba2V5XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFN0YXRlKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZVtrZXldO1xuICAgIH1cblxuICAgIHNldFN0YXRlKGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZVtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0N1c3RvbVN0ZXAoc3RlcCkge1xuICAgICAgICBpZiAoc3RlcC5fX2NvbXBvbmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tQ29tcG9uZW50cykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjb21wIG9mIHRoaXMuY3VzdG9tQ29tcG9uZW50cykge1xuICAgICAgICAgICAgICAgIGlmIChzdGVwLmhhc093blByb3BlcnR5KGNvbXAua2V5d29yZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RlcC5fX2NvbXBvbmVudCA9IGNvbXA7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgYXN5bmMgZG9Db21tYW5kKHN0ZXBEbywgdWlkPykge1xuICAgICAgICBsZXQgY2FsbGFibGUgPSB0aGlzLmNvbnRleHRbc3RlcERvLmNtZF07XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBbXTtcbiAgICAgICAgaWYgKHN0ZXBEby5wYXJhbXMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcGFyYW0gb2Ygc3RlcERvLnBhcmFtcykge1xuICAgICAgICAgICAgICAgIGlmIChwYXJhbSA9PT0gJ3JlY29yZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHRoaXMucmVjb3JkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtID09PSAnY29udGV4dCcpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHRoaXMuY29udGV4dCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbSA9PT0gJ3VwbG9hZGVyJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuYWRkVXBsb2FkZXIobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzSW5TdGF0ZSh1aWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYWJsZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQucXVldWVGcm9tKCcuLi4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGF3YWl0IHRoaXMuY29udGVudC53YWl0Rm9ySW5wdXQoZmFsc2UpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUodWlkLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh0aGlzLmkxOG4ocGFyYW0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhbGxhYmxlKSB7XG4gICAgICAgICAgICBjb25zdCByZXQgPSBhd2FpdCB0aGlzLmNvbnRlbnQucXVldWVGdW5jdGlvbihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmV0MiA9IGF3YWl0IGNhbGxhYmxlKC4uLmFyZ3MpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXQyO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Zykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDQUxMQUJMRScsIHN0ZXBEby5jbWQsICdSRVRVUk5FRCcsIHJldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RlcERvLnZhcmlhYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWNvcmRbc3RlcERvLnZhcmlhYmxlXSA9IHJldDtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnNldENhbGxiYWNrKHN0ZXBEby52YXJpYWJsZSwgcmV0LCB0aGlzLnJlY29yZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYEVSUk9SOiBmdW5jdGlvbiAke3N0ZXBEby5jbWR9IGlzIG5vdCBkZWZpbmVkYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgYXN5bmMgcnVuU25pcHBldChzbmlwcGV0KSB7XG4gICAgICAgIGlmICh0aGlzLmRlYnVnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUlVOIFNOSVBQRVQnLCBzbmlwcGV0KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHN0ZXAgb2Ygc25pcHBldC5zdGVwcykge1xuICAgICAgICAgICAgY29uc3QgdWlkID0gdGhpcy5sYXN0TWVzc2FnZSArICctJyArIHN0ZXAudWlkO1xuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU1RFUDonLCBzdGVwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdGVwLmhhc093blByb3BlcnR5KCdzYXknKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLmZpbGxJbih0aGlzLmkxOG4oc3RlcC5zYXkpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RNZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuYWRkVG8obWVzc2FnZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0ZXAuaGFzT3duUHJvcGVydHkoJ3dhaXQnKSkge1xuICAgICAgICAgICAgICAgIGxldCByZXQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmICh1aWQgJiYgdGhpcy5maXhtZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuc2V0Rml4bWUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhclN0YXRlKHVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpeG1lKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc3RlcC53YWl0Lm9wdGlvbnNGcm9tKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0ZXAud2FpdC5vcHRpb25zID0gdGhpcy5yZWNvcmRbc3RlcC53YWl0Lm9wdGlvbnNGcm9tXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0ZXAud2FpdC5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2Ygc3RlcC53YWl0Lm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSA/IG9wdGlvbi52YWx1ZSA6IG9wdGlvbi5zaG93O1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gb3B0aW9uLnZhbHVlLmhhc093blByb3BlcnR5KCcudHgnKSA/IG9wdGlvbi52YWx1ZVsnLnR4J10uXyA6IG9wdGlvbi52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNPcHRpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogdGhpcy5pMThuKG9wdGlvbi5zaG93KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogb3B0aW9uLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkOiBvcHRpb24uZmllbGQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IG9wdGlvbi5jbGFzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlY2hvOiBvcHRpb24uZWNobyAhPT0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuYzogb3B0aW9uLmRvID8gKGFzeW5jICgpID0+IGF3YWl0IHRoaXMuZG9Db21tYW5kKG9wdGlvbi5kbykpIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uLnVubGVzcyAmJiB0aGlzLnJlY29yZFtvcHRpb24udW5sZXNzXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNPcHRpb24uY2xhc3MgPSAndW5sZXNzICcgKyAoY09wdGlvbi5jbGFzcyB8fCAnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goY09wdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbXVsdGkgPSAhIXN0ZXAud2FpdC5tdWx0aTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNJblN0YXRlKHVpZCkgJiYgdGhpcy5ydW5GYXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXQgPSB0aGlzLmdldFN0YXRlKHVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuYWRkT3B0aW9ucyhudWxsLCBvcHRpb25zLCByZXQsIG11bHRpKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJ1bkZhc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUlVOIEZBU1QgVFVSTkVEIE9GRicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmNvbnRlbnQucXVldWVGdW5jdGlvbihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zZXRRdWV1ZVRpbWVvdXQodGhpcy5USU1FT1VUKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5GYXN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuYWRkT3B0aW9ucyhudWxsLCBvcHRpb25zLCBudWxsLCBtdWx0aSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXQgPSBhd2FpdCB0aGlzLmNvbnRlbnQud2FpdEZvcklucHV0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUodWlkLCByZXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGVwLndhaXQudmFyaWFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVjb3JkW3N0ZXAud2FpdC52YXJpYWJsZV0gPSByZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnNldENhbGxiYWNrKHN0ZXAud2FpdC52YXJpYWJsZSwgcmV0LCB0aGlzLnJlY29yZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2Ygc3RlcC53YWl0Lm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXQgPT09IG9wdGlvbi52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJ1bkZhc3QgJiYgb3B0aW9uLmRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZG9Db21tYW5kKG9wdGlvbi5kbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb24uc3RlcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRoaXMucnVuU25pcHBldChvcHRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMgPSB0aGlzLmNoZWNrX3JlcyhyZXMsIHNuaXBwZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEhc3RlcC53YWl0LmxvbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zZXRUZXh0QXJlYSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zZXRJbnB1dEtpbmQoc3RlcC53YWl0WydpbnB1dC1raW5kJ10gfHwgJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcC53YWl0LnJlcXVpcmVkICE9PSBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXAud2FpdFsnaW5wdXQtbWluJ10sIHN0ZXAud2FpdFsnaW5wdXQtbWF4J10sIHN0ZXAud2FpdFsnaW5wdXQtc3RlcCddKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0ZXAud2FpdC5zdWdnZXN0aW9uc0Zyb20pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXAud2FpdC5zdWdnZXN0aW9ucyA9IHRoaXMucmVjb3JkW3N0ZXAud2FpdC5zdWdnZXN0aW9uc0Zyb21dO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zZXRJbnB1dFN1Z2dlc3Rpb25zKHN0ZXAud2FpdC5zdWdnZXN0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIXN0ZXAud2FpdC5wbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnNldFBsYWNlaG9sZGVyKHRoaXMuaTE4bihzdGVwLndhaXQucGxhY2Vob2xkZXIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoISFzdGVwLndhaXQudmFsaWRhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdnJlID0gbmV3IFJlZ0V4cCgnXicgKyBzdGVwLndhaXQudmFsaWRhdGlvbiArICckJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuc2V0VmFsaWRhdG9yKCh4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZyZS50ZXN0KHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuc2V0VmFsaWRhdG9yKCh4KSA9PiB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0luU3RhdGUodWlkKSAmJiB0aGlzLnJ1bkZhc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldCA9IHRoaXMuZ2V0U3RhdGUodWlkKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJ1bkZhc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUlVOIEZBU1QgVFVSTkVEIE9GRicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmNvbnRlbnQucXVldWVGdW5jdGlvbihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zZXRRdWV1ZVRpbWVvdXQodGhpcy5USU1FT1VUKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5GYXN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQucXVldWVGdW5jdGlvbihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnJlcG9ydFVwZGF0ZWQobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldCA9IGF3YWl0IHRoaXMuY29udGVudC53YWl0Rm9ySW5wdXQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHVpZCwgcmV0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY29yZFtzdGVwLndhaXQudmFyaWFibGVdID0gcmV0O1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzcG9uc2UgPSByZXQgKyAnJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0ZXAud2FpdC5yZXNwb25zZSAmJiBzdGVwLndhaXQucmVzcG9uc2UubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IHRoaXMuZmlsbEluKHN0ZXAud2FpdC5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVidWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBGT1JNQVRURUQgJHtKU09OLnN0cmluZ2lmeShyZXQpfSB0byBcIiR7cmVzcG9uc2V9XCIgKHVzaW5nICR7c3RlcC53YWl0LnJlc3BvbnNlfSlgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQucXVldWVGcm9tKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnNldENhbGxiYWNrKHN0ZXAud2FpdC52YXJpYWJsZSwgcmV0LCB0aGlzLnJlY29yZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zZXRGaXhtZShudWxsKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RlcC5oYXNPd25Qcm9wZXJ0eSgnZG8nKSkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZG9Db21tYW5kKHN0ZXAuZG8sIHVpZCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0ZXAuaGFzT3duUHJvcGVydHkoJ3N3aXRjaCcpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYXJnID0gc3RlcC5zd2l0Y2guYXJnO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXQodGhpcy5yZWNvcmQsIGFyZyk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVidWcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1NXSVRDSCBvbiB2YWx1ZScsIHZhbHVlLCAnKCcsIGFyZywgJywnLCB0aGlzLnJlY29yZCwgJyknKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gbnVsbDtcbiAgICAgICAgICAgICAgICBsZXQgZGVmYXVsdENhc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdGhlQ2FzZSBvZiBzdGVwLnN3aXRjaC5jYXNlcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0NBU0UnLCB0aGVDYXNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhlQ2FzZS5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDQVNFIERFRkFVTFQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRDYXNlID0gdGhlQ2FzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhlQ2FzZS5oYXNPd25Qcm9wZXJ0eSgnbWF0Y2gnKSAmJiB0aGVDYXNlLm1hdGNoID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSB0aGVDYXNlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoZUNhc2UuaGFzT3duUHJvcGVydHkoJ3BhdHRlcm4nKSAmJiBSZWdFeHAodGhlQ2FzZS5wYXR0ZXJuKS50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSB0aGVDYXNlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoZUNhc2UuaGFzT3duUHJvcGVydHkoJ3VuZGVmaW5lZCcpICYmIHRoZUNhc2UudW5kZWZpbmVkICYmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSB0aGVDYXNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDQVNFIFNFTEVDVEVEJywgc2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IHNlbGVjdGVkIHx8IGRlZmF1bHRDYXNlO1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQuc3RlcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCB0aGlzLnJ1blNuaXBwZXQoc2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzID0gdGhpcy5jaGVja19yZXMocmVzLCBzbmlwcGV0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEVSUk9SOiBubyB2aWFibGUgb3B0aW9uIGZvciAke3ZhbHVlfSAoJHtzdGVwLnN3aXRjaC5hcmd9KSBpbiBzd2l0Y2hgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0ZXAuaGFzT3duUHJvcGVydHkoJ2dvdG8nKSkge1xuICAgICAgICAgICAgICAgIGlmIChzdGVwLmdvdG8gPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuQ09NUExFVEU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzdGVwLmdvdG8gPT09ICdicmVhaycpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuQlJFQUs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzdGVwLmdvdG8gPT09ICdyZXR1cm4nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLlJFVFVSTiArIDI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGdvdG9TbmlwcGV0ID0gdGhpcy5zbmlwcGV0c1tzdGVwLmdvdG9dO1xuICAgICAgICAgICAgICAgIGlmIChnb3RvU25pcHBldCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgdGhpcy5ydW5TbmlwcGV0KGdvdG9TbmlwcGV0KTtcbiAgICAgICAgICAgICAgICAgICAgcmVzID0gdGhpcy5jaGVja19yZXMocmVzLCBzbmlwcGV0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBFUlJPUjogdW5rbm93biBzbmlwcGV0IHJlcXVlc3RlZCAke3N0ZXAuZ290b31gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0ZXAuaGFzT3duUHJvcGVydHkoJ3BvcCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdwb3A6JyArIHN0ZXAucG9wO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzQ3VzdG9tU3RlcChzdGVwKSkge1xuICAgICAgICAgICAgICAgIHN0ZXAuX19ydW5uZXIgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHN0ZXAuX19ydW5GYXN0ID0gdGhpcy5ydW5GYXN0O1xuICAgICAgICAgICAgICAgIGxldCByZXQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzSW5TdGF0ZSh1aWQpICYmIHRoaXMucnVuRmFzdCkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmNvbnRlbnQuYWRkQ3VzdG9tQ29tcG9uZW50KHN0ZXAsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gdGhpcy5nZXRTdGF0ZSh1aWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldCA9IGF3YWl0IHRoaXMuY29udGVudC5hZGRDdXN0b21Db21wb25lbnQoc3RlcCwgdHJ1ZSwgc3RlcC5fX2NvbXBvbmVudC50aW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh1aWQsIHJldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChyZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnF1ZXVlRnJvbShyZXQsIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBCYWQgc3RlcCAke0pTT04uc3RyaW5naWZ5KHN0ZXApfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLlJFVFVSTjtcbiAgICB9XG59XG4iXX0=