import { Product, Category } from '@/types'

export const categories: Category[] = [
  {
    id: 'fruits-vegetables',
    name: 'Fruits & Vegetables',
    description: 'Fresh produce from local farms',
    image: '/categories/fruits-vegetables.jpg',
    slug: 'fruits-vegetables',
    subcategories: [
      'Fresh Fruits',
      'Fresh Vegetables',
      'Organic Produce',
      'Exotic Fruits',
      'Salad & Herbs'
    ]
  },
  {
    id: 'dairy-eggs',
    name: 'Dairy & Eggs',
    description: 'Fresh dairy products and eggs',
    image: '/categories/dairy-eggs.jpg',
    slug: 'dairy-eggs',
    subcategories: [
      'Milk',
      'Cheese',
      'Yogurt',
      'Butter',
      'Eggs'
    ]
  },
  {
    id: 'meat-seafood',
    name: 'Meat & Seafood',
    description: 'Quality meat and fresh seafood',
    image: '/categories/meat-seafood.jpg',
    slug: 'meat-seafood',
    subcategories: [
      'Chicken',
      'Beef',
      'Pork',
      'Fish',
      'Shellfish'
    ]
  },
  {
    id: 'bakery',
    name: 'Bakery',
    description: 'Fresh baked goods daily',
    image: '/categories/bakery.jpg',
    slug: 'bakery',
    subcategories: [
      'Bread',
      'Pastries',
      'Cakes',
      'Cookies',
      'Baking Supplies'
    ]
  },
  {
    id: 'pantry',
    name: 'Pantry',
    description: 'Essential grocery items',
    image: '/categories/pantry.jpg',
    slug: 'pantry',
    subcategories: [
      'Rice & Grains',
      'Pasta',
      'Canned Goods',
      'Condiments',
      'Spices'
    ]
  },
  {
    id: 'beverages',
    name: 'Beverages',
    description: 'Refreshing drinks and more',
    image: '/categories/beverages.jpg',
    slug: 'beverages',
    subcategories: [
      'Water',
      'Soft Drinks',
      'Coffee',
      'Tea',
      'Juices'
    ]
  },
  {
    id: 'snacks',
    name: 'Snacks',
    description: 'Delicious treats and snacks',
    image: '/categories/snacks.jpg',
    slug: 'snacks',
    subcategories: [
      'Chips',
      'Nuts',
      'Crackers',
      'Chocolates',
      'Candies'
    ]
  },
  {
    id: 'household',
    name: 'Household',
    description: 'Home and cleaning essentials',
    image: '/categories/household.jpg',
    slug: 'household',
    subcategories: [
      'Cleaning',
      'Paper Goods',
      'Laundry',
      'Kitchen Supplies',
      'Pet Supplies'
    ]
  }
]

