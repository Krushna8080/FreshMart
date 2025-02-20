# Grocery Store E-commerce

A modern e-commerce platform built with Next.js and Supabase, featuring a comprehensive shopping experience with user authentication, product management, and shopping cart functionality.

## 📁 Project Structure

```bash
├── .env.local                 # Environment variables for Supabase
├── .eslintrc.json            # ESLint configuration
├── .gitattributes            # Git attributes configuration
├── .gitignore                # Git ignore rules
├── next.config.js            # Next.js configuration
├── next.config.ts            # TypeScript Next.js configuration
├── package.json              # Project dependencies and scripts
├── postcss.config.mjs        # PostCSS configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── public/                   # Static files
├── scripts/                  # Project scripts
└── src/                      # Source code
    ├── app/                  # Next.js app directory
    │   ├── about/           # About page
    │   ├── account/         # User account management
    │   ├── auth/            # Authentication pages
    │   ├── blog/            # Blog section
    │   ├── cart/            # Shopping cart
    │   ├── catalog/         # Product catalog
    │   ├── categories/      # Product categories
    │   ├── checkout/        # Checkout process
    │   ├── contact/         # Contact page
    │   ├── faq/            # FAQ page
    │   ├── featured/       # Featured products
    │   ├── new-arrivals/   # New products
    │   ├── products/       # Product pages
    │   ├── search/         # Search functionality
    │   ├── globals.css     # Global styles
    │   ├── layout.tsx      # Root layout
    │   └── page.tsx        # Home page
    ├── components/          # Reusable components
    │   ├── ui/             # UI components
    │   ├── auth/           # Authentication components
    │   ├── layout/         # Layout components
    │   ├── ProductCard.tsx # Product display component
    │   └── CategoryCard.tsx# Category display component
    ├── contexts/           # React contexts
    ├── data/              # Data files
    ├── lib/               # Utility functions
    ├── types/             # TypeScript types
    └── middleware.ts      # Next.js middleware

```

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Deployment**: [Add deployment platform]

## 🔧 Environment Variables

Required environment variables in `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🛠️ Getting Started

1. **Clone the repository**
```bash
git clone [repository-url]
cd grocerystore
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
- Copy `.env.local.example` to `.env.local`
- Fill in your Supabase credentials

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Features

- 🔐 User Authentication
- 🛍️ Product Catalog
- 🔍 Search Functionality
- 🛒 Shopping Cart
- 💳 Checkout Process
- 👤 User Account Management
- 📱 Responsive Design
- 📝 Blog Section
- 📦 New Arrivals
- ⭐ Featured Products

## 🔒 Security Considerations

- Environment variables are properly configured
- Authentication is handled securely through Supabase
- API routes are protected
- Sensitive data is not exposed to the client

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

[Add license information here]

## 👥 Authors

[Add author information here]

## 🙏 Acknowledgments

- Next.js team
- Supabase team
- [Add other acknowledgments]
