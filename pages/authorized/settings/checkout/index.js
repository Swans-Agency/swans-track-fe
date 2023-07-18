import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '@/components/Settings/PaymentForm';
import { postAxios } from '@/functions/ApiCalls';
import { useRouter } from 'next/router';

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

export default function index() {
    const router = useRouter()
    const handlePaymentMethodCreated = async (paymentMethodId) => {
        // Send the Payment Method ID to your backend for attachment
        try {
            const response = await postAxios(`${process.env.DIGITALOCEAN}/company/attach-payment/`, { paymentMethod: paymentMethodId }, true, true, () => { })

            console.log(response);
            router.push("/authorized/settings")
        } catch (error) {
            console.error('Error attaching payment method:', error);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-light tracking-tight text-black ">Add a payment method!</h1>
            <p className='mb-[2rem] text-sm w-1/2'>Don't worry your card details are secure and handled by one of the best payment methods in the world, Stripe!</p>
            <Elements stripe={stripePromise}>
                <PaymentForm onPaymentMethodCreated={handlePaymentMethodCreated} />
            </Elements>
        </div>
    );
};