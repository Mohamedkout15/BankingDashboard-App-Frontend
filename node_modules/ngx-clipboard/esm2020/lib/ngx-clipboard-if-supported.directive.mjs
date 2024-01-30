import { Directive } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./ngx-clipboard.service";
export class ClipboardIfSupportedDirective {
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
ClipboardIfSupportedDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: ClipboardIfSupportedDirective, deps: [{ token: i1.ClipboardService }, { token: i0.ViewContainerRef }, { token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
ClipboardIfSupportedDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.1", type: ClipboardIfSupportedDirective, selector: "[ngxClipboardIfSupported]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: ClipboardIfSupportedDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngxClipboardIfSupported]'
                }]
        }], ctorParameters: function () { return [{ type: i1.ClipboardService }, { type: i0.ViewContainerRef }, { type: i0.TemplateRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNsaXBib2FyZC1pZi1zdXBwb3J0ZWQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWNsaXBib2FyZC9zcmMvbGliL25neC1jbGlwYm9hcmQtaWYtc3VwcG9ydGVkLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUF5QyxNQUFNLGVBQWUsQ0FBQzs7O0FBT2pGLE1BQU0sT0FBTyw2QkFBNkI7SUFDdEMsWUFDWSxpQkFBbUMsRUFDbkMsaUJBQW1DLEVBQ25DLFlBQThCO1FBRjlCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxpQkFBWSxHQUFaLFlBQVksQ0FBa0I7SUFDdkMsQ0FBQztJQUVKLFFBQVE7UUFDSixJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUU7WUFDcEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNoRTtJQUNMLENBQUM7OzBIQVhRLDZCQUE2Qjs4R0FBN0IsNkJBQTZCOzJGQUE3Qiw2QkFBNkI7a0JBSHpDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLDJCQUEyQjtpQkFDeEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIE9uSW5pdCwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2xpcGJvYXJkU2VydmljZSB9IGZyb20gJy4vbmd4LWNsaXBib2FyZC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbmd4Q2xpcGJvYXJkSWZTdXBwb3J0ZWRdJ1xufSlcbmV4cG9ydCBjbGFzcyBDbGlwYm9hcmRJZlN1cHBvcnRlZERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2NsaXBib2FyZFNlcnZpY2U6IENsaXBib2FyZFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIHByaXZhdGUgX3RlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+XG4gICAgKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jbGlwYm9hcmRTZXJ2aWNlLmlzU3VwcG9ydGVkKSB7XG4gICAgICAgICAgICB0aGlzLl92aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLl90ZW1wbGF0ZVJlZik7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=