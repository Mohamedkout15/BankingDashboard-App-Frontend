import { OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { ClipboardService } from './ngx-clipboard.service';
import * as i0 from "@angular/core";
export declare class ClipboardIfSupportedDirective implements OnInit {
    private _clipboardService;
    private _viewContainerRef;
    private _templateRef;
    constructor(_clipboardService: ClipboardService, _viewContainerRef: ViewContainerRef, _templateRef: TemplateRef<any>);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClipboardIfSupportedDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ClipboardIfSupportedDirective, "[ngxClipboardIfSupported]", never, {}, {}, never>;
}