// Generate products for all categories
export const products: Product[] = [
  // Fruits & Vegetables (25 products)
  ...Array(25).fill(null).map((_, i) => ({
    id: (i + 1).toString(),
    name: [
      'Organic Bananas', 'Fresh Apples', 'Ripe Avocados', 'Sweet Oranges', 'Fresh Strawberries',
      'Organic Tomatoes', 'Fresh Spinach', 'Organic Carrots', 'Fresh Broccoli', 'Sweet Potatoes',
      'Red Onions', 'Fresh Mushrooms', 'Organic Lettuce', 'Fresh Cucumbers', 'Bell Peppers',
      'Fresh Lemons', 'Organic Blueberries', 'Fresh Mangoes', 'Organic Kale', 'Fresh Zucchini',
      'Organic Potatoes', 'Fresh Garlic', 'Organic Ginger', 'Fresh Pineapple', 'Organic Celery'
    ][i],
    description: 'Fresh and locally sourced produce.',
    price: (2.99 + (i * 0.5)),
    image: `/products/fruits-vegetables-${(i % 5) + 1}.jpg`,
    category: 'Fruits & Vegetables',
    subcategory: i < 12 ? 'Fresh Fruits' : 'Fresh Vegetables',
    unit: i < 12 ? 'lb' : 'bunch',
    stock: 50 + Math.floor(Math.random() * 50),
    isPopular: i < 5,
    nutritionInfo: {
      calories: 50 + Math.floor(Math.random() * 100),
      protein: 1 + Math.floor(Math.random() * 5),
      carbs: 10 + Math.floor(Math.random() * 20),
      fat: Math.floor(Math.random() * 3),
      fiber: 2 + Math.floor(Math.random() * 4)
    }
  })),

  // Dairy & Eggs (20 products)
  ...Array(20).fill(null).map((_, i) => ({
    id: (i + 26).toString(),
    name: [
      'Whole Milk', 'Organic Eggs', 'Cheddar Cheese', 'Greek Yogurt', 'Butter',
      'Almond Milk', 'Cottage Cheese', 'Heavy Cream', 'Sour Cream', 'Mozzarella',
      'Cream Cheese', 'Organic Milk', 'Free-Range Eggs', 'Swiss Cheese', 'Plain Yogurt',
      'Oat Milk', 'String Cheese', 'Half & Half', 'Parmesan', 'Gouda Cheese'
    ][i],
    description: 'Fresh dairy products from local farms.',
    price: (3.49 + (i * 0.75)),
    image: `/products/dairy-${(i % 5) + 1}.jpg`,
    category: 'Dairy & Eggs',
    subcategory: i < 10 ? 'Milk & Cream' : 'Cheese',
    unit: i < 2 ? 'dozen' : i < 10 ? 'gallon' : 'lb',
    stock: 30 + Math.floor(Math.random() * 40),
    isPopular: i < 4,
    nutritionInfo: {
      calories: 100 + Math.floor(Math.random() * 150),
      protein: 6 + Math.floor(Math.random() * 8),
      carbs: 4 + Math.floor(Math.random() * 6),
      fat: 6 + Math.floor(Math.random() * 10),
    }
  })),

  // Meat & Seafood (15 products)
  ...Array(15).fill(null).map((_, i) => ({
    id: (i + 46).toString(),
    name: [
      'Chicken Breast', 'Ground Beef', 'Salmon Fillet', 'Pork Chops', 'Shrimp',
      'Turkey', 'Lamb Chops', 'Tuna Steak', 'Beef Steak', 'Tilapia',
      'Crab Meat', 'Chicken Wings', 'Ground Turkey', 'Cod Fillet', 'Mussels'
    ][i],
    description: 'Premium quality meat and seafood.',
    price: (8.99 + (i * 1.5)),
    image: `/products/meat-seafood-${(i % 5) + 1}.jpg`,
    category: 'Meat & Seafood',
    subcategory: i < 8 ? 'Meat' : 'Seafood',
    unit: 'lb',
    stock: 20 + Math.floor(Math.random() * 30),
    isPopular: i < 3
  })),

  // Bakery (15 products)
  ...Array(15).fill(null).map((_, i) => ({
    id: (i + 61).toString(),
    name: [
      'Sourdough Bread', 'Croissants', 'Chocolate Cake', 'Baguette', 'Muffins',
      'Bagels', 'Danish Pastry', 'Whole Wheat Bread', 'Cookies', 'Cinnamon Rolls',
      'Rye Bread', 'Cupcakes', 'Donuts', 'Pie', 'Brownies'
    ][i],
    description: 'Freshly baked goods.',
    price: (3.99 + (i * 0.8)),
    image: `/products/bakery-${(i % 5) + 1}.jpg`,
    category: 'Bakery',
    subcategory: i < 8 ? 'Bread' : 'Pastries',
    unit: 'piece',
    stock: 40 + Math.floor(Math.random() * 30),
    isPopular: i < 4
  })),

  // Pantry (15 products)
  ...Array(15).fill(null).map((_, i) => ({
    id: (i + 76).toString(),
    name: [
      'Rice', 'Pasta', 'Olive Oil', 'Tomato Sauce', 'Black Beans',
      'Cereal', 'Peanut Butter', 'Tuna Cans', 'Soup', 'Flour',
      'Sugar', 'Salt', 'Pepper', 'Coffee Beans', 'Tea Bags'
    ][i],
    description: 'Essential pantry items.',
    price: (4.99 + (i * 0.6)),
    image: `/products/pantry-${(i % 5) + 1}.jpg`,
    category: 'Pantry',
    subcategory: 'Essentials',
    unit: i < 5 ? 'lb' : 'pack',
    stock: 60 + Math.floor(Math.random() * 40),
    isPopular: i < 3
  })),

  // Beverages (10 products)
  ...Array(10).fill(null).map((_, i) => ({
    id: (i + 91).toString(),
    name: [
      'Bottled Water', 'Cola', 'Orange Juice', 'Coffee', 'Green Tea',
      'Sparkling Water', 'Energy Drink', 'Apple Juice', 'Iced Tea', 'Lemonade'
    ][i],
    description: 'Refreshing beverages.',
    price: (2.99 + (i * 0.7)),
    image: `/products/beverages-${(i % 5) + 1}.jpg`,
    category: 'Beverages',
    subcategory: i < 5 ? 'Cold Drinks' : 'Hot Drinks',
    unit: 'bottle',
    stock: 70 + Math.floor(Math.random() * 30),
    isPopular: i < 3
  })),

  // Snacks (10 products)
  ...Array(10).fill(null).map((_, i) => ({
    id: (i + 101).toString(),
    name: [
      'Potato Chips', 'Mixed Nuts', 'Popcorn', 'Chocolate Bar', 'Crackers',
      'Trail Mix', 'Pretzels', 'Candy', 'Granola Bars', 'Rice Cakes'
    ][i],
    description: 'Delicious snacks.',
    price: (3.49 + (i * 0.5)),
    image: `/products/snacks-${(i % 5) + 1}.jpg`,
    category: 'Snacks',
    subcategory: i < 5 ? 'Salty' : 'Sweet',
    unit: 'pack',
    stock: 80 + Math.floor(Math.random() * 20),
    isPopular: i < 3
  })),

  // Household (10 products)
  ...Array(10).fill(null).map((_, i) => ({
    id: (i + 111).toString(),
    name: [
      'Paper Towels', 'Dish Soap', 'Laundry Detergent', 'Trash Bags', 'Cleaning Spray',
      'Sponges', 'Toilet Paper', 'Air Freshener', 'Hand Soap', 'Tissues'
    ][i],
    description: 'Essential household items.',
    price: (5.99 + (i * 0.9)),
    image: `/products/household-${(i % 5) + 1}.jpg`,
    category: 'Household',
    subcategory: 'Cleaning',
    unit: 'pack',
    stock: 90 + Math.floor(Math.random() * 20),
    isPopular: i < 3
  }))
]

