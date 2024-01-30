import { Directive, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./ngx-clipboard.service";
export class ClipboardDirective {
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
ClipboardDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: ClipboardDirective, deps: [{ token: i0.NgZone }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.ClipboardService }], target: i0.ɵɵFactoryTarget.Directive });
ClipboardDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.1", type: ClipboardDirective, selector: "[ngxClipboard]", inputs: { targetElm: ["ngxClipboard", "targetElm"], container: "container", cbContent: "cbContent", cbSuccessMsg: "cbSuccessMsg" }, outputs: { cbOnSuccess: "cbOnSuccess", cbOnError: "cbOnError" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: ClipboardDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[ngxClipboard]' }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.ClipboardService }]; }, propDecorators: { targetElm: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNsaXBib2FyZC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtY2xpcGJvYXJkL3NyYy9saWIvbmd4LWNsaXBib2FyZC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsRUFFVCxZQUFZLEVBQ1osS0FBSyxFQUlMLE1BQU0sRUFFVCxNQUFNLGVBQWUsQ0FBQzs7O0FBTXZCLE1BQU0sT0FBTyxrQkFBa0I7SUFzQjNCLFlBQ1ksTUFBYyxFQUNkLElBQTZCLEVBQzdCLFFBQW1CLEVBQ25CLFlBQThCO1FBSDlCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxTQUFJLEdBQUosSUFBSSxDQUF5QjtRQUM3QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLGlCQUFZLEdBQVosWUFBWSxDQUFrQjtRQVhuQyxnQkFBVyxHQUFxQyxJQUFJLFlBQVksRUFBc0IsQ0FBQztRQUd2RixjQUFTLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUE2QnRELFlBQU8sR0FBRyxDQUFDLEtBQWlCLEVBQVEsRUFBRTtZQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUM5QztpQkFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUMxRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQzFHO2lCQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQy9HO1FBQ0wsQ0FBQyxDQUFDO0lBNUJDLENBQUM7SUFFSiwwRUFBMEU7SUFDbkUsUUFBUTtRQUNYLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO1lBQy9CLDRFQUE0RTtZQUM1RSxvRkFBb0Y7WUFDcEYsd0ZBQXdGO1lBQ3hGLCtGQUErRjtZQUMvRixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUYsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sV0FBVztRQUNkLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNwQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQVlEOzs7T0FHRztJQUNLLFlBQVksQ0FBQyxTQUFrQixFQUFFLGFBQWlDLEVBQUUsS0FBaUI7UUFDekYsSUFBSSxRQUFRLEdBQXVCO1lBQy9CLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLEtBQUs7U0FDUixDQUFDO1FBRUYsSUFBSSxTQUFTLEVBQUU7WUFDWCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3ZDLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtvQkFDL0IsT0FBTyxFQUFFLGFBQWE7b0JBQ3RCLGNBQWMsRUFBRSxJQUFJLENBQUMsWUFBWTtpQkFDcEMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRTtvQkFDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3BDLENBQUMsQ0FBQyxDQUFDO2FBQ047U0FDSjthQUFNO1lBQ0gsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNsQyxDQUFDLENBQUMsQ0FBQzthQUNOO1NBQ0o7UUFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pELENBQUM7OytHQXRGUSxrQkFBa0I7bUdBQWxCLGtCQUFrQjsyRkFBbEIsa0JBQWtCO2tCQUQ5QixTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFOzZLQUs5QixTQUFTO3NCQURmLEtBQUs7dUJBQUMsY0FBYztnQkFHZCxTQUFTO3NCQURmLEtBQUs7Z0JBSUMsU0FBUztzQkFEZixLQUFLO2dCQUlDLFlBQVk7c0JBRGxCLEtBQUs7Z0JBSUMsV0FBVztzQkFEakIsTUFBTTtnQkFJQSxTQUFTO3NCQURmLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBJQ2xpcGJvYXJkUmVzcG9uc2UgfSBmcm9tICcuL2ludGVyZmFjZSc7XG5pbXBvcnQgeyBDbGlwYm9hcmRTZXJ2aWNlIH0gZnJvbSAnLi9uZ3gtY2xpcGJvYXJkLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbmd4Q2xpcGJvYXJkXScgfSlcbmV4cG9ydCBjbGFzcyBDbGlwYm9hcmREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21heGlzYW0vbmd4LWNsaXBib2FyZC9pc3N1ZXMvMjM5I2lzc3VlY29tbWVudC02MjMzMzA2MjRcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0LXJlbmFtZVxuICAgIEBJbnB1dCgnbmd4Q2xpcGJvYXJkJylcbiAgICBwdWJsaWMgdGFyZ2V0RWxtOiBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFRleHRBcmVhRWxlbWVudCB8IHVuZGVmaW5lZCB8ICcnO1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBjYkNvbnRlbnQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGNiU3VjY2Vzc01zZzogc3RyaW5nO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIGNiT25TdWNjZXNzOiBFdmVudEVtaXR0ZXI8SUNsaXBib2FyZFJlc3BvbnNlPiA9IG5ldyBFdmVudEVtaXR0ZXI8SUNsaXBib2FyZFJlc3BvbnNlPigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIGNiT25FcnJvcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIHByaXZhdGUgY2xpY2tMaXN0ZW5lcjogKCkgPT4gdm9pZDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgICBwcml2YXRlIGhvc3Q6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIHByaXZhdGUgY2xpcGJvYXJkU3J2OiBDbGlwYm9hcmRTZXJ2aWNlXG4gICAgKSB7fVxuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVtcHR5LCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb25cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIC8vIEJ5IGRlZmF1bHQgZWFjaCBob3N0IGxpc3RlbmVyIHNjaGVkdWxlcyBjaGFuZ2UgZGV0ZWN0aW9uIGFuZCBhbHNvIHdyYXBwZWRcbiAgICAgICAgICAgIC8vIGludG8gYWRkaXRpb25hbCBmdW5jdGlvbiB0aGF0IGNhbGxzIGBtYXJrRm9yQ2hlY2soKWAuIFdlJ3JlIGxpc3RlbmluZyB0aGUgYGNsaWNrYFxuICAgICAgICAgICAgLy8gZXZlbnQgaW4gdGhlIGNvbnRleHQgb2YgdGhlIHJvb3Qgem9uZSB0byBhdm9pZCBydW5uaW5nIHVubmVjZXNzYXJ5IGNoYW5nZSBkZXRlY3Rpb25zLFxuICAgICAgICAgICAgLy8gc2luY2UgdGhpcyBkaXJlY3RpdmUgZG9lc24ndCBkbyBhbnl0aGluZyB0ZW1wbGF0ZS1yZWxhdGVkIChlLmcuIHVwZGF0ZXMgdGVtcGxhdGUgdmFyaWFibGVzKS5cbiAgICAgICAgICAgIHRoaXMuY2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LCAnY2xpY2snLCB0aGlzLm9uQ2xpY2spO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmNsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xpcGJvYXJkU3J2LmRlc3Ryb3kodGhpcy5jb250YWluZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25DbGljayA9IChldmVudDogTW91c2VFdmVudCk6IHZvaWQgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuY2xpcGJvYXJkU3J2LmlzU3VwcG9ydGVkKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdChmYWxzZSwgdW5kZWZpbmVkLCBldmVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50YXJnZXRFbG0gJiYgdGhpcy5jbGlwYm9hcmRTcnYuaXNUYXJnZXRWYWxpZCh0aGlzLnRhcmdldEVsbSkpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlUmVzdWx0KHRoaXMuY2xpcGJvYXJkU3J2LmNvcHlGcm9tSW5wdXRFbGVtZW50KHRoaXMudGFyZ2V0RWxtKSwgdGhpcy50YXJnZXRFbG0udmFsdWUsIGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNiQ29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVSZXN1bHQodGhpcy5jbGlwYm9hcmRTcnYuY29weUZyb21Db250ZW50KHRoaXMuY2JDb250ZW50LCB0aGlzLmNvbnRhaW5lciksIHRoaXMuY2JDb250ZW50LCBldmVudCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRmlyZXMgYW4gZXZlbnQgYmFzZWQgb24gdGhlIGNvcHkgb3BlcmF0aW9uIHJlc3VsdC5cbiAgICAgKiBAcGFyYW0gc3VjY2VlZGVkXG4gICAgICovXG4gICAgcHJpdmF0ZSBoYW5kbGVSZXN1bHQoc3VjY2VlZGVkOiBib29sZWFuLCBjb3BpZWRDb250ZW50OiBzdHJpbmcgfCB1bmRlZmluZWQsIGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIGxldCByZXNwb25zZTogSUNsaXBib2FyZFJlc3BvbnNlID0ge1xuICAgICAgICAgICAgaXNTdWNjZXNzOiBzdWNjZWVkZWQsXG4gICAgICAgICAgICBldmVudFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChzdWNjZWVkZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNiT25TdWNjZXNzLm9ic2VydmVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBPYmplY3QuYXNzaWduKHJlc3BvbnNlLCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGNvcGllZENvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NNZXNzYWdlOiB0aGlzLmNiU3VjY2Vzc01zZ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2JPblN1Y2Nlc3MuZW1pdChyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jYk9uRXJyb3Iub2JzZXJ2ZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNiT25FcnJvci5lbWl0KHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2xpcGJvYXJkU3J2LnB1c2hDb3B5UmVzcG9uc2UocmVzcG9uc2UpO1xuICAgIH1cbn1cbiJdfQ==