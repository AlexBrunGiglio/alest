import { Subject } from "rxjs";

export class LocalStorageService {
    public static quotaLimitExceeded = new Subject<void>();
    public static saveInLocalStorage(key: string, value: string): void {
        if (typeof localStorage === 'undefined' || !key)
            return;
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            localStorage.removeItem(key);
            console.error('Local storage service => quota exceeded !');
            if (e.name === 'QUOTA_EXCEEDED_ERR' || e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                this.quotaLimitExceeded.next();
            }
        }
    }
}