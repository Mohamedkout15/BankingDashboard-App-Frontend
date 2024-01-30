import { InjectionToken } from '@angular/core';

const WINDOW = new InjectionToken('WindowToken', typeof window !== 'undefined' && window.document
    ? { providedIn: 'root', factory: () => window }
    : { providedIn: 'root', factory: () => undefined });

/*
 * Public API Surface of ngx-window-token
 */

/**
 * Generated bundle index. Do not edit.
 */

export { WINDOW };
