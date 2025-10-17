import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getProducts } from "@/services/productService";

export default function Carousel() {
  const promotions = getProducts().filter((p) => p.onSale || p.featured);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="py-8 bg-white shadow-sm">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Promoções & Itens Mais Vendidos
      </h2>
      <div className="max-w-6xl mx-auto">
        <Slider {...settings}>
          {promotions.map((product) => (
            <div key={product.id} className="p-3">
              <div className="bg-gray-100 rounded-xl shadow hover:shadow-md transition-all">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-4 text-center">
                  <p className="font-semibold text-gray-800">{product.name}</p>
                  <p className="text-blue-600 font-bold">
                    R$ {product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
