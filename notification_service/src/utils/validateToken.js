import axios from 'axios'

const authServiceUrl = process.env.AUTH_SERVICE_URL;

const validateToken = async (token) => {
    try {
        const response = await axios.get(`${authServiceUrl}/validate-token`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new Error('Invalid token');
        } else {
            throw new Error('An error occurred while validating the token');
        }
    }
};

export default validateToken