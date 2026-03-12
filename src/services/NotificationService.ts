export interface Notification {
    id: string;
    userId: string;
    message: string;
    type: 'email' | 'sms' | 'push';
    read: boolean;
    createdAt: Date;
}

export class NotificationService {
    private notifications: Map<string, Notification[]> = new Map();

    send(userId: string, message: string, type: Notification['type']): Notification {
        if (!userId || !message) {
            throw new Error('userId and message are required');
        }

        const notification: Notification = {
            id: `notif-${Date.now()}-${Math.random().toString(36).slice(2)}`,
            userId,
            message,
            type,
            read: false,
            createdAt: new Date()
        };

        const existing = this.notifications.get(userId) ?? [];
        existing.push(notification);
        this.notifications.set(userId, existing);
        return notification;
    }

    getUnread(userId: string): Notification[] {
        return (this.notifications.get(userId) ?? []).filter(n => !n.read);
    }

    getAll(userId: string): Notification[] {
        return this.notifications.get(userId) ?? [];
    }

    markAsRead(userId: string, notifId: string): boolean {
        const list = this.notifications.get(userId);
        if (!list) return false;
        const notif = list.find(n => n.id === notifId);
        if (!notif) return false;
        notif.read = true;
        return true;
    }

    markAllAsRead(userId: string): number {
        const list = this.notifications.get(userId) ?? [];
        let count = 0;
        list.forEach(n => { if (!n.read) { n.read = true; count++; } });
        return count;
    }

    deleteNotification(userId: string, notifId: string): boolean {
        const list = this.notifications.get(userId);
        if (!list) return false;
        const idx = list.findIndex(n => n.id === notifId);
        if (idx === -1) return false;
        list.splice(idx, 1);
        return true;
    }

    countByType(userId: string, type: Notification['type']): number {
        return (this.notifications.get(userId) ?? []).filter(n => n.type === type).length;
    }
}
