import { DOCUMENT, CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Injectable, Inject, Optional, EventEmitter, Directive, Input, Output, NgModule } from '@angular/core';
import { WINDOW } from 'ngx-window-token';
import { Subject } from 'rxjs';

/**
 * The following code is heavily copied from https://github.com/zenorocha/clipboard.js
 */
class ClipboardService {
    constructor(ngZone, document, window) {
        this.ngZone = ngZone;
        this.document = document;
        this.window = window;
        this.copySubject = new Subject();
        this.copyResponse$ = this.copySubject.asObservable();
        this.config = {};
    }
    configure(config) {
        this.config = config;
    }
    copy(content) {
        if (!this.isSupported || !content) {
            return this.pushCopyResponse({ isSuccess: false, content });
        }
        const copyResult = this.copyFromContent(content);
        if (copyResult) {
            return this.pushCopyResponse({ content, isSuccess: copyResult });
        }
        return this.pushCopyResponse({ isSuccess: false, content });
    }
    get isSupported() {
        return !!this.document.queryCommandSupported && !!this.document.queryCommandSupported('copy') && !!this.window;
    }
    isTargetValid(element) {
        if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
            if (element.hasAttribute('disabled')) {
                throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
            }
            return true;
        }
        throw new Error('Target should be input or textarea');
    }
    /**
     * Attempts to copy from an input `targetElm`
     */
    copyFromInputElement(targetElm, isFocus = true) {
        try {
            this.selectTarget(targetElm);
            const re = this.copyText();
            this.clearSelection(isFocus ? targetElm : undefined, this.window);
            return re && this.isCopySuccessInIE11();
        }
        catch (error) {
            return false;
        }
    }
    /**
     * This is a hack for IE11 to return `true` even if copy fails.
     */
    isCopySuccessInIE11() {
        const clipboardData = this.window['clipboardData'];
        if (clipboardData && clipboardData.getData) {
            if (!clipboardData.getData('Text')) {
                return false;
            }
        }
        return true;
    }
    /**
     * Creates a fake textarea element, sets its value from `text` property,
     * and makes a selection on it.
     */
    copyFromContent(content, container = this.document.body) {
        // check if the temp textarea still belongs to the current container.
        // In case we have multiple places using ngx-clipboard, one is in a modal using container but the other one is not.
        if (this.tempTextArea && !container.contains(this.tempTextArea)) {
            this.destroy(this.tempTextArea.parentElement || undefined);
        }
        if (!this.tempTextArea) {
            this.tempTextArea = this.createTempTextArea(this.document, this.window);
            try {
                container.appendChild(this.tempTextArea);
            }
            catch (error) {
                throw new Error('Container should be a Dom element');
            }
        }
        this.tempTextArea.value = content;
        const toReturn = this.copyFromInputElement(this.tempTextArea, false);
        if (this.config.cleanUpAfterCopy) {
            this.destroy(this.tempTextArea.parentElement || undefined);
        }
        return toReturn;
    }
    /**
     * Remove temporary textarea if any exists.
     */
    destroy(container = this.document.body) {
        if (this.tempTextArea) {
            container.removeChild(this.tempTextArea);
            // removeChild doesn't remove the reference from memory
            this.tempTextArea = undefined;
        }
    }
    /**
     * Select the target html input element.
     */
    selectTarget(inputElement) {
        inputElement.select();
        inputElement.setSelectionRange(0, inputElement.value.length);
        return inputElement.value.length;
    }
    copyText() {
        return this.document.execCommand('copy');
    }
    /**
     * Moves focus away from `target` and back to the trigger, removes current selection.
     */
    clearSelection(inputElement, window) {
        var _a;
        inputElement && inputElement.focus();
        (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.removeAllRanges();
    }
    /**
     * Creates a fake textarea for copy command.
     */
    createTempTextArea(doc, window) {
        const isRTL = doc.documentElement.getAttribute('dir') === 'rtl';
        let ta;
        ta = doc.createElement('textarea');
        // Prevent zooming on iOS
        ta.style.fontSize = '12pt';
        // Reset box model
        ta.style.border = '0';
        ta.style.padding = '0';
        ta.style.margin = '0';
        // Move element out of screen horizontally
        ta.style.position = 'absolute';
        ta.style[isRTL ? 'right' : 'left'] = '-9999px';
        // Move element to the same position vertically
        const yPosition = window.pageYOffset || doc.documentElement.scrollTop;
        ta.style.top = yPosition + 'px';
        ta.setAttribute('readonly', '');
        return ta;
    }
    /**
     * Pushes copy operation response to copySubject, to provide global access
     * to the response.
     */
    pushCopyResponse(response) {
        if (this.copySubject.observers.length > 0) {
            this.ngZone.run(() => {
                this.copySubject.next(response);
            });
        }
    }
    /**
     * @deprecated use pushCopyResponse instead.
     */
    pushCopyReponse(response) {
        this.pushCopyResponse(response);
    }
}
ClipboardService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: ClipboardService, deps: [{ token: i0.NgZone }, { token: DOCUMENT }, { token: WINDOW, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
ClipboardService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: ClipboardService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: ClipboardService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () {
        return [{ type: i0.NgZone }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [DOCUMENT]
                    }] }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [WINDOW]
                    }] }];
    } });

