"use client";

import React from 'react';
import Link from 'next/link';
import { Heart, Image as ImageIcon, Star } from 'lucide-react';
import { getMediaUrl } from '@/utils/media_url';
import Currency from '@/components/common/Currency';
import { useCartStore } from '@/lib/store/cart';
import { message } from 'antd';

export default function ProductCard({ product }: { product: any }) {
  const price = product.variants?.[0]?.price || 0;
  const addItem = useCartStore((state) => state.addToCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const variantId = product.variants?.[0]?.id;
    addItem({
      key: `${product.id}${variantId ? `-${variantId}` : ''}`,
      productId: product.id,
      name: product.name,
      price: Number(price),
      quantity: 1,
      image: product.mediaProducts?.[0]?.media?.url,
      variantId: variantId,
      slug: product.slug
    });
    message.success("Added to cart");
  };

  return (
    <div className="group flex flex-col h-full">
        {/* Image Container */}
        <div className="relative aspect-square bg-[#F5F5F7] rounded-2xl mb-4 overflow-hidden group-hover:bg-[#EAEAEB] transition-colors">
            <Link href={`/product/${product.slug}`} className="block w-full h-full p-6">
                {product.mediaProducts?.[0]?.media?.url ? (
                    <img 
                        alt={product.name} 
                        src={getMediaUrl(product.mediaProducts[0].media.url)} 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                        <ImageIcon size={48} strokeWidth={1.5} />
                    </div>
                )}
            </Link>
            
            <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 hover:text-red-500 transition-colors shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300">
                <Heart size={18} />
            </button>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1">
            <div className="flex justify-between items-start mb-1">
                <Link href={`/product/${product.slug}`} className="font-bold text-gray-900 hover:text-emerald-800 transition-colors text-lg line-clamp-1">
                    {product.name}
                </Link>
                <div className="font-bold text-green-600 shrink-0">
                    <Currency value={price} />
                </div>
            </div>

            <p className="text-gray-500 text-sm mb-2 line-clamp-1">
                {product.collections?.[0]?.name || product.description || "Uncategorized"}
            </p>

            {/* <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-emerald-500 text-emerald-500" />
                ))}
                <span className="text-xs text-gray-400 ml-1">(121)</span>
            </div> */}

            <button 
                onClick={handleAddToCart}
                className="w-full mt-auto py-2.5 rounded-full border border-gray-900 font-medium text-sm hover:bg-gray-900 hover:text-white transition-all active:scale-95"
            >
                Add to Cart
            </button>
        </div>
    </div>
  );
}
