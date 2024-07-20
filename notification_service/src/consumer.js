import { Kafka, logLevel } from 'kafkajs';


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

        await consumer.subscribe({ topic: 'notify', fromBeginning: false });
        console.log('Subscribed to topic: notifications');

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log({
                    partition,
                    offset: message.offset,
                    value: message.value.toString(),
                });

                const notificationPayload = {
                    title: 'Kafka Notification',
                    body: message.value.toString(),
                };

                const promises = subscriptions.map(subscription =>
                    webpush.sendNotification(subscription, JSON.stringify(notificationPayload))
                );

                Promise.all(promises)
                    .catch(err => {
                        console.error('Error sending notification:', err);
                    });
            },
        });
    }

    await createConsumer();
}
