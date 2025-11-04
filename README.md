### LIVE LINK 
https://gsk-moneypoly-001.vercel.app/


# Full Stack AI Fianace Platform with Next JS, Supabase, Tailwind, Prisma, Inngest, ArcJet, Shadcn UI

```
DATABASE_URL=
DIRECT_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

GEMINI_API_KEY=

RESEND_API_KEY=

ARCJET_KEY=
```

# 📝 Description
Moneypoly is a smart expense categorization tool built with Next.js and React. It provides a user-friendly web interface and a powerful API to automatically classify your expenses, helping you gain valuable insights into your spending habits. Simplify your financial tracking and budgeting with Moneypoly!

# 📁 Project Structure
.
├── actions
│   ├── account.js
│   ├── budget.js
│   ├── dashboard.js
│   ├── seed.js
│   ├── send-email.js
│   └── transaction.js
├── app
│   ├── (auth)
│   │   ├── layout.js
│   │   ├── sign-in
│   │   │   └── [[...sign-in]]
│   │   │       └── page.jsx
│   │   └── sign-up
│   │       └── [[...sign-up]]
│   │           └── page.jsx
│   ├── (main)
│   │   ├── account
│   │   │   ├── [id]
│   │   │   │   └── page.jsx
│   │   │   └── _components
│   │   │       ├── account-chart.jsx
│   │   │       ├── no-pagination-transaction-table.jsx
│   │   │       └── transaction-table.jsx
│   │   ├── dashboard
│   │   │   ├── _components
│   │   │   │   ├── account-card.jsx
│   │   │   │   ├── budget-progress.jsx
│   │   │   │   └── transaction-overview.jsx
│   │   │   ├── layout.js
│   │   │   └── page.jsx
│   │   ├── layout.js
│   │   └── transaction
│   │       ├── _components
│   │       │   ├── recipt-scanner.jsx
│   │       │   └── transaction-form.jsx
│   │       └── create
│   │           └── page.jsx
│   ├── api
│   │   ├── inngest
│   │   │   └── route.js
│   │   └── seed
│   │       └── route.js
│   ├── globals.css
│   ├── layout.js
│   ├── lib
│   │   └── schema.js
│   ├── not-found.jsx
│   └── page.js
├── components
│   ├── create-account-drawer.jsx
│   ├── header.jsx
│   ├── hero.jsx
│   └── ui
│       ├── badge.jsx
│       ├── button.jsx
│       ├── calendar.jsx
│       ├── card.jsx
│       ├── checkbox.jsx
│       ├── drawer.jsx
│       ├── dropdown-menu.jsx
│       ├── input.jsx
│       ├── popover.jsx
│       ├── progress.jsx
│       ├── select.jsx
│       ├── slider.jsx
│       ├── sonner.jsx
│       ├── switch.jsx
│       ├── table.jsx
│       └── tooltip.jsx
├── components.json
├── data
│   ├── categories.js
│   └── landing.js
├── emails
│   └── template.jsx
├── hooks
│   └── use-fetch.js
├── jsconfig.json
├── lib
│   ├── arcjet.js
│   ├── checkUser.js
│   ├── inngest
│   │   ├── client.js
│   │   └── function.js
│   ├── prisma.js
│   └── utils.js
├── middleware.js
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── prisma
│   ├── migrations
│   │   ├── 20241204141034_init
│   │   │   └── migration.sql
│   │   ├── 20241205074927_remove_currency
│   │   │   └── migration.sql
│   │   ├── 20241205094020_remove_categories
│   │   │   └── migration.sql
│   │   ├── 20241205094352_remove_categories
│   │   │   └── migration.sql
│   │   ├── 20241206121749_budget
│   │   │   └── migration.sql
│   │   ├── 20241208092553_budget
│   │   │   └── migration.sql
│   │   ├── 20241208122341_budget
│   │   │   └── migration.sql
│   │   ├── 20241209133842_remove
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── public
│   ├── banner.jpeg
│   ├── logo-sm.png
│   └── logo.png
└── tailwind.config.js

# 🛠️ Development Setup
Node.js/JavaScript Setup
Install Node.js 
Install dependencies: npm install or yarn install
Start development server: npm run dev

