"use client"

import React from "react"
import { useCart } from "@/context/CartContext"
import Image from "next/image"
import Link from "next/link"
import { Plus, Minus, Trash } from "lucide-react"

const BagPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart()

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="max-w-5xl mx-auto p-6 w-full">
      <h1 className="text-2xl font-semibold text-center mb-6 dark:text-white">
        Your Bag
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400">
          Your bag is empty.
          <Link href="/">
            <span className="text-blue-600 dark:text-blue-400 underline ml-2">
              Continue Shopping
            </span>
          </Link>
        </div>
      ) : (
        <>
          <ul className="space-y-6 w-full">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between p-4 bg-gray-100 dark:bg-[#1F1E25] rounded-2xl shadow-sm gap-5w-full"
              >
                {/* Product Image */}
                <div className="flex items-center">
                  <Link href={`/shop/${item.id}`}>
                      <Image
                        src={item.photo}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                  </Link>
                  {/* Product Name & Price */}
                  <div className="flex-1 ml-4">
                    <h2 className="font-semibold dark:text-white">
                      {item.name}
                    </h2>
                    <p className="text-gray-500 text-sm dark:text-gray-400">
                      ${item.price}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-center space-y-2">
                  {/* Add Item */}
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 bg-gray-300 dark:bg-gray-600 rounded-lg"
                  >
                    <Plus size={18} className="dark:text-white" />
                  </button>

                  {/* Quantity Display */}
                  <span className="font-semibold dark:text-white">
                    {item.quantity}
                  </span>

                  {/* Remove Item */}
                  <button
                    onClick={() =>
                      item.quantity > 1
                        ? updateQuantity(item.id, item.quantity - 1)
                        : removeFromCart(item.id)
                    }
                    className="p-2 bg-gray-300 dark:bg-gray-600 rounded-lg"
                  >
                    {item.quantity > 1 ? (
                      <Minus size={18} className="dark:text-white" />
                    ) : (
                      <Trash size={18} className="dark:text-white" />
                    )}
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Total Price */}
          <div className="mt-8 p-4 bg-gray-200 dark:bg-[#1F1E25] rounded-lg shadow-sm flex justify-between">
            <h2 className="text-lg font-semibold dark:text-white">Total</h2>
            <h2 className="text-lg font-semibold dark:text-white">
               ${totalPrice}
            </h2>
          </div>

          {/* Bag Actions */}
          <div className="flex justify-between mt-8">
            <button
              onClick={clearCart}
              className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white px-6 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition"
            >
              Clear Bag
            </button>
            <button
              onClick={() => alert("Proceeding to checkout...")}
              className="bg-black dark:bg-white dark:text-black text-white px-6 py-2 rounded-lg hover:opacity-80 transition"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default BagPage
