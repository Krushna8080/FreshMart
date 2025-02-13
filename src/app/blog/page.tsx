'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'The Benefits of Organic Produce',
    excerpt: 'Discover why organic produce is not just a trend but a healthier choice for you and the environment.',
    image: '/blog/organic-produce.jpg',
    author: 'Sarah Johnson',
    date: 'Feb 15, 2024',
    category: 'Healthy Living'
  },
  {
    id: 2,
    title: 'Seasonal Cooking: Spring Edition',
    excerpt: 'Make the most of spring vegetables with these delicious and easy-to-follow recipes.',
    image: '/blog/seasonal-cooking.jpg',
    author: 'Chef Michael',
    date: 'Feb 12, 2024',
    category: 'Recipes'
  },
  {
    id: 3,
    title: 'Sustainable Shopping Guide',
    excerpt: 'Learn how to make environmentally conscious choices while grocery shopping.',
    image: '/blog/sustainable-shopping.jpg',
    author: 'Emma Green',
    date: 'Feb 10, 2024',
    category: 'Sustainability'
  },
  {
    id: 4,
    title: 'Understanding Food Labels',
    excerpt: 'A comprehensive guide to reading and understanding nutrition labels and food certifications.',
    image: '/blog/food-labels.jpg',
    author: 'Dr. James Wilson',
    date: 'Feb 8, 2024',
    category: 'Education'
  },
  {
    id: 5,
    title: 'Meal Prep for Busy Families',
    excerpt: 'Time-saving meal preparation tips and tricks for families on the go.',
    image: '/blog/meal-prep.jpg',
    author: 'Lisa Thompson',
    date: 'Feb 5, 2024',
    category: 'Tips & Tricks'
  },
  {
    id: 6,
    title: 'Farm to Table: Local Producers',
    excerpt: 'Meet the local farmers and producers who supply our fresh products.',
    image: '/blog/farm-to-table.jpg',
    author: 'John Davis',
    date: 'Feb 1, 2024',
    category: 'Community'
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">FreshMart Blog</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover tips, recipes, and insights about healthy living and sustainable shopping
            </p>
          </motion.div>
        </div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link href={`/blog/${blogPosts[0].id}`} className="group">
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <Image
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="inline-block px-4 py-1 rounded-full bg-green-500 text-white text-sm font-medium mb-4">
                  {blogPosts[0].category}
                </span>
                <h2 className="text-3xl font-bold text-white mb-4">{blogPosts[0].title}</h2>
                <p className="text-white/90 mb-4">{blogPosts[0].excerpt}</p>
                <div className="flex items-center text-white/80 text-sm">
                  <User className="h-4 w-4 mr-2" />
                  <span className="mr-4">{blogPosts[0].author}</span>
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{blogPosts[0].date}</span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.id}`} className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium mb-4">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 