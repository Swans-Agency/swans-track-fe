// components/PaymentForm.js

import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = ({ onPaymentMethodCreated }) => {
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);

        try {
            // Create the Payment Method using the Card Element
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            });

            if (error) {
                console.error(error);
                setLoading(false);
            } else {
                onPaymentMethodCreated(paymentMethod.id);
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement className='border-2 border-gray-200 rounded-md p-4 text-gray-800 font-sans font-medium tablet:w-1/2 mb-2' />
            <button className='border rounded-lg py-2 px-4' type="submit" disabled={!stripe || loading}>
                {loading ? 'Processing...' : 'Update pyament method'}
            </button>
        </form>
    );
};

export default PaymentForm;
