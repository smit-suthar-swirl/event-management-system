const request = require('request-promise');
const Instamojo = require("instamojo-payment-nodejs");

Instamojo.isSandboxMode(true); // For testing

Instamojo.setKeys("test_8f87673cce048747126bcf30502", "test_aea7b98538f5f92d236b4de76ba");

const createPayment = async (req, res) => {
    try {
        const options = {
            purpose: "Product buy", // REQUIRED
            amount: 100000, // REQUIRED and must be > ₹3 (3 INR)
            currency: "INR",
            buyer_name: "",
            email: "",
            phone: null,
            send_email: false,
            send_sms: false,
            allow_repeated_payments: false,
            webhook: "",
            redirect_url: process.env.REDIRECT_URL,
        };

        const paymentData = Instamojo.PaymentData(options);

        const response = await Instamojo.createNewPaymentRequest(paymentData);
        console.log(response);
        res.send(response)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Payment request failed' });
    }
}

module.exports = {
    createPayment
}