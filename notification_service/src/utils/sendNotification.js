import webpush from 'web-push'
import dotenv from 'dotenv'

dotenv.config();


webpush.setVapidDetails(
    'mailto:your-email@example.com',
    process.env.PUBLIC_VAPID_KEY,
    process.env.PRIVATE_VAPID_KEY
);

async function sendNotification(subscriptions, notificationPayload) {

    const promises = subscriptions.map(subscription =>
        webpush.sendNotification(subscription, JSON.stringify(notificationPayload))
    );

    Promise.all(promises)
        .catch(err => {
            console.error('Error sending notification:', err);
        })
}

export default sendNotification