"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db, doc, getDoc } from "@/lib/firebaseConfig";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  photo: string;
  description: string;
  weight: string;
}

const ProductDetail = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const id = params.id

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      const productRef = doc(db, "products", id as string);
      const productSnap = await getDoc(productRef);
      if (productSnap.exists()) {
        setProduct({ id: productSnap.id, ...productSnap.data() } as Product);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative w-full h-96 rounded-lg overflow-hidden">
          <Image
            src={product.photo}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{product.name}</h1>
          <p className="text-gray-500 text-sm mt-2">{product.weight}</p>
          <p className="text-gray-700 text-lg font-medium mt-4">${(product.price * quantity).toFixed(2)}</p>

          <div className="mt-4 flex items-center space-x-4">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              -
            </button>
            <span className="text-lg font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              +
            </button>
          </div>

          <div className="mt-6">
            <p>{product.description}</p>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <button className="w-full bg-orange-600 text-white py-3 rounded-lg text-sm font-medium transition hover:bg-gray-800">
              Add to Cart
            </button>
            <button className="w-full bg-black text-white py-3 rounded-lg text-sm font-medium transition hover:bg-black/70">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
