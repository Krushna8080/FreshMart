'use client';

import { useParams } from 'next/navigation';
import { blogPosts } from '@/data/blog';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface PageProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function BlogPostPage({ params, searchParams }: PageProps) {
  const post = blogPosts.find(post => post.id === params.id);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <Link href="/blog" className="text-green-600 hover:text-green-700 inline-flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-16"
    >
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/blog"
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="relative h-[400px]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="p-8">
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {post.date}
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <p className="text-gray-600 leading-relaxed mb-6">{post.content}</p>

            <div className="border-t pt-6">
              <Link
                href="/blog"
                className="text-green-600 hover:text-green-700 inline-flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
