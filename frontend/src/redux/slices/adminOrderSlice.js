import { createSlice, createAsyncThunk, __DO_NOT_USE__ActionTypes } from "@reduxjs/toolkit";
import axios from 'axios'



export const fetchAllOrders = createAsyncThunk(
    "adminOrders/fetchAllOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            }
            )
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const updateOrderStatus = createAsyncThunk(
    "adminOrders/updateOrderStatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`, { status }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            }
            )
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteOrder = createAsyncThunk(
    "adminOrders/deleteOrder",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            }
            )
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const adminOrderSlice = createSlice({
    name: "adminOrders",
    initialState: {
        orders: [],
        totalOrders: 0,
        totalSales: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllOrders.pending, (state) => {
            state.loading = true,
                state.error = null;
        }).addCase(fetchAllOrders.fulfilled, (state, actions) => {
            state.loading = false,
                state.orders = actions.payload;
            state.totalOrders = actions.payload.length;

            const totalSales = actions.payload.reduce((acc, order) => {
                return acc + order.totalPrice
            }, 0);
            state.totalSales = totalSales
        })
            .addCase(fetchAllOrders.rejected, (state, actions) => {
                state.loading = false,
                    state.error = actions.payload, message;
            }).addCase(updateOrderStatus.fulfilled, (state, action) => {
                const updatedOrder = action.payload;
                const orderIndex = state.orders.findIndex(
                    (order) => order._id === updatedOrder._id
                );
                if (orderIndex !== -1) {
                    state.orders[orderIndex] = updatedOrder
                }
            }).addCase(deleteOrder.fulfilled, (state, action) => {
                state.orders = state.orders.filter(
                    (order) => order._id !== action.payload
                )
            })



    }

})

export default adminOrderSlice.reducer