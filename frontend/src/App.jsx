import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import UserLayout from './components/Layout/UserLayout'
import Home from './pages/Home'
import { Toaster } from "sonner"
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import CollectionPage from './pages/CollectionPage'
import ProductDetails from './components/Products/ProductDetails'
import Checkout from './components/Cart/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import OrderDetailsPage from './pages/OrderDetailsPage'
import MyOrdersPage from './pages/MyOrdersPage'
import AdminLayout from './components/Admin/AdminLayout'
import AdminHomePage from './pages/AdminHomePage'
import UserMangament from './components/Admin/UserMangament'
import ProductManagement from './components/Admin/ProductManagement'
import EditProductPage from './components/Admin/EditProductPage'
import OrderManagment from './components/Admin/OrderManagment'
import { Provider } from "react-redux"
import store from './redux/store'
import ProtectedRoute from './components/Common/ProtectedRoute'
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplathPath: true }}>
        <Toaster position='top-right'></Toaster>
        <Routes>
          <Route path='/' element={<UserLayout></UserLayout>}>
            <Route index element={<Home></Home>}></Route>
            <Route path='login' element={<Login></Login>}></Route>
            <Route path='register' element={<Register></Register>}></Route>
            <Route path='profile' element={<Profile></Profile>}></Route>
            <Route path='collections/:collection' element={<CollectionPage></CollectionPage>}></Route>
            <Route path='product/:id' element={<ProductDetails></ProductDetails>}></Route>
            <Route path='checkout' element={<Checkout></Checkout>}></Route>
            <Route path='order-confirmation' element={<OrderConfirmation></OrderConfirmation>}></Route>
            <Route path='order/:id' element={<OrderDetailsPage></OrderDetailsPage>}></Route>
            <Route path='my-orders' element={<MyOrdersPage></MyOrdersPage>}></Route>
          </Route>

          <Route path='/admin' element={<ProtectedRoute role="admin"><AdminLayout></AdminLayout></ProtectedRoute>}>
            <Route index element={<AdminHomePage></AdminHomePage>}></Route>
            <Route path='users' element={<UserMangament></UserMangament>}></Route>
            <Route path='products' element={<ProductManagement></ProductManagement>}></Route>
            <Route path='products/:id/edit' element={<EditProductPage></EditProductPage>}></Route>
            <Route path='orders' element={<OrderManagment></OrderManagment>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App