// Popular products
export const popularProducts = products.filter(product => product.isPopular)

// Get products by category
export const getProductsByCategory = (categorySlug: string) => {
  const category = categories.find(cat => cat.slug === categorySlug);
  if (!category) return [];
  
  return products.filter(product => 
    product.category === category.name
  );
}

// Get product by id
export const getProductById = (id: string) => {
  return products.find(product => product.id === id)
}

// Search products
export const searchProducts = (query: string) => {
  if (!query || query.trim().length === 0) return [];
  
  const searchTerms = query.toLowerCase().trim().split(/\s+/);
  
  return products.filter(product => {
    const productText = `${product.name} ${product.description} ${product.category} ${product.subcategory}`.toLowerCase();
    
    // All search terms must be found in the product text
    return searchTerms.every(term => productText.includes(term));
  }).sort((a, b) => {
    // Prioritize matches in name over other fields
    const aNameMatch = a.name.toLowerCase().includes(query.toLowerCase());
    const bNameMatch = b.name.toLowerCase().includes(query.toLowerCase());
    
    if (aNameMatch && !bNameMatch) return -1;
    if (!aNameMatch && bNameMatch) return 1;
    return 0;
  });
}

// Get products by subcategory
export const getProductsBySubcategory = (category: string, subcategory: string) => {
  return products.filter(product => 
    product.category.toLowerCase().replace(/\s+/g, '-') === category &&
    product.subcategory === subcategory
  )
}

// Get related products
export const getRelatedProducts = (productId: string, limit: number = 4) => {
  const product = getProductById(productId);
  if (!product) return [];
  
  return products
    .filter(p => p.category === product.category && p.id !== productId)
    .slice(0, limit);
}

// Get products on sale
export const getProductsOnSale = () => {
  return products.filter(product => product.isPopular);
}

// Get products by price range
export const getProductsByPriceRange = (minPrice: number, maxPrice: number) => {
  return products.filter(product => 
    product.price >= minPrice && 
    product.price <= maxPrice
  )
}

// Sort products
export const sortProducts = (products: Product[], sortBy: string) => {
  const sortedProducts = [...products]
  
  switch (sortBy) {
    case 'price-low':
      return sortedProducts.sort((a, b) => a.price - b.price)
    case 'price-high':
      return sortedProducts.sort((a, b) => b.price - a.price)
    case 'name':
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
    case 'popularity':
      return sortedProducts.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0))
    default:
      return sortedProducts
  }
}

export const getFeaturedProducts = (limit: number = 8) => {
  return products
    .filter(product => product.isPopular)
    .slice(0, limit);
}

export const getNewArrivals = () => {
  // For demo purposes, we'll consider the last 8 products as new arrivals
  return products.slice(-8);
};