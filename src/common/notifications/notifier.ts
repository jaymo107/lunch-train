import { initializeApp } from "firebase/app";
import { getMessaging, Messaging, getToken } from 'firebase/messaging';
import { env } from 'process';


export enum Permission {
    Granted = 'granted',
    Denied = 'denied'
}

export default class Notifier {
    private notifications: Array<Notification>;
    private messaging: Messaging;
    private vapidKey?: string;
    
    constructor() { 
        this.notifications = [];

        const app = initializeApp({
            apiKey: "AIzaSyDSrxwdfZE4VoUhH5A8uxtmB-W9pl4n5bA",
            authDomain: "lunch-train-7b7d9.firebaseapp.com",
            projectId: "lunch-train-7b7d9",
            storageBucket: "lunch-train-7b7d9.appspot.com",
            messagingSenderId: "963515759558",
            appId: "1:963515759558:web:d9e619875e1b5cf2ae50c7",
            measurementId: "G-PHH2VBR84K"
        });

        this.messaging = getMessaging(app);
        this.vapidKey = env.VAPID_TOKEN;
    }

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

    async getNotificationToken() { 
        getToken(this.messaging, { vapidKey: this.vapidKey }).then(token => {
            if (token) {
                console.log('GOT TOKEN: ',token);
            } else {
                this.requestPermission();
            }
        }).catch(err => {
            console.log('ERROR: ',err);
        });
    }

    private requestPermission(): Promise<string> {
        return Notification.requestPermission();
    }
}