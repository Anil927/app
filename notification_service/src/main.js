import express from 'express';
import webpush from 'web-push';
import cors from 'cors';

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// Replace with your generated VAPID keys
const publicVapidKey = 'BP1WQgGLE5sfhVDHxAMGkdbqtoaBHV-gh_burMF27fWLXYwHCqyVv7hZJ6SVsDvN79oIEfflB4s_0ao8K2NuKQU';
const privateVapidKey = 'r3myB0vcwfir3f8ZUqhE1HBx4i2Wh4w6bG-Gn2oMgr4';

webpush.setVapidDetails(
    'mailto:your-email@example.com',
    publicVapidKey,
    privateVapidKey
);

const subscriptions = [];

// Endpoint to save subscription
app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    subscriptions.push(subscription);
    res.status(201).json({});
    console.log('Subscription added:', subscription);
});

app.post('/sendnotification', (req, res) => {
    const notificationPayload = {
        title: 'Custom Notification',
        body: 'This is a custom notification triggered from the backend.',
    };

    const promises = subscriptions.map(subscription =>
        webpush.sendNotification(subscription, JSON.stringify(notificationPayload))
    );

    Promise.all(promises)
        .catch(err => {
            console.error('Error sending notification:', err);
        });

    res.status(200).json({});
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    startKafkaConsumer();
});
