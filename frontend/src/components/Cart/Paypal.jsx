import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Paypal = ({ amount, onSuccess, onError }) => {
    return (
        <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID||"ARk4TKhIQHhNWVF_K1BNzjJrbuqdPHIwuIBoO5q-JczaXOuv_078Vc_u3A-vxIlbY01XPIm-wq71O20i" }}>
            <PayPalButtons style={{ layout: "vertical" }} createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [{ amount: { value: parseFloat(amount).toFixed(2) } }]
                })
            }} onApprove={(data, actions) => {
                return actions.order.capture().then(onSuccess)
            }}
                onError={onError}
            />

        </PayPalScriptProvider>
    )
}

export default Paypal