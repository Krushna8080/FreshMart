'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Truck, Users, ShieldCheck, Leaf } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { label: 'Happy Customers', value: '10K+' },
    { label: 'Products Available', value: '5000+' },
    { label: 'Cities Served', value: '25+' },
    { label: 'Years of Service', value: '5+' },
  ];

  const values = [
    {
      icon: <Leaf className="w-6 h-6" />,
      title: 'Fresh & Organic',
      description: 'We source the freshest organic produce directly from local farmers.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: 'Quality Guaranteed',
      description: 'Every product undergoes strict quality checks before reaching you.',
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Fast Delivery',
      description: 'Same-day delivery to ensure your groceries arrive fresh.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Customer First',
      description: 'Our dedicated team is here to assist you 24/7.',
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-green-900 to-green-700">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/banners/fresh-produce.jpg"
            alt="About FreshMart"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="relative h-full flex items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl px-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About FreshMart
            </h1>
            <p className="text-xl text-white/90">
              Your trusted partner in bringing fresh, quality groceries to your doorstep
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Founded in 2018, FreshMart began with a simple mission: to make fresh, quality groceries accessible to everyone. What started as a small local delivery service has grown into a trusted name in online grocery shopping.
              </p>
              <p>
                We work directly with local farmers and suppliers to ensure that only the freshest, highest-quality products reach your doorstep. Our commitment to quality, convenience, and customer satisfaction has helped us serve thousands of happy customers.
              </p>
              <p>
                Today, we continue to innovate and improve our services, making grocery shopping easier and more enjoyable for our customers.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative h-[400px] rounded-lg overflow-hidden"
          >
            <Image
              src="/banners/pantry.jpg"
              alt="Our Story"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-green-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do at FreshMart
            </p>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <div className="text-green-600">{value.icon}</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated people behind FreshMart
            </p>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'John Smith',
              position: 'Founder & CEO',
              image: '/banners/meat-seafood.jpg'
            },
            {
              name: 'Sarah Johnson',
              position: 'Head of Operations',
              image: '/banners/dairy-eggs.jpg'
            },
            {
              name: 'Michael Chen',
              position: 'Customer Experience',
              image: '/banners/bakery.jpg'
            }
          ].map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-gray-600">{member.position}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
} 