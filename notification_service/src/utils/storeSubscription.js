// Importing Subscription model
import Subscription from "../models/models.js";

const storeSubscription = async (subscription, userId) => {
    const newSubscription = new Subscription({
        endpoint: subscription.endpoint,
        expirationTime: subscription.expirationTime,
        keys: {
            p256dh: subscription.keys.p256dh,
            auth: subscription.keys.auth,
        },
        userId: userId,
    });
    await newSubscription.save();
};

export default storeSubscription;