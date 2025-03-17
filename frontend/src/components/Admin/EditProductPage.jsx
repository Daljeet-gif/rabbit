import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { fetchProductDetails, updateProduct } from '../../redux/slices/productSlice'
import axios from 'axios'

const EditProductPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { id } = useParams()
    const { selectedProduct, loading, error } = useSelector((state) => state.products)
    const [productData, setProduct] = useState({
        name: "", description: "", price: 0, countInStock: 0, sku: "", category: "", brand: "", sizes: [], colors: [], collections: "", material: "", gender: "",
        images: [

        ]
    })

    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        if (id) {
            dispatch(fetchProductDetails(id))
        }
    }, [dispatch, id])


    useEffect(() => {
        if (selectedProduct) {
            setProduct(selectedProduct)
        }
    }, [selectedProduct])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevDat) => ({ ...prevDat, [name]: value }))

    }
    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData();
        formData.append("image", file);

        try {
            setUploading(true);

            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            }
            )
            setProduct((prevData) => ({ ...prevData, images: [...prevData.images, { url: data.imageUrl, altText: "" }], }))
            setUploading(false)
        } catch (error) {
            console.log(error); setUploading(false)

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProduct({id,productData}))
    navigate("/admin/products")

    }
    return (
        <div className='max-w-5xl mx-auto p-6 shadow-md rounded-md'>
            <h2 className='text-3xl font-bold mb-6'>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Product Name</label>
                    <input type='text' name='name' value={productData.name} className='w-full border border-gray-300 rounded-md p-2 ' required onChange={handleChange}></input>
                </div>
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Description</label>
                    <textarea name='description' value={productData.description} className='w-full border border-gray-300 rounded-md p-2 ' rows={4} required onChange={handleChange}></textarea>
                </div>
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Price</label>
                    <input type='number' name='price' value={productData.price} className='w-full border border-gray-300 rounded-md p-2 ' required onChange={handleChange}></input>
                </div>

                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>CountInStock</label>
                    <input type='number' name='countInStock' value={productData.countInStock} className='w-full border border-gray-300 rounded-md p-2 ' required onChange={handleChange}></input>
                </div>
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>SKU</label>
                    <input type='text' name='sku' value={productData.sku} className='w-full border border-gray-300 rounded-md p-2 ' required onChange={handleChange}></input>
                </div>
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Sizes (comma-separated)</label>
                    <input type='text' name='size' value={productData.sizes.join(",")} className='w-full border border-gray-300 rounded-md p-2 ' onChange={(e) => setProduct({ ...productData, sizes: e.target.value.split(',').map((size) => size.trim()) })} ></input>
                </div>
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Colors (comma-separated)</label>
                    <input type='text' name='colors' value={productData.colors.join(",")}
                        className='w-full border border-gray-300 rounded-md p-2 '
                        onChange={(e) => setProduct({ ...productData, colors: e.target.value.split(',').map((color) => color.trim()) })}></input>
                </div>
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Upload</label>
                    <input type='file' onChange={handleImageUpload}></input>
                    {uploading && <p>Uploading image....</p>}
                    <div className='flex gap-4 mt-4'>
                        {productData.images.map((image, index) => (
                            <div key={index}>
                                <img src={image.url} alt={"Product Image"} className='w-20 h-20 object-cover rounded-md shadow-md'>
                                </img>
                            </div>
                        ))}
                    </div>
                </div>
                <button type='submit' className='w-full hover:bg-green-600 transition-colors py-2 rounded-md bg-green-500 text-white'>Update Product </button>
            </form>
        </div>
    )
}

export default EditProductPage