import React from "react";
import { db, collection, getDocs } from "@/lib/firebaseConfig";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  photo: string;
  description: string;
  weight: string;
}

const ProductGrid = async () => {
  try {
    const productsCollection = collection(db, "products");
    const productsSnapshot = await getDocs(productsCollection);

    const products: Product[] = productsSnapshot.docs.map((doc) => {
      const productData = doc.data() as Omit<Product, 'id'>;
      return {
        ...productData,
        id: doc.id,
      } as Product;
    });

    return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {products.map((product) => (
          <li
            key={product.id}
            className="bg-white rounded-2xl shadow-lg p-4 transition-transform hover:scale-105 hover:shadow-xl"
          >
            <Link href={`/shop/${product.id}`} className="relative w-full rounded-lg overflow-hidden">
              <Image
                src={product.photo}
                alt={product.name}
                width={340}
                height={340}
                priority
                className="w-full rounded-lg"
              />
            </Link>
            <div className="mt-4 text-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {product.name}
              </h2>
              <p className="text-gray-500 text-sm mt-1">{product.weight}</p>
              <p className="text-gray-700 font-medium text-lg mt-2">
                ${product.price}
              </p>
            </div>
            <button className="mt-4 w-full bg-orange-600 text-white py-2 rounded-full text-sm font-medium transition hover:bg-orange-400">
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    // Important: Return a default value to prevent errors during rendering
    return <p>Error loading products. Please try again later.</p> // Or an empty <ul>, or a loading indicator.
  }
};

export default ProductGrid;