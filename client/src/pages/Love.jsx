import React, { useState } from 'react';
import { Heart, Flower, ShoppingBag, Star, ArrowRight, Menu, X } from 'lucide-react';

const LoveAndPetalsHomepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const products = [
    {
      id: 1,
      name: "Modern Eucalyptus Hoop Wreath",
      price: "$89",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      category: "Wreaths"
    },
    {
      id: 2,
      name: "Blush Pink Bridal Bouquet",
      price: "$129",
      image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=400&h=400&fit=crop",
      category: "Bridal"
    },
    {
      id: 3,
      name: "Baby's Nursery Wall Arrangement",
      price: "$65",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      category: "Nursery"
    },
    {
      id: 4,
      name: "Traditional Rose Hoop Wreath",
      price: "$95",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      category: "Wreaths"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Flower className="w-8 h-8 text-rose-500" />
              <span className="text-2xl font-serif font-bold text-gray-800">Love & Petals</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-rose-500 transition-colors font-medium">Home</a>
              <a href="#" className="text-gray-700 hover:text-rose-500 transition-colors font-medium">Wreaths</a>
              <a href="#" className="text-gray-700 hover:text-rose-500 transition-colors font-medium">Bridal</a>
              <a href="#" className="text-gray-700 hover:text-rose-500 transition-colors font-medium">Nursery</a>
              <a href="#" className="text-gray-700 hover:text-rose-500 transition-colors font-medium">About</a>
              <button className="bg-rose-500 text-white px-6 py-2 rounded-full hover:bg-rose-600 transition-colors flex items-center space-x-2">
                <ShoppingBag className="w-4 h-4" />
                <span>Shop</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-4">
                <a href="#" className="text-gray-700 hover:text-rose-500 transition-colors font-medium">Home</a>
                <a href="#" className="text-gray-700 hover:text-rose-500 transition-colors font-medium">Wreaths</a>
                <a href="#" className="text-gray-700 hover:text-rose-500 transition-colors font-medium">Bridal</a>
                <a href="#" className="text-gray-700 hover:text-rose-500 transition-colors font-medium">Nursery</a>
                <a href="#" className="text-gray-700 hover:text-rose-500 transition-colors font-medium">About</a>
                <button className="bg-rose-500 text-white px-6 py-2 rounded-full hover:bg-rose-600 transition-colors flex items-center justify-center space-x-2 w-full">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-serif font-bold text-gray-800 leading-tight">
                  Handmade Flower
                  <span className="text-rose-500 block">Hoop Wreaths</span>
                  <span className="text-gray-600 text-lg font-normal block mt-4">
                    & Other Lovely Things
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Modern and traditional faux flower hoop wreaths, trendy floral arrangements, 
                  nursery decor as well as bridal bouquets and accessories. Every piece is the 
                  result of thorough stylistic creative research and meticulous selection of the finest materials.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-rose-500 text-white px-8 py-4 rounded-full hover:bg-rose-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 font-semibold">
                  <span>Shop Collection</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-rose-500 text-rose-500 px-8 py-4 rounded-full hover:bg-rose-500 hover:text-white transition-all duration-300 font-semibold">
                  View Gallery
                </button>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-600 font-medium">4.9 (120+ reviews)</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-full bg-gradient-to-br from-rose-200 to-purple-200 p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop" 
                  alt="Beautiful flower hoop wreath"
                  className="w-full h-full object-cover rounded-full shadow-2xl"
                />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
                <Heart className="w-6 h-6 text-rose-500" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-4 shadow-lg">
                <Flower className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">
              Featured Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular handcrafted pieces, each designed to bring 
              natural beauty and elegance to your special moments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div 
                key={product.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm text-rose-500 font-semibold bg-rose-50 px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                    <Heart className="w-5 h-5 text-gray-300 hover:text-rose-500 cursor-pointer transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-rose-500 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-bold text-gray-800">{product.price}</span>
                    <button className="bg-rose-500 text-white px-4 py-2 rounded-full hover:bg-rose-600 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-serif font-bold text-gray-800">
                The Love & Petals Boutique Experience
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                The "Love and Petals" boutique offers you original and gorgeous items suitable 
                for your home or your special day. Every "Love and Petals" piece is the result 
                of thorough stylistic creative research and the meticulous selection of the finest materials.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We are working every week on new exciting products that will offer that unique 
                touch to your home, so make sure to check our shop often for the latest additions 
                to our carefully curated collection.
              </p>
              <button className="bg-rose-500 text-white px-8 py-4 rounded-full hover:bg-rose-600 transition-colors flex items-center space-x-2 font-semibold">
                <span>Learn More About Us</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=400&fit=crop"
                alt="Crafting process"
                className="rounded-2xl shadow-lg h-60 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1520763185298-1b434c919102?w=300&h=400&fit=crop"
                alt="Beautiful arrangements"
                className="rounded-2xl shadow-lg h-60 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-rose-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-serif font-bold text-white">
              Stay Updated with New Collections
            </h2>
            <p className="text-xl text-rose-100">
              Be the first to know about our latest handcrafted pieces and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full border-0 focus:ring-4 focus:ring-white/30 outline-none"
              />
              <button className="bg-white text-rose-500 px-8 py-4 rounded-full hover:bg-gray-50 transition-colors font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Flower className="w-8 h-8 text-rose-500" />
                <span className="text-2xl font-serif font-bold">Love & Petals</span>
              </div>
              <p className="text-gray-300">
                Handcrafted floral arrangements and accessories for your most special moments.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Shop</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Hoop Wreaths</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Bridal Collection</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Nursery Decor</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Custom Orders</a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Contact Us</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Care Instructions</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Returns</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">FAQ</a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Pinterest</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Facebook</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Newsletter</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-300">
              © 2025 Love & Petals. All rights reserved. Made with love for your special moments.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoveAndPetalsHomepage;