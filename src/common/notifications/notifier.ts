export enum Permission {
    Granted = 'granted',
    Denied = 'denied'
}

export default class Notifier {
    private notifications: Array<Notification>;
    
    constructor() { 
        this.notifications = [];}

    async hasPermission(): Promise<string> {
        if (!this.hasBrowserSupport()) {
            return Promise.resolve(Permission.Denied);
        }

        return this.requestPermission();
    }
    
    notify(title: string, message: string): void {
        this.notifications.push(new Notification(title, {
            body: message,
        }));
    }

    private hasBrowserSupport(): boolean {
        return 'Notification' in window;
    }

    private requestPermission(): Promise<string> {
        return Notification.requestPermission();
    }
}