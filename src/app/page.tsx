'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Truck, Shield, Clock, Leaf, Award, Tag, Heart, Mail, Smartphone, CreditCard, Gift, MapPin, ChevronRight } from 'lucide-react';
import { getFeaturedProducts, categories } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import React from 'react';

export default function Home() {
  const featuredProducts = getFeaturedProducts(4);

  const features = [
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Free Delivery",
      description: "Free delivery on orders over $50"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Payment",
      description: "100% secure payment methods"
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      title: "Fresh & Organic",
      description: "Fresh products from local farms"
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile App",
      description: "Shop easily with our mobile app"
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Easy Returns",
      description: "Hassle-free return policy"
    },
    {
      icon: <Gift className="h-6 w-6" />,
      title: "Special Offers",
      description: "Regular discounts & deals"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] bg-gradient-to-r from-green-900 via-green-800 to-green-700">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1920&h=1080&q=80"
            alt="Fresh groceries"
            fill
            priority
            className="object-cover opacity-40"
          />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Fresh Groceries<br />
              Delivered to Your Door
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Shop from our wide selection of fresh produce, dairy, meat, and pantry items. Get everything you need, delivered when you need it.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/catalog"
                className="bg-white text-green-700 hover:bg-green-50 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Shop Now
              </Link>
              <Link
                href="/about"
                className="bg-green-700 text-white hover:bg-green-600 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Shop With Us?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover the benefits of shopping at FreshMart
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <div className="text-green-600">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our wide range of fresh and quality products
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.slice(0, 6).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/categories/${category.slug}`}>
                  <div className="relative h-72 rounded-2xl overflow-hidden group cursor-pointer">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      priority={category.id === 'fruits-vegetables' || category.id === 'dairy-eggs' || category.id === 'meat-seafood'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                      <p className="text-white/90">{category.description}</p>
                      <div className="mt-4 flex items-center text-white font-medium">
                        <span>Shop Now</span>
                        <ChevronRight className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover our hand-picked selection of premium products at great prices
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose FreshMart?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best grocery shopping experience
            </p>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
            <p className="text-gray-600">
              We carefully select each product to ensure the highest quality for our customers
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Get your groceries delivered to your doorstep in as little as 2 hours
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Customer Satisfaction</h3>
            <p className="text-gray-600">
              Your satisfaction is our top priority, backed by our 100% guarantee
            </p>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Start Shopping Today
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Get fresh groceries delivered to your door with free delivery on orders over $50
              </p>
              <Link
                href="/catalog"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                Browse Our Products
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
} 