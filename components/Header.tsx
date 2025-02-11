import React from "react"
import { HiOutlineUserCircle, HiOutlineShoppingBag } from "react-icons/hi2"

const Header = () => {
  return (
    <header className="border-b">
        <div className="p-5 flex items-center justify-between max-w-5xl mx-auto">
          <div className="text-2xl font-bold leading-none">
            <span>Bill's</span>
            <h1 className="-mt-1">Citrus Cleaner</h1>
          </div>
          <div className="flex gap-4">
            <HiOutlineUserCircle size={28} />
            <HiOutlineShoppingBag size={28} />
          </div>
        </div>
    </header>
  )
}

export default Header
