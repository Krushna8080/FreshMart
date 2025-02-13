'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ShoppingBag, Truck, CreditCard, RotateCcw } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  icon: JSX.Element;
  faqs: FAQ[];
}

const faqCategories: FAQCategory[] = [
  {
    title: 'Ordering & Delivery',
    icon: <Truck className="w-6 h-6" />,
    faqs: [
      {
        question: 'What are your delivery hours?',
        answer: 'We deliver from 8 AM to 9 PM, 7 days a week. For same-day delivery, please place your order before 2 PM.'
      },
      {
        question: 'Is there a minimum order value?',
        answer: 'Yes, the minimum order value is $30. Orders above $50 qualify for free delivery.'
      },
      {
        question: 'How long will my delivery take?',
        answer: 'Most orders are delivered within 2-4 hours. During peak times, it might take up to 6 hours.'
      }
    ]
  },
  {
    title: 'Products & Quality',
    icon: <ShoppingBag className="w-6 h-6" />,
    faqs: [
      {
        question: 'How do you ensure product freshness?',
        answer: 'We source products daily from local suppliers and maintain strict quality control measures. Our storage facilities are temperature-controlled to ensure optimal freshness.'
      },
      {
        question: 'What if I receive a damaged product?',
        answer: 'We have a 100% satisfaction guarantee. If you\'re not happy with any product, we\'ll replace it or refund your money.'
      },
      {
        question: 'Are your products organic?',
        answer: 'We offer both organic and conventional products. All organic products are clearly labeled and certified.'
      }
    ]
  },
  {
    title: 'Payment & Pricing',
    icon: <CreditCard className="w-6 h-6" />,
    faqs: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, debit cards, and digital wallets including Apple Pay and Google Pay.'
      },
      {
        question: 'When will I be charged for my order?',
        answer: 'You\'ll be charged when your order is confirmed. If any items are unavailable, we\'ll adjust the total accordingly.'
      },
      {
        question: 'Do you price match?',
        answer: 'Yes, we match prices from major local supermarkets. Just show us the competitor\'s current price.'
      }
    ]
  },
  {
    title: 'Returns & Refunds',
    icon: <RotateCcw className="w-6 h-6" />,
    faqs: [
      {
        question: 'What is your return policy?',
        answer: 'If you\'re not satisfied with any product, you can return it within 7 days for a full refund or replacement.'
      },
      {
        question: 'How do I request a refund?',
        answer: 'Contact our customer service through the app or website, or call us. We\'ll process your refund within 3-5 business days.'
      },
      {
        question: 'Can I modify or cancel my order?',
        answer: 'You can modify or cancel your order within 30 minutes of placing it. After that, please contact customer service.'
      }
    ]
  }
];

export default function FAQ() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const toggleCategory = (title: string) => {
    setOpenCategory(openCategory === title ? null : title);
    setOpenQuestion(null);
  };

  const toggleQuestion = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-gray-600">
          Find answers to common questions about our services
        </p>
      </div>

      <div className="space-y-6">
        {faqCategories.map((category) => (
          <div
            key={category.title}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggleCategory(category.title)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <div className="flex items-center gap-4">
                <div className="text-green-600">
                  {category.icon}
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {category.title}
                </h2>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  openCategory === category.title ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {openCategory === category.title && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="border-t px-6 pb-6">
                    {category.faqs.map((faq) => (
                      <div key={faq.question} className="border-b last:border-b-0">
                        <button
                          onClick={() => toggleQuestion(faq.question)}
                          className="w-full flex items-center justify-between py-4 text-left"
                        >
                          <h3 className="text-gray-900 font-medium pr-8">
                            {faq.question}
                          </h3>
                          <ChevronDown
                            className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${
                              openQuestion === faq.question ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {openQuestion === faq.question && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <p className="text-gray-600 pb-4">
                                {faq.answer}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
} 