"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/CartContext"

interface Product {
  id: string
  name: string
  price: number
  photo: string
  description: string
  weight: string
  quantity: number
}

interface ProductGridProps {
  products: Product[]
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const { addToCart } = useCart()

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
      {products.map((product) => (
        <li
          key={product.id}
          className="rounded-2xl shadow-lg p-4 bg-[#F0F0F4]  dark:bg-[#1F1E25] relative w-full"
        >
          <Link
            href={`/shop/${product.id}`}
            className="relative w-full overflow-hidden"
          >
            <Image
              src={product.photo}
              alt={product.name}
              width={340}
              height={340}
              priority
              className="w-[100%] h-[340px] aspect-square object-contain"
            />
          </Link>
          <div className="mt-2 text-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {product.name}
            </h2>
            <p className="text-gray-500 text-sm mt-1 dark:text-gray-400">
              {product.weight}
            </p>
            <p className="text-gray-700 font-medium text-lg mt-2 dark:text-white">
              ${product.price}
            </p>

            <div className="w-full p-2 mt-2">
              <button
                onClick={() => addToCart({ ...product, quantity: 1 })}
                className="w-full bg-orange-600 text-white py-2 rounded-full text-sm font-semibold transition hover:bg-orange-600/80 mb-2"
              >
                Add to Cart
              </button>
              <button
                onClick={() => addToCart({ ...product, quantity: 1 })}
                className="w-full bg-black text-white py-2 rounded-full text-sm font-semibold transition hover:bg-black/80"
              >
                Buy Now
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ProductGrid
