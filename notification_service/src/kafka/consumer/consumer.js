import { Kafka, logLevel } from 'kafkajs';
import { ObjectId } from 'mongodb';

import Subscription from '../../models/models.js';
import sendNotification from '../../utils/sendNotification.js';

export default async function startKafkaConsumer() {
    let kafka;
    let consumer;

    async function createConsumer() {
        kafka = new Kafka({
            clientId: 'notification-service',
            brokers: ['localhost:9092'], // Replace with your Kafka broker address
            logLevel: logLevel.INFO,
        });

        consumer = kafka.consumer({
            groupId: 'notification-group'
        });

        consumer.on(consumer.events.CRASH, async (event) => {
            console.error('Consumer crashed:', event.payload.error);
            console.log('Recreating Kafka consumer...');
            await consumer.disconnect();
            await startKafkaConsumer(); // Restart the consumer
        });

        await consumer.connect();
        console.log('Connected to Kafka broker');

        const topics = ["post", "code", "qna", "connection", "logs"]

        topics.forEach(async element => {
            await consumer.subscribe({topic: element, fromBeginning: false})
        });

        console.log('Subscribed to topics(post, code, qna, connection, logs)')

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log({
                    partition,
                    topic,
                    offset: message.offset,
                    key: message.key.toString(),
                    value: message.value.toString(),
                });

                // perform action like send notification to client
                const notificationPayload = {
                    title: 'New Notification from notification service, hello anil',
                    body: message.value.toString(),
                };

                // Send notification to all clients
                const userId = new ObjectId(message.key.toString())
                const subscriptions = await Subscription.find({userId});
                console.log(subscriptions)

                await sendNotification(subscriptions, notificationPayload);

            },
        });
    }

    await createConsumer();
}

