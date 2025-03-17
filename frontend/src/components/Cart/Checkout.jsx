import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Paypal from './Paypal';
import { useDispatch, useSelector } from 'react-redux';
import { createCheckout } from '../../redux/slices/checkoutSlice';
import axios from 'axios';

const Checkout = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { cart, loading, error } = useSelector((state) => state.cart)
    const [checkoutId, setCheckoutId] = useState(null)
    const { user } = useSelector((state) => state.auth)
    const [shippingAddress, setShippingAddress] = useState({
        firstName: "", lastName: "", address: "", city: "", postalCode: "", country: "", phone: ""
    })

    useEffect(() => {
        if (!cart || !cart.products || cart.products.length === 0) {
            navigate("/")

        }
    }, [cart, navigate])

    const handleCreateCheckout =async (e) => {
        e.preventDefault()
        if (cart && cart.products.length > 0) {
            const res = await dispatch(createCheckout({
                checkoutItems: cart.products,
                shippingAddress,
                paymentMethod: "Paypal",
                totalPrice: cart.totalPrice
            }))
            if (res.payload && res.payload._id) {
                setCheckoutId(res.payload._id)
            }
        }
 

    }


    const handlePaymentSuccess = async (details) => {
        try {

            const userToken = localStorage.getItem("userToken");
            if (!userToken) {
                console.error("User token is missing!");
                return;
            }
    
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
                { paymentStatus: "paid", paymentDetails: details },
                {
                    headers: { Authorization: `Bearer ${userToken}` }
                }
            );
    
            if (response.status === 200) {
                await handleFinalizeCheckout(checkoutId);
                navigate("/order-confirmation");  // Move inside the success condition
            }
        } catch (error) {
            console.error("Error processing payment:", error);
        }
    };
    

    const handleFinalizeCheckout = async (checkoutId) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`, {},  {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            })

            if (response.status === 200) {
                navigate("/order-confirmation")
            } else {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (loading) return <p>Loading cart....</p>
    if (error) return <p>Error: {error}</p>
    if (!cart || !cart.products || cart.products.length === 0) {
        return <p>Your cart is empty</p>
    }

    return (

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter'>
            <div className='bg-white rounded-lg p-6'>
                <h2 className='text-2xl uppercase mb-6'>Checkout</h2>
                <form onSubmit={handleCreateCheckout}>
                    <h3 className='text-lg mb-4'>Contact Details</h3>
                    <div className='mb-4 '>
                        <label className='block text-gray-700'>Email</label>
                        <input type='email' value={user? user.email:""} className='w-full p-2 border rounded' disabled></input>
                    </div>
                    <h3 className='text-lg mb-4'>Delivery</h3>
                    <div className='mb-4 grid grid-cols-2 gap-4'>
                        <div >
                            <label className="block text-gray-700">First Name</label>
                            <input type='text' onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })} value={shippingAddress.firstName} className='w-full p-2 border rounded ' required></input>
                        </div>
                        <div >
                            <label className="block text-gray-700">Last Name</label>
                            <input type='text' onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })} value={shippingAddress.lastName} className='w-full p-2 border rounded ' required></input>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Address</label>
                        <input required className='w-full p-2 border rounded' type='text' value={shippingAddress.address} onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })} ></input>
                    </div>

                    <div className='mb-4 grid grid-cols-2 gap-4'>
                        <div>
                            <label className="block text-gray-700">City</label>
                            <input type='text' onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} value={shippingAddress.city} className='w-full p-2 border rounded ' required></input>
                        </div>
                        <div>
                            <label className="block text-gray-700">Postal Code</label>
                            <input type='text' onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })} value={shippingAddress.postalCode} className='w-full p-2 border rounded ' required></input>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Country</label>
                        <input required className='w-full p-2 border rounded' type='text' value={shippingAddress.country} onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })} ></input>
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700'>Phone</label>
                        <input required className='w-full p-2 border rounded' type='text' value={shippingAddress.phone} onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })} ></input>
                    </div>
                    <div className='mt-6'>
                        {!checkoutId ? (<button type='submit' className='w-full text-white py-3 rounded bg-black'> continue to Payment</button>) : <div >
                            <h3 className='texxt-lg mb-4'>Pay with Paypal</h3>
                            <Paypal amount={cart.totalPrice} onSuccess={handlePaymentSuccess} onError={(err) => alert("Paypal Falied. try again")}></Paypal>
                        </div>}
                    </div>
                </form>
            </div>
            <div className='bg-gray-50 p-6 rounded-lg'>
                <h3 className='text-lg mb-4 '>Order Summary</h3>
                <div className='border-t py-4 mb-4'>
                    {cart.products.map((product, index) => (
                        <div key={index} className='flex items-start justify-between py-2 border-b'>

                            <div className='flex items-start'>

                                <img src={product.image} alt={product.name} className='w-20 h-24 object-cover mr-4'></img>
                                <div >
                                    <h3 className='text-md'>{product.name}</h3>
                                    <p className='text-gray-500'>Size: {product.size}</p>
                                    <p className='text-gray-500'>Color: {product.color}</p>
                                </div>

                            </div>
                            <p className='text-xl ' >${product.price?.toLocaleString()}</p>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between items-center text-lg mb-4'>
                    <p className=''>SubTotal</p>
                    <p >${cart.totalPrice?.toLocaleString()}</p>
                </div>
                <div className='flex justify-between items-center text-lg'>
                    <p >Shipping</p>
                    <p >Free</p>
                </div>
                <div className='flex justify-between items-center text-lg mt-4 border-t pt-4'>
                    <p>Total</p>
                    <p>${cart.totalPrice?.toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}

export default Checkout