export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Benefits of Eating Seasonal Produce',
    excerpt: 'Discover why eating seasonal fruits and vegetables is better for your health and the environment.',
    content: 'Full article content here...',
    image: '/blog/seasonal-produce.jpg',
    author: 'Sarah Johnson',
    date: 'March 15, 2024',
    category: 'Healthy Living'
  },
  {
    id: '2',
    title: 'Easy Meal Prep Ideas for Busy Weekdays',
    excerpt: 'Learn how to prepare healthy meals in advance to save time during the week.',
    content: 'Full article content here...',
    image: '/blog/meal-prep.jpg',
    author: 'Mike Wilson',
    date: 'March 12, 2024',
    category: 'Cooking Tips'
  },
  {
    id: '3',
    title: 'Understanding Food Labels',
    excerpt: 'A comprehensive guide to reading and understanding nutrition labels on food products.',
    content: 'Full article content here...',
    image: '/blog/food-labels.jpg',
    author: 'Dr. Emily Chen',
    date: 'March 10, 2024',
    category: 'Education'
  },
  {
    id: '4',
    title: 'Sustainable Shopping Guide',
    excerpt: 'Tips for making environmentally conscious choices while grocery shopping.',
    content: 'Full article content here...',
    image: '/blog/sustainable-shopping.jpg',
    author: 'Tom Baker',
    date: 'March 8, 2024',
    category: 'Sustainability'
  }
]; 