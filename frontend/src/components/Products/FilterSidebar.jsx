import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const FilterSidebar = () => {
    const [serachParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()
    const [filters, setFilters] = useState({
        category: "",
        gender: "",
        color: "",
        size: [],
        material: [],
        brand: [],
        minPrice: 0,
        maxPrice: 110
    })

    const [priceRange, setPriceRange] = useState([0, 100])
    const category = ["Top Wear", "Bottom Wear"];
    const colors = [
        "Red", "Blue", "Black", "Green", "Yellow", "Gray", "White", "Pink", "Beige", "Navy"
    ]
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

    const materials = [
        "Cotton",
        "Wool",
        "Denim",
        "Polyester",
        "Silk",
        "Linem",
        "Viscose",
        "Fleece"

    ]
    const brands = [
        "Urban Threads",
        "Modern Fit",
        "Street Style",
        "Beach Breeze",
        "Fashionista",
        "ChicStyle"
    ]

    const gender = ["Men", "Women"];

    useEffect(() => {
        const params = Object.fromEntries([...serachParams])
        setFilters({
            category: params.category || "",
            gender: params.gender || "",
            color: params.color || "",
            size: params.size ? params.size.split(",") : [],
            material: params.material ? params.material.split(",") : [],
            brand: params.brand ? params.brand.split(",") : [],
            minPrice: params.minPrice || 0,
            maxPrice: params.maxPrice || 100
        })
        setPriceRange([0, params.maxPrice || 100])
    }, [serachParams])

    const handleFilterChange = (e) => {
        const { name, value, checked, type } = e.target;

        let newFilters = { ...filters };

        if (type === "checkbox") {
            if (checked) {
                newFilters[name] = [...(newFilters[name] || ""), value];
            } else {
                newFilters[name] = newFilters[name].filter((item) => item !== value)
            }
        } else {
            newFilters[name] = value
        }
        setFilters(newFilters)
        updateURLParams(newFilters)
        // console.log(newFilters);

    }

    const updateURLParams = (newFilters) => {
        const params = new URLSearchParams();
        Object.keys(newFilters).forEach((key) => {
            if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
                params.append(key, newFilters[key].join(","))
            } else if (newFilters[key]) {
                params.append(key, newFilters[key]);
            }
        });
        setSearchParams(params)
        navigate(`?${params.toString()}`);
    }

    const handlePriceChange = (e) => {
        const newPrice = e.target.value;
        setPriceRange([0, newPrice]);
        const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice }
        setFilters(filters);
        updateURLParams(newFilters)
    }


    return (
        <div className='p-4'>
            <h3 className='text-xl font-medium text-gray-800 mb-4'> Filter   </h3>

            <div className='mb-6'>
                <label className='block text-gray-600 font-meium mb-2 font-bold'   > Category   </label>
                {category.map((category) => (
                    <div key={category} className='flex items-center mb-1'>
                        <input checked={filters.category === category} className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400  border-gray-300' onChange={handleFilterChange} value={category} type='radio' name='category' >

                        </input>
                        <span className='text-gray-700'>{category}</span>
                    </div>
                ))}

            </div>

            <div className='mb-6'>
                <label className='block text-gray-600 font-meium mb-2 font-bold'   > Gender   </label>
                {gender.map((gender) => (
                    <div key={gender} className='flex items-center mb-1'>
                        <input checked={filters.gender === gender} onChange={handleFilterChange} value={gender} className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400  border-gray-300' type='radio' name='gender' >

                        </input>
                        <span className='text-gray-700'>{gender}</span>
                    </div>
                ))}

            </div>

            <div className='mb-6'>
                <label className='block text-gray-600 font-medium mb-2'>Color</label>
                <div className='flex flex-wrap gap-2'>
                    {colors.map((color) => (
                        <button className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${filters.color === color ? "ring=2 ring-blue-500" : ""}`} onClick={handleFilterChange} value={color} style={{ backgroundColor: color }} key={color} name='color'></button>
                    ))}
                </div>
            </div>


            <div className='mb-6'>
                <label className='block text-gray-600 font-medium mb-2'>Size</label>
                {sizes.map((size) => (
                    <div key={size} className='flex items-center mb-1'>
                        <input checked={filters.size.includes(size)} onChange={handleFilterChange} value={size} type='checkbox' name='size' className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 '></input>
                        <span className='text-gray-700 '>{size}</span>
                    </div>
                ))}
            </div>

            <div className='mb-6'>
                <label className='block text-gray-600 font-medium mb-2'>Materials</label>
                {materials.map((material) => (
                    <div key={material} className='flex items-center mb-1'>
                        <input checked={filters.material.includes(material)} onChange={handleFilterChange} value={material} type='checkbox' name='material' className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 '></input>
                        <span className='text-gray-700 '>{material}</span>
                    </div>
                ))}
            </div>


            <div className='mb-6'>
                <label className='block text-gray-600 font-medium mb-2'>Brand</label>
                {brands.map((brand) => (
                    <div key={brand} className='flex items-center mb-1'>
                        <input checked={filters.brand.includes(brand)} onChange={handleFilterChange} value={brand} type='checkbox' name='brand' className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 '></input>
                        <span className='text-gray-700 '>{brand}</span>
                    </div>
                ))}
            </div>
            <div className='mb-8'>
                <label className='block text-gray-600 font-medium mb-2'>Price Range</label>
                <input value={priceRange[1]} onChange={handlePriceChange}  type='range' name='priceRange' min={0} max={100} className='w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer'></input>
                <div className='flex justify-between text-gray-600 mt-2'>
                    <span className=''>$0</span>
                    <span className=''>${priceRange[1]}</span>
                </div>
            </div>



        </div>
    )
}

export default FilterSidebar