import storeSubscription from "../utils/storeSubscription.js";
import validateToken from "../utils/validateToken.js";


const subscribe = async (req, res) => {
    const authHeader = req?.headers?.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Validate token
        const validationResponse = await validateToken(token);
        console.log(validationResponse)

        // Extract user ID from response
        const userId = validationResponse.user_id;

        // Store the subscription in the database with the user ID
        const subscription = req.body;
        await storeSubscription(subscription, userId)
        
        res.status(201).json({ message: 'Subscription saved.' });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

export default subscribe;