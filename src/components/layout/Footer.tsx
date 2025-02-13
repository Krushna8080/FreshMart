'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Shop': [
      { label: 'All Products', href: '/catalog' },
      { label: 'Categories', href: '/categories' },
      { label: 'Featured', href: '/featured' },
      { label: 'New Arrivals', href: '/new-arrivals' }
    ],
    'About': [
      { label: 'Our Story', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Blog', href: '/blog' }
    ],
    
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Mail, href: 'mailto:contact@freshmart.com', label: 'Email' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and Description */}
          <div>
            <Link href="/" className="text-2xl font-bold">FreshMart</Link>
            <p className="mt-4 text-gray-400">
              Your one-stop shop for fresh groceries and everyday essentials. Quality products delivered to your doorstep.
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-lg font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>1234 Grocery St.</li>
              <li>Fresh City, FC 12345</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: info@freshmart.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {currentYear} FreshMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 