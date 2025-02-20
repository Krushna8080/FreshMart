'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Search from '@/components/ui/Search';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const auth = useAuth();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      if (auth?.signOut) {
        await auth.signOut();
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-green-600">FreshMart</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/catalog" className="text-gray-600 hover:text-green-600">
              Shop
            </Link>
            <Link href="/categories" className="text-gray-600 hover:text-green-600">
              Categories
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-green-600">
              Blog
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-green-600">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-green-600">
              Contact
            </Link>
          </div>

          {/* Search Bar */}
          <div className="w-64">
            <Search />
          </div>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative text-gray-600 hover:text-green-600"
          >
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Account/Auth Links */}
          {auth?.user ? (
            <div className="relative">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center space-x-2 text-gray-600 hover:text-green-600"
              >
                <User className="h-6 w-6" />
                <span className="hidden md:inline">
                  {auth.user.email?.split('@')[0]}
                </span>
              </button>

              {isMobileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <Link
                    href="/account"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Account
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="text-gray-600 hover:text-green-600 flex items-center space-x-1"
            >
              <LogOut className="h-6 w-6" />
              <span className="hidden md:inline">Sign In</span>
            </Link>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link
              href="/cart"
              className="relative p-2 rounded-full text-gray-600 hover:text-green-600 hover:bg-green-50"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full text-gray-600 hover:text-green-600 hover:bg-green-50"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-[calc(100vh-5rem)] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-4 px-2">
            {/* Mobile Search */}
            <div className="pb-2">
              <Search />
            </div>

            {/* Mobile Navigation Links */}
            {[
              { href: '/catalog', label: 'Shop' },
              { href: '/categories', label: 'Categories' },
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' }
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2 text-base font-medium rounded-lg ${
                  pathname === link.href
                    ? 'bg-green-100 text-green-600'
                    : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Auth Links */}
            {auth?.user ? (
              <>
                <Link
                  href="/account"
                  className="block px-4 py-2 text-base font-medium rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Account
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-base font-medium rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="block px-4 py-2 text-base font-medium rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 