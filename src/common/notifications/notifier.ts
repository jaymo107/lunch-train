export enum Permission {
    Granted = 'granted',
    Denied = 'denied'
}

export default class Notifier {
    private notifications: Array<Notification>;
    
    constructor() { 
        this.notifications = [];
    }

    hasPermission(): Promise<string> {
        return new Promise((resolve) => { 
            if (!this.hasBrowserSupport()) {
                resolve(Permission.Denied);
                return;
            }

            Notification.requestPermission(result => resolve(result));
        });  
    }
    
    notify(title: string, message: string): void {
        this.notifications.push(new Notification(title, {
            body: message,
        }));
    }

    private hasBrowserSupport(): boolean {
        return 'Notification' in window;
    }
}