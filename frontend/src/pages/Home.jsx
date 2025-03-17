import React, { useEffect, useState } from 'react'
import Hero from '../components/Layout/Hero'
import GenderConllectionSection from '../components/Products/GenderConllectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeaturesSection from '../components/Products/FeaturesSection'
import CollectionPage from './CollectionPage'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsByFilters } from '../redux/slices/productSlice'
import axios from 'axios'

const Home = () => {

  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state) => state.products);

  const [bestSellerProduct, setBestSellerProduct] = useState(null)


  useEffect(() => {
    dispatch(fetchProductsByFilters({
      // gender: "men ",
      category: "Top Wear",
      limit: 8
    }))

    const fetchBySeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        ); setBestSellerProduct(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchBySeller()
  }, [dispatch])
  return (
    <div>

      <Hero></Hero>
      <GenderConllectionSection></GenderConllectionSection>
      <NewArrivals></NewArrivals>
      <h2 className='text-3xl text-center font-bold mb-4'>
        Best Seller
      </h2>

      {bestSellerProduct ? (<ProductDetails productId={bestSellerProduct._id}></ProductDetails>) : (<p className='text-center'>Loading best seller product...</p>)}
      <div className='container mx-auto'>
        <h2 className='text-3xl text-center font-bold mb-4'>
          Top Wears for Women
        </h2>
        <ProductGrid products={products} error={error} loading={loading}></ProductGrid>
      </div>
      <FeaturedCollection></FeaturedCollection>
      <FeaturesSection></FeaturesSection>
      <CollectionPage></CollectionPage>
    </div>
  )
}

export default Home