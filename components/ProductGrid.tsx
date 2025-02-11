"use client"

import React from "react"
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
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <li
          key={product.id}
          className="rounded-2xl shadow-lg p-4 transition-transform hover:scale-105 hover:shadow-xl dark:bg-[#1F1E25]"
        >
          <Link
            href={`/shop/${product.id}`}
            className="relative w-full overflow-hidden "
          >
            <Image
              src={product.photo}
              alt={product.name}
              width={340}
              height={340}
              priority
              className="w-full rounded-lg bg-white"
            />
          </Link>
          <div className="mt-4 text-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {product.name}
            </h2>
            <p className="text-gray-500 text-sm mt-1 dark:text-gray-400">
              {product.weight}
            </p>
            <p className="text-gray-700 font-medium text-lg mt-2 dark:text-white">
              ${product.price}
            </p>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="mt-4 w-full bg-orange-600 text-white py-2 rounded-full text-sm font-semibold transition hover:bg-orange-400"
          >
            Add to Cart
          </button>
          <button
            onClick={() => addToCart(product)}
            className="mt-4 w-full bg-black text-white py-2 rounded-full text-sm font-semibold transition hover:bg-orange-400"
          >
            Buy Now
          </button>
        </li>
      ))}
    </ul>
  )
}

export default ProductGrid