class ClipboardDirective {
    constructor(ngZone, host, renderer, clipboardSrv) {
        this.ngZone = ngZone;
        this.host = host;
        this.renderer = renderer;
        this.clipboardSrv = clipboardSrv;
        this.cbOnSuccess = new EventEmitter();
        this.cbOnError = new EventEmitter();
        this.onClick = (event) => {
            if (!this.clipboardSrv.isSupported) {
                this.handleResult(false, undefined, event);
            }
            else if (this.targetElm && this.clipboardSrv.isTargetValid(this.targetElm)) {
                this.handleResult(this.clipboardSrv.copyFromInputElement(this.targetElm), this.targetElm.value, event);
            }
            else if (this.cbContent) {
                this.handleResult(this.clipboardSrv.copyFromContent(this.cbContent, this.container), this.cbContent, event);
            }
        };
    }
    // eslint-disable-next-line no-empty, @typescript-eslint/no-empty-function
    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            // By default each host listener schedules change detection and also wrapped
            // into additional function that calls `markForCheck()`. We're listening the `click`
            // event in the context of the root zone to avoid running unnecessary change detections,
            // since this directive doesn't do anything template-related (e.g. updates template variables).
            this.clickListener = this.renderer.listen(this.host.nativeElement, 'click', this.onClick);
        });
    }
    ngOnDestroy() {
        if (this.clickListener) {
            this.clickListener();
        }
        this.clipboardSrv.destroy(this.container);
    }
    /**
     * Fires an event based on the copy operation result.
     * @param succeeded
     */
    handleResult(succeeded, copiedContent, event) {
        let response = {
            isSuccess: succeeded,
            event
        };
        if (succeeded) {
            if (this.cbOnSuccess.observers.length > 0) {
                response = Object.assign(response, {
                    content: copiedContent,
                    successMessage: this.cbSuccessMsg
                });
                this.ngZone.run(() => {
                    this.cbOnSuccess.emit(response);
                });
            }
        }
        else {
            if (this.cbOnError.observers.length > 0) {
                this.ngZone.run(() => {
                    this.cbOnError.emit(response);
                });
            }
        }
        this.clipboardSrv.pushCopyResponse(response);
    }
}
ClipboardDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: ClipboardDirective, deps: [{ token: i0.NgZone }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: ClipboardService }], target: i0.ɵɵFactoryTarget.Directive });
ClipboardDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.1", type: ClipboardDirective, selector: "[ngxClipboard]", inputs: { targetElm: ["ngxClipboard", "targetElm"], container: "container", cbContent: "cbContent", cbSuccessMsg: "cbSuccessMsg" }, outputs: { cbOnSuccess: "cbOnSuccess", cbOnError: "cbOnError" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: ClipboardDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[ngxClipboard]' }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: ClipboardService }]; }, propDecorators: { targetElm: [{
                type: Input,
                args: ['ngxClipboard']
            }], container: [{
                type: Input
            }], cbContent: [{
                type: Input
            }], cbSuccessMsg: [{
                type: Input
            }], cbOnSuccess: [{
                type: Output
            }], cbOnError: [{
                type: Output
            }] } });

class ClipboardIfSupportedDirective {
    constructor(_clipboardService, _viewContainerRef, _templateRef) {
        this._clipboardService = _clipboardService;
        this._viewContainerRef = _viewContainerRef;
        this._templateRef = _templateRef;
    }
    ngOnInit() {
        if (this._clipboardService.isSupported) {
            this._viewContainerRef.createEmbeddedView(this._templateRef);
        }
    }
}
ClipboardIfSupportedDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: ClipboardIfSupportedDirective, deps: [{ token: ClipboardService }, { token: i0.ViewContainerRef }, { token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
ClipboardIfSupportedDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.1", type: ClipboardIfSupportedDirective, selector: "[ngxClipboardIfSupported]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: ClipboardIfSupportedDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngxClipboardIfSupported]'
                }]
        }], ctorParameters: function () { return [{ type: ClipboardService }, { type: i0.ViewContainerRef }, { type: i0.TemplateRef }]; } });

class ClipboardModule {
}
ClipboardModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: ClipboardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ClipboardModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: ClipboardModule, declarations: [ClipboardDirective, ClipboardIfSupportedDirective], imports: [CommonModule], exports: [ClipboardDirective, ClipboardIfSupportedDirective] });
ClipboardModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: ClipboardModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: ClipboardModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [ClipboardDirective, ClipboardIfSupportedDirective],
                    exports: [ClipboardDirective, ClipboardIfSupportedDirective]
                }]
        }] });

/*
 * Public API Surface of ngx-clipboard
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ClipboardDirective, ClipboardIfSupportedDirective, ClipboardModule, ClipboardService };
//# sourceMappingURL=ngx-clipboard.mjs.map
