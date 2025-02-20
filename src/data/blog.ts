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
    id: 'blog-1',
    title: 'The Benefits of Eating Seasonal Produce',
    excerpt: 'Discover why eating seasonal fruits and vegetables is better for your health and the environment.',
    content: `Eating seasonal produce isn't just a trend – it's a smart choice for your health, wallet, and the environment. When you eat fruits and vegetables that are in season, you're getting them at their peak nutritional value and flavor.

Seasonal produce is typically harvested at the right time, allowing the fruits and vegetables to naturally ripen on the plant. This results in better taste and higher nutrient content compared to out-of-season produce that's been transported long distances.

Here are some key benefits of eating seasonal:

1. Better Taste: Seasonal produce is harvested when it's ripe, resulting in better flavor and texture.

2. Higher Nutritional Value: Fresh, seasonal produce contains more vitamins and minerals than out-of-season alternatives.

3. Lower Cost: When produce is in season locally, it's usually more abundant and less expensive.

4. Environmental Impact: Seasonal eating reduces the need for long-distance transportation and artificial growing conditions.

5. Supporting Local Farmers: Buying seasonal often means supporting local agriculture and your community's economy.`,
    image: '/products/fruits-vegetables-1.jpg',
    author: 'Sarah Johnson',
    date: 'March 15, 2024',
    category: 'Healthy Living'
  },
  {
    id: 'blog-2',
    title: 'Easy Meal Prep Ideas for Busy Weekdays',
    excerpt: 'Learn how to prepare healthy meals in advance to save time during the week.',
    content: `Meal prepping is a game-changer for busy professionals and families. By spending a few hours on the weekend preparing meals, you can save time, money, and stress during the week.

Here are some practical meal prep strategies:

1. Batch Cooking Basics:
- Cook large portions of grains like rice or quinoa
- Roast multiple trays of vegetables
- Prepare protein sources in bulk (grilled chicken, baked tofu, etc.)

2. Smart Storage Solutions:
- Invest in quality glass containers
- Use mason jars for salads and overnight oats
- Label everything with dates

3. Mix and Match Components:
- Prepare versatile ingredients that can be used in different meals
- Create various sauces and dressings
- Keep fresh herbs and garnishes ready

4. Time-Saving Tips:
- Chop vegetables in advance
- Portion snacks into grab-and-go containers
- Prepare overnight oats for easy breakfasts

Remember to keep food safety in mind and properly store your prepped meals in the refrigerator or freezer.`,
    image: '/products/dairy-1.jpg',
    author: 'Mike Wilson',
    date: 'March 12, 2024',
    category: 'Cooking Tips'
  },
  {
    id: 'blog-3',
    title: 'Understanding Food Labels',
    excerpt: 'A comprehensive guide to reading and understanding nutrition labels on food products.',
    content: `Reading food labels can be overwhelming, but understanding them is crucial for making informed decisions about your diet. Here's a breakdown of what to look for:

1. Serving Size:
- Check the serving size first
- Compare it to how much you actually eat
- All nutritional information is based on this serving size

2. Calories:
- Consider your daily caloric needs
- Remember that quality matters as much as quantity
- Look at calories from fat

3. Important Nutrients to Monitor:
- Total Fat (especially saturated and trans fats)
- Sodium
- Added Sugars
- Fiber
- Protein
- Vitamins and Minerals

4. Ingredient List:
- Ingredients are listed by weight
- Watch out for added sugars under different names
- Be aware of common allergens

5. Claims and Certifications:
- "Natural" vs. "Organic"
- "Low-fat" vs. "Reduced fat"
- Understanding certification symbols

Remember that the goal is to make informed choices that align with your health goals.`,
    image: '/products/pantry-1.jpg',
    author: 'Dr. Emily Chen',
    date: 'March 10, 2024',
    category: 'Education'
  },
  {
    id: 'blog-4',
    title: 'Sustainable Shopping Guide',
    excerpt: 'Tips for making environmentally conscious choices while grocery shopping.',
    content: `Making sustainable choices at the grocery store can have a significant impact on the environment. Here's how to shop more sustainably:

1. Reduce Packaging Waste:
- Bring reusable shopping bags
- Choose products with minimal packaging
- Buy in bulk when possible
- Use reusable produce bags

2. Choose Local and Seasonal:
- Shop at farmers' markets
- Look for locally sourced products
- Buy seasonal produce
- Support local producers

3. Sustainable Food Choices:
- Consider plant-based alternatives
- Choose sustainably sourced seafood
- Look for certified organic products
- Reduce meat consumption

4. Minimize Food Waste:
- Plan meals in advance
- Buy only what you need
- Store food properly
- Use or freeze items before they spoil

5. Read Labels Carefully:
- Look for eco-certifications
- Check country of origin
- Understand sustainability claims
- Support brands with environmental commitments

Every small choice adds up to make a bigger impact on our planet's health.`,
    image: '/products/household-1.jpg',
    author: 'Tom Baker',
    date: 'March 8, 2024',
    category: 'Sustainability'
  }
]; 