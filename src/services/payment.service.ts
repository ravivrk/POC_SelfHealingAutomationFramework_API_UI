
import axios from "axios";

export async function createPayment() {
    const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
            amount: 100,
            currency: "USD",
            userName: "Ravi"
        }
    );
    return response.data;
}

export async function getPaymentStatus(id: number) {
    try {
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/posts/${id}`
        );

        return response.data;

    } catch (error: any) {

        if (error.response && error.response.status === 404) {
            console.warn(` Payment not found for ID ${id}, using fallback`);

            // fallback simulation
            return {
                id: id,
                status: "UNKNOWN"
            };
        }

        throw error;
    }
}
