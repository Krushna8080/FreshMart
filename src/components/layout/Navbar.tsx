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
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg' 
          : 'bg-white/90 backdrop-blur-lg'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and brand */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent group-hover:from-green-500 group-hover:to-green-300 transition-all duration-300">
              FreshMart
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-1">
              {[
                { href: '/catalog', label: 'Shop' },
                { href: '/categories', label: 'Categories' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' }
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
                    ${pathname === link.href 
                      ? 'bg-green-100 text-green-600' 
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Search Bar */}
            <div className="w-64">
              <Search />
            </div>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative p-2 rounded-full text-gray-600 hover:text-green-600 hover:bg-green-50 transition-all duration-300"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Account/Auth Links */}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/account"
                  className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 transition-all duration-300"
                >
                  <User className="h-5 w-5" />
                  <span>Account</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 transition-all duration-300"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 transition-all duration-300"
              >
                <User className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

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
            {user ? (
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