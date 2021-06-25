import { EventsCollector } from 'nextalys-js-helpers/dist/events';
import { fromEvent, Subject } from 'rxjs';
import { GenericResponse } from '../providers/api-client.generated';

export interface HandleLoginResponseData {
    response: GenericResponse;
    fromRefreshToken: boolean;
    forceLogout: boolean;
}
export interface SnackbarNotificationPayload {
    actionName?: string;
    actionLabel?: string;
    url?: string;
    routerLink?: string;
    message: string;
    opts?: { duration?: number };
}


export class EventsHandler {
    private static eventsCollector: EventsCollector = new EventsCollector();
    public static isOnline: boolean = true;
    public static ConnectivityChanged: Subject<boolean> = new Subject<boolean>();
    public static ExpandOrCollapseMenuEvent = new Subject<void>();
    public static HandleLoginResponseEvent = new Subject<HandleLoginResponseData>();
    public static ForceLogoutEvent = new Subject<string>();
    public static AuthServiceInitialized = new Subject<void>();
    public static PageChanged = new Subject<void>();
    public static CandidateApplicationHasBeenSeen = new Subject<string>();
    public static NewCandidateApplication = new Subject<string>();
    public static MessageHasBeenSeen = new Subject<string>();
    public static NewMessage = new Subject<string>();
    public static init() {
        const onlineSub = fromEvent(window, "online").subscribe(() => {
            this.ConnectivityChanged.next(true);
            this.isOnline = true;
        });
        this.eventsCollector.collect(onlineSub);
        const offlineSub = fromEvent(window, "offline").subscribe(() => {
            this.ConnectivityChanged.next(false);
            this.isOnline = false;
        });
        this.eventsCollector.collect(offlineSub);
    }

    public static destroy() {
        this.eventsCollector.unsubscribeAll();
    }
}