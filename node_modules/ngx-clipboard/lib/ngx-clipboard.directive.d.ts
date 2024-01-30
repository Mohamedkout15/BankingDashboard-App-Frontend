import { ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { IClipboardResponse } from './interface';
import { ClipboardService } from './ngx-clipboard.service';
import * as i0 from "@angular/core";
export declare class ClipboardDirective implements OnInit, OnDestroy {
    private ngZone;
    private host;
    private renderer;
    private clipboardSrv;
    targetElm: HTMLInputElement | HTMLTextAreaElement | undefined | '';
    container: HTMLElement;
    cbContent: string | undefined;
    cbSuccessMsg: string;
    cbOnSuccess: EventEmitter<IClipboardResponse>;
    cbOnError: EventEmitter<any>;
    private clickListener;
    constructor(ngZone: NgZone, host: ElementRef<HTMLElement>, renderer: Renderer2, clipboardSrv: ClipboardService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private onClick;
    /**
     * Fires an event based on the copy operation result.
     * @param succeeded
     */
    private handleResult;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClipboardDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ClipboardDirective, "[ngxClipboard]", never, { "targetElm": "ngxClipboard"; "container": "container"; "cbContent": "cbContent"; "cbSuccessMsg": "cbSuccessMsg"; }, { "cbOnSuccess": "cbOnSuccess"; "cbOnError": "cbOnError"; }, never>;
}
