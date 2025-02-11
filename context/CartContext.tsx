import React, { createContext, useContext, useEffect, useState } from "react"
import { db, doc, setDoc, getDoc } from "@/lib/firebaseConfig"
import { useAuth } from "@/context/AuthContext"
import Cookies from "js-cookie"

interface CartItem {
  id: string
  name: string
  price: number
  photo: string
  quantity: number
  description: string
}

interface CartContextProps {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextProps | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const { user } = useAuth()

  useEffect(() => {
    const savedCart = Cookies.get("cart")
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    Cookies.set("cart", JSON.stringify(cartItems), { expires: 7 })
  }, [cartItems])

  useEffect(() => {
    if (user) {
      const fetchCart = async () => {
        const cartRef = doc(db, "carts", user.uid)
        const cartSnap = await getDoc(cartRef)
        if (cartSnap.exists()) {
          setCartItems(cartSnap.data().items || [])
        }
      }
      fetchCart()
    }
  }, [user])

  useEffect(() => {
    if (user) {
      const saveCartToFirestore = async () => {
        const cartRef = doc(db, "carts", user.uid)
        await setDoc(cartRef, { items: cartItems }, { merge: true })
      }
      saveCartToFirestore()
    }
  }, [cartItems, user])

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id)
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      }
      return [...prev, item]
    })
  }

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
