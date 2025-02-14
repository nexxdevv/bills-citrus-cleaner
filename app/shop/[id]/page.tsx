"use client"
import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { db, doc, getDoc } from "@/lib/firebaseConfig"
import Image from "next/image"
import { useCart } from "@/context/CartContext"

interface Product {
  id: string
  name: string
  price: number
  photo: string
  description: string
  weight: string
}

const ProductDetail = () => {
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const params = useParams()
  const id = params.id

  useEffect(() => {
    if (!id) return
    const fetchProduct = async () => {
      const productRef = doc(db, "products", id as string)
      const productSnap = await getDoc(productRef)
      if (productSnap.exists()) {
        setProduct({ id: productSnap.id, ...productSnap.data() } as Product)
      }
    }
    fetchProduct()
  }, [id])

  if (!product) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-[#F0F0F4] dark:bg-[#1F1E25] rounded-lg p-6 pt-3">
        <div className="relative w-full h-96 rounded-lg overflow-hidden">
          <Image
            src={product.photo}
            alt={product.name}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            {product.name}
          </h1>
          <p className="text-gray-500 text-sm mt-2 dark:text-gray-400">
            {product.weight}
          </p>
          <p className="text-gray-700 text-lg font-medium mt-2 dark:text-white">
            ${product.price * quantity}
          </p>

          <div className="flex items-center gap-6 mt-5">
            <div className="flex items-center gap-6">
              <button
                disabled={quantity === 1}
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className={`px-4 py-2 bg-gray-300 rounded-lg dark:bg-gray-600 dark:text-white ${
                  quantity === 1 && "opacity-50 cursor-not-allowed"
                }`}
              >
                -
              </button>
              <span className="text-sm font-medium dark:text-white">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-4 py-2 bg-gray-300 rounded-lg dark:bg-gray-600 dark:text-white"
              >
                +
              </button>
            </div>
            <button
              onClick={() => addToCart({ ...product, quantity })}
              className="px-4 py-2.5 bg-orange-600 text-white w-full rounded-full text-sm font-medium transition hover:bg-orange-600/80"
            >
              Add to Cart
            </button>
          </div>

          <div className="mt-5 dark:text-white">
            <p>{product.description}</p>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <button className="w-full bg-black text-white py-2.5 rounded-full text-sm font-medium transition hover:bg-black/80">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
