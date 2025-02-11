import React from "react"
import { db, collection, getDocs } from "@/lib/firebaseConfig"
import ProductGrid from "./ProductGrid"

interface Product {
  id: string
  name: string
  price: number
  photo: string
  description: string
  weight: string
  quantity: number
}

const ProductGridServer = async () => {
  try {
    const productsCollection = collection(db, "products")
    const productsSnapshot = await getDocs(productsCollection)

    const products: Product[] = productsSnapshot.docs.map((doc) => {
      const productData = doc.data() as Omit<Product, "id">
      return {
        ...productData,
        id: doc.id
      } as Product
    })

    return <ProductGrid products={products} />
  } catch (error) {
    console.error("Error fetching products:", error)
    return <p>Error loading products. Please try again later.</p>
  }
}

export default ProductGridServer
