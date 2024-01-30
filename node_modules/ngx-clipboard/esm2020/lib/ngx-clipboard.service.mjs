import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { WINDOW } from 'ngx-window-token';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * The following code is heavily copied from https://github.com/zenorocha/clipboard.js
 */
export class ClipboardService {
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
        inputElement && inputElement.focus();
        window.getSelection()?.removeAllRanges();
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
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [WINDOW]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNsaXBib2FyZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWNsaXBib2FyZC9zcmMvbGliL25neC1jbGlwYm9hcmQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQVUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMxQyxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUkzQzs7R0FFRztBQUVILE1BQU0sT0FBTyxnQkFBZ0I7SUFNekIsWUFDWSxNQUFjLEVBQ0csUUFBYSxFQUNGLE1BQVc7UUFGdkMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNHLGFBQVEsR0FBUixRQUFRLENBQUs7UUFDRixXQUFNLEdBQU4sTUFBTSxDQUFLO1FBUjNDLGdCQUFXLEdBQUcsSUFBSSxPQUFPLEVBQXNCLENBQUM7UUFDakQsa0JBQWEsR0FBbUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUUvRSxXQUFNLEdBQW9CLEVBQUUsQ0FBQztJQU1sQyxDQUFDO0lBRUcsU0FBUyxDQUFDLE1BQXVCO1FBQ3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFFTSxJQUFJLENBQUMsT0FBZTtRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUMvQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUMvRDtRQUNELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxD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QyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxlQUFlLENBQUMsUUFBNEI7UUFDL0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7OzZHQXhLUSxnQkFBZ0Isd0NBUWIsUUFBUSxhQUNJLE1BQU07aUhBVHJCLGdCQUFnQixjQURILE1BQU07MkZBQ25CLGdCQUFnQjtrQkFENUIsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7OzBCQVN6QixNQUFNOzJCQUFDLFFBQVE7OzBCQUNmLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgTmdab25lLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV0lORE9XIH0gZnJvbSAnbmd4LXdpbmRvdy10b2tlbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IENsaXBib2FyZFBhcmFtcywgSUNsaXBib2FyZFJlc3BvbnNlIH0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuXG4vKipcbiAqIFRoZSBmb2xsb3dpbmcgY29kZSBpcyBoZWF2aWx5IGNvcGllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS96ZW5vcm9jaGEvY2xpcGJvYXJkLmpzXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQ2xpcGJvYXJkU2VydmljZSB7XG4gICAgcHJpdmF0ZSBjb3B5U3ViamVjdCA9IG5ldyBTdWJqZWN0PElDbGlwYm9hcmRSZXNwb25zZT4oKTtcbiAgICBwdWJsaWMgY29weVJlc3BvbnNlJDogT2JzZXJ2YWJsZTxJQ2xpcGJvYXJkUmVzcG9uc2U+ID0gdGhpcy5jb3B5U3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgICBwcml2YXRlIHRlbXBUZXh0QXJlYTogSFRNTFRleHRBcmVhRWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgICBwcml2YXRlIGNvbmZpZzogQ2xpcGJvYXJkUGFyYW1zID0ge307XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgQEluamVjdChET0NVTUVOVCkgcHVibGljIGRvY3VtZW50OiBhbnksXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoV0lORE9XKSBwcml2YXRlIHdpbmRvdzogYW55XG4gICAgKSB7fVxuXG4gICAgcHVibGljIGNvbmZpZ3VyZShjb25maWc6IENsaXBib2FyZFBhcmFtcykge1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG5cbiAgICBwdWJsaWMgY29weShjb250ZW50OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkIHx8ICFjb250ZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoQ29weVJlc3BvbnNlKHsgaXNTdWNjZXNzOiBmYWxzZSwgY29udGVudCB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb3B5UmVzdWx0ID0gdGhpcy5jb3B5RnJvbUNvbnRlbnQoY29udGVudCk7XG4gICAgICAgIGlmIChjb3B5UmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoQ29weVJlc3BvbnNlKHsgY29udGVudCwgaXNTdWNjZXNzOiBjb3B5UmVzdWx0IH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnB1c2hDb3B5UmVzcG9uc2UoeyBpc1N1Y2Nlc3M6IGZhbHNlLCBjb250ZW50IH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgaXNTdXBwb3J0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuZG9jdW1lbnQucXVlcnlDb21tYW5kU3VwcG9ydGVkICYmICEhdGhpcy5kb2N1bWVudC5xdWVyeUNvbW1hbmRTdXBwb3J0ZWQoJ2NvcHknKSAmJiAhIXRoaXMud2luZG93O1xuICAgIH1cblxuICAgIHB1YmxpYyBpc1RhcmdldFZhbGlkKGVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MVGV4dEFyZWFFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCB8fCBlbGVtZW50IGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFwidGFyZ2V0XCIgYXR0cmlidXRlLiBQbGVhc2UgdXNlIFwicmVhZG9ubHlcIiBpbnN0ZWFkIG9mIFwiZGlzYWJsZWRcIiBhdHRyaWJ1dGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGFyZ2V0IHNob3VsZCBiZSBpbnB1dCBvciB0ZXh0YXJlYScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEF0dGVtcHRzIHRvIGNvcHkgZnJvbSBhbiBpbnB1dCBgdGFyZ2V0RWxtYFxuICAgICAqL1xuICAgIHB1YmxpYyBjb3B5RnJvbUlucHV0RWxlbWVudCh0YXJnZXRFbG06IEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MVGV4dEFyZWFFbGVtZW50LCBpc0ZvY3VzID0gdHJ1ZSk6IGJvb2xlYW4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RUYXJnZXQodGFyZ2V0RWxtKTtcbiAgICAgICAgICAgIGNvbnN0IHJlID0gdGhpcy5jb3B5VGV4dCgpO1xuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbihpc0ZvY3VzID8gdGFyZ2V0RWxtIDogdW5kZWZpbmVkLCB0aGlzLndpbmRvdyk7XG4gICAgICAgICAgICByZXR1cm4gcmUgJiYgdGhpcy5pc0NvcHlTdWNjZXNzSW5JRTExKCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIGEgaGFjayBmb3IgSUUxMSB0byByZXR1cm4gYHRydWVgIGV2ZW4gaWYgY29weSBmYWlscy5cbiAgICAgKi9cbiAgICBwdWJsaWMgaXNDb3B5U3VjY2Vzc0luSUUxMSgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgY2xpcGJvYXJkRGF0YSA9IHRoaXMud2luZG93WydjbGlwYm9hcmREYXRhJ107XG4gICAgICAgIGlmIChjbGlwYm9hcmREYXRhICYmIGNsaXBib2FyZERhdGEuZ2V0RGF0YSkge1xuICAgICAgICAgICAgaWYgKCFjbGlwYm9hcmREYXRhLmdldERhdGEoJ1RleHQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgZmFrZSB0ZXh0YXJlYSBlbGVtZW50LCBzZXRzIGl0cyB2YWx1ZSBmcm9tIGB0ZXh0YCBwcm9wZXJ0eSxcbiAgICAgKiBhbmQgbWFrZXMgYSBzZWxlY3Rpb24gb24gaXQuXG4gICAgICovXG4gICAgcHVibGljIGNvcHlGcm9tQ29udGVudChjb250ZW50OiBzdHJpbmcsIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQgPSB0aGlzLmRvY3VtZW50LmJvZHkpOiBib29sZWFuIHtcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHRlbXAgdGV4dGFyZWEgc3RpbGwgYmVsb25ncyB0byB0aGUgY3VycmVudCBjb250YWluZXIuXG4gICAgICAgIC8vIEluIGNhc2Ugd2UgaGF2ZSBtdWx0aXBsZSBwbGFjZXMgdXNpbmcgbmd4LWNsaXBib2FyZCwgb25lIGlzIGluIGEgbW9kYWwgdXNpbmcgY29udGFpbmVyIGJ1dCB0aGUgb3RoZXIgb25lIGlzIG5vdC5cbiAgICAgICAgaWYgKHRoaXMudGVtcFRleHRBcmVhICYmICFjb250YWluZXIuY29udGFpbnModGhpcy50ZW1wVGV4dEFyZWEpKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3kodGhpcy50ZW1wVGV4dEFyZWEucGFyZW50RWxlbWVudCB8fCB1bmRlZmluZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnRlbXBUZXh0QXJlYSkge1xuICAgICAgICAgICAgdGhpcy50ZW1wVGV4dEFyZWEgPSB0aGlzLmNyZWF0ZVRlbXBUZXh0QXJlYSh0aGlzLmRvY3VtZW50LCB0aGlzLndpbmRvdyk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnRlbXBUZXh0QXJlYSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ29udGFpbmVyIHNob3VsZCBiZSBhIERvbSBlbGVtZW50Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50ZW1wVGV4dEFyZWEudmFsdWUgPSBjb250ZW50O1xuXG4gICAgICAgIGNvbnN0IHRvUmV0dXJuID0gdGhpcy5jb3B5RnJvbUlucHV0RWxlbWVudCh0aGlzLnRlbXBUZXh0QXJlYSwgZmFsc2UpO1xuICAgICAgICBpZiAodGhpcy5jb25maWcuY2xlYW5VcEFmdGVyQ29weSkge1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95KHRoaXMudGVtcFRleHRBcmVhLnBhcmVudEVsZW1lbnQgfHwgdW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9SZXR1cm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIHRlbXBvcmFyeSB0ZXh0YXJlYSBpZiBhbnkgZXhpc3RzLlxuICAgICAqL1xuICAgIHB1YmxpYyBkZXN0cm95KGNvbnRhaW5lcjogSFRNTEVsZW1lbnQgPSB0aGlzLmRvY3VtZW50LmJvZHkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudGVtcFRleHRBcmVhKSB7XG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQodGhpcy50ZW1wVGV4dEFyZWEpO1xuICAgICAgICAgICAgLy8gcmVtb3ZlQ2hpbGQgZG9lc24ndCByZW1vdmUgdGhlIHJlZmVyZW5jZSBmcm9tIG1lbW9yeVxuICAgICAgICAgICAgdGhpcy50ZW1wVGV4dEFyZWEgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWxlY3QgdGhlIHRhcmdldCBodG1sIGlucHV0IGVsZW1lbnQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZWxlY3RUYXJnZXQoaW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFRleHRBcmVhRWxlbWVudCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlucHV0RWxlbWVudC5zZWxlY3QoKTtcbiAgICAgICAgaW5wdXRFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKDAsIGlucHV0RWxlbWVudC52YWx1ZS5sZW5ndGgpO1xuICAgICAgICByZXR1cm4gaW5wdXRFbGVtZW50LnZhbHVlLmxlbmd0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvcHlUZXh0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdmVzIGZvY3VzIGF3YXkgZnJvbSBgdGFyZ2V0YCBhbmQgYmFjayB0byB0aGUgdHJpZ2dlciwgcmVtb3ZlcyBjdXJyZW50IHNlbGVjdGlvbi5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNsZWFyU2VsZWN0aW9uKGlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudCB8IEhUTUxUZXh0QXJlYUVsZW1lbnQgfCB1bmRlZmluZWQsIHdpbmRvdzogV2luZG93KTogdm9pZCB7XG4gICAgICAgIGlucHV0RWxlbWVudCAmJiBpbnB1dEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgd2luZG93LmdldFNlbGVjdGlvbigpPy5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgZmFrZSB0ZXh0YXJlYSBmb3IgY29weSBjb21tYW5kLlxuICAgICAqL1xuICAgIHByaXZhdGUgY3JlYXRlVGVtcFRleHRBcmVhKGRvYzogRG9jdW1lbnQsIHdpbmRvdzogV2luZG93KTogSFRNTFRleHRBcmVhRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IGlzUlRMID0gZG9jLmRvY3VtZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RpcicpID09PSAncnRsJztcbiAgICAgICAgbGV0IHRhOiBIVE1MVGV4dEFyZWFFbGVtZW50O1xuICAgICAgICB0YSA9IGRvYy5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgICAgICAvLyBQcmV2ZW50IHpvb21pbmcgb24gaU9TXG4gICAgICAgIHRhLnN0eWxlLmZvbnRTaXplID0gJzEycHQnO1xuICAgICAgICAvLyBSZXNldCBib3ggbW9kZWxcbiAgICAgICAgdGEuc3R5bGUuYm9yZGVyID0gJzAnO1xuICAgICAgICB0YS5zdHlsZS5wYWRkaW5nID0gJzAnO1xuICAgICAgICB0YS5zdHlsZS5tYXJnaW4gPSAnMCc7XG4gICAgICAgIC8vIE1vdmUgZWxlbWVudCBvdXQgb2Ygc2NyZWVuIGhvcml6b250YWxseVxuICAgICAgICB0YS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIHRhLnN0eWxlW2lzUlRMID8gJ3JpZ2h0JyA6ICdsZWZ0J10gPSAnLTk5OTlweCc7XG4gICAgICAgIC8vIE1vdmUgZWxlbWVudCB0byB0aGUgc2FtZSBwb3NpdGlvbiB2ZXJ0aWNhbGx5XG4gICAgICAgIGNvbnN0IHlQb3NpdGlvbiA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2MuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgICAgdGEuc3R5bGUudG9wID0geVBvc2l0aW9uICsgJ3B4JztcbiAgICAgICAgdGEuc2V0QXR0cmlidXRlKCdyZWFkb25seScsICcnKTtcbiAgICAgICAgcmV0dXJuIHRhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFB1c2hlcyBjb3B5IG9wZXJhdGlvbiByZXNwb25zZSB0byBjb3B5U3ViamVjdCwgdG8gcHJvdmlkZSBnbG9iYWwgYWNjZXNzXG4gICAgICogdG8gdGhlIHJlc3BvbnNlLlxuICAgICAqL1xuICAgIHB1YmxpYyBwdXNoQ29weVJlc3BvbnNlKHJlc3BvbnNlOiBJQ2xpcGJvYXJkUmVzcG9uc2UpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY29weVN1YmplY3Qub2JzZXJ2ZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3B5U3ViamVjdC5uZXh0KHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlcHJlY2F0ZWQgdXNlIHB1c2hDb3B5UmVzcG9uc2UgaW5zdGVhZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgcHVzaENvcHlSZXBvbnNlKHJlc3BvbnNlOiBJQ2xpcGJvYXJkUmVzcG9uc2UpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wdXNoQ29weVJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICB9XG59XG4iXX0=