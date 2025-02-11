"use client";

import Link from "next/link";
import React from "react";
import { HiOutlineUserCircle, HiOutlineShoppingBag } from "react-icons/hi2";
import { useCart } from "@/context/CartContext";

const Header = () => {
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header>
      <div className="p-5 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="text-2xl font-bold leading-none">
          <span className="dark:text-white">Bill's</span>
          <h1 className="-mt-1 dark:text-white">Citrus Cleaner</h1>
        </Link>
        <div className="flex gap-4 relative">
          <HiOutlineUserCircle size={28} className="dark:text-white" />
          <div className="relative">
            <HiOutlineShoppingBag size={28} className="dark:text-white" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


