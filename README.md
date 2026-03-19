# Lendsqr Dashboard

A modern web application built with Next.js for managing users, loans, and financial operations. This dashboard provides comprehensive user management with filtering, pagination, and detailed user profiles.

## Tech Stack

- **Framework:** Next.js 16.1.7
- **UI Library:** React 19.2.3
- **Styling:** SCSS Modules + Tailwind CSS 4
- **Form Management:** React Hook Form 7.71.2
- **Validation:** Zod 4.3.6
- **Language:** TypeScript 5

## Project Structure

```
lendsqr/
├── app/                          # Next.js App Router pages
│   ├── (login)/                  # Login route group
│   │   ├── login.module.scss
│   │   └── page.tsx              # Login page
│   ├── api/                      # API routes
│   │   ├── stats/                # Stats API
│   │   │   └── route.ts          # Stats endpoint
│   │   ├── users/               # Users API
│   │   └── organisations/       # Organizations API
│   ├── dashboard/                # Dashboard routes
│   │   ├── layout.tsx            # Dashboard layout with sidebar
│   │   ├── (dashboard)/
│   │   │   └── page.tsx          # Main dashboard view
│   │   └── users/                # User management
│   │       ├── page.tsx          # Users list page
│   │       └── [id]/             # Dynamic user details
│   │           └── page.tsx      # Individual user details
│   ├── layout.tsx                # Root layout
│   └── favicon.ico
├── services/                     # Service layer
│   └── userService.ts            # User & stats service functions
├── components/                   # Reusable UI components
│   ├── filter-dropdown/          # Filter dropdown component
│   ├── header/                   # Header with notifications
│   ├── login-form/               # Login form component
│   ├── more-menu/                # More options menu
│   ├── pagination/               # Pagination controls
│   ├── sidebar/                  # Navigation sidebar
│   ├── table/                    # Generic table component
│   ├── user-details/             # User detail components
│   │   ├── detail-card/
│   │   ├── profile-card/
│   │   └── user-details-client/
│   └── users-table/              # Users table component
├── public/                       # Static assets
│   ├── icons/                    # SVG icon assets
│   └── login/                    # Login page assets
└── Configuration files
    ├── next.config.ts
    ├── tsconfig.json
    ├── eslint.config.mjs
    ├── postcss.config.mjs
    └── package.json
```

## Features

### Authentication
- Login page with form validation
- Email and password authentication
- Form error handling with Zod validation

### Dashboard
- Overview statistics display
- Active users tracking
- Loan management metrics
- Savings account overview

### User Management
- Paginated users table
- Filter users by organization, status, email, phone, date
- Search functionality
- User profile viewing
- Detailed user information cards

### UI Components
- Responsive sidebar navigation
- Header with notification bell
- Filter dropdown menus
- Custom tables
- Pagination controls
- More menu actions

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended), npm, or yarn

### Installation

```bash
# Install dependencies
pnpm install
# or
npm install
# or
yarn install
```

### Development

```bash
# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## Environment Variables

Create a `.env.local` file in the root directory for any required environment variables.

## Routing

- `/` - Redirects to login
- `/login` - Login page
- `/dashboard` - Main dashboard
- `/dashboard/users` - Users list
- `/dashboard/users/[id]` - User details

## API Routes

- `/api/stats` - Dashboard statistics
- `/api/users` - Users list with filtering
- `/api/users/[id]` - Individual user details
- `/api/organisations` - Organizations list

## API Endpoints

### Stats API

```
GET /api/stats
```

Returns dashboard statistics including total users, active users, users with loans, and users with savings.

Response:
```json
{
  "data": [
    {
      "label": "USERS",
      "value": "500",
      "icon": "/icons/users-dashboad.svg",
      "variant": "pink"
    },
    {
      "label": "ACTIVE USERS",
      "value": "132",
      "icon": "/icons/active-users.svg",
      "variant": "purple"
    },
    {
      "label": "USERS WITH LOANS",
      "value": "12,453",
      "icon": "/icons/users-with-loan.svg",
      "variant": "orange"
    },
    {
      "label": "USERS WITH SAVINGS",
      "value": "500",
      "icon": "/icons/users-with-savings.svg",
      "variant": "red"
    }
  ]
}
```

### Users API

```
GET /api/users
```

Query Parameters:
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 50) |
| org | string | Filter by organization |
| status | string | Filter by status (Active, Inactive, Pending, Blacklisted) |
| username | string | Search by username |
| email | string | Search by email |
| phone | string | Search by phone number |

Response:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 500,
    "totalPages": 10
  }
}
```

The API reads 500 mock user records from `data/mock-users.json` with realistic data including names, emails, phone numbers, organizations, and statuses.

## Mock Data Generation

The mock data was generated using [json-generator.com](https://json-generator.com/) with the following scripts:

### Batch 1 (250 records)
```javascript
JG.repeat(250, {
  id: JG.objectId(),
  firstName: JG.firstName(),
  lastName: JG.lastName(),
  username() {
    return (this.firstName + '.' + this.lastName).toLowerCase();
  },
  name() {
    return this.firstName + ' ' + this.lastName;
  },
  organization: JG.random('CreditPro','SwiftLoan','NaijaFund','AccessLend'),
  tier: JG.integer(1, 3),
  balance() {
    return JG.floating(10000, 500000, 2).toFixed(2);
  },
  accountNumber() {
    return JG.integer(1000000000, 9999999999).toString();
  },
  bankName: JG.random('Providus Bank','First Bank','Kuda Bank','OPay'),
  status: JG.random('active','inactive','pending','blacklisted'),
  dateJoined() {
    return moment(JG.date(new Date(2019,0,1), new Date(2024,0,1))).format('MMM D, YYYY HH:mm A');
  },
  avatar: null,
  personal: {
    phoneNumber() {
      return '0' + JG.integer(7000000000,9099999999);
    },
    emailAddress() {
      return JG.firstName().toLowerCase() + JG.lastName().toLowerCase() + '@yahoo.com';
    },
    maritalStatus: JG.random('Single','Married','Divorced')
  },
  guarantors: JG.repeat(2,{
    fullName() {
      return JG.firstName() + ' ' + JG.lastName();
    },
    phoneNumber() {
      return '0' + JG.integer(7000000000,9099999999);
    },
    relationship: JG.random('Mother','Father','Spouse','Colleague')
  })
})
```

### Batch 2 (250 records)
```javascript
JG.repeat(250, {
  id: JG.objectId(),
  firstName: JG.firstName(),
  lastName: JG.lastName(),
  username() {
    return (this.firstName + '_' + this.lastName).toLowerCase();
  },
  name() {
    return this.firstName + ' ' + this.lastName;
  },
  organization: JG.random('EasyBorrow','LendSqr','QuickFund','PayLater'),
  tier: JG.integer(1, 3),
  balance() {
    return JG.floating(5000, 300000, 2).toFixed(2);
  },
  accountNumber() {
    return JG.integer(1000000000, 9999999999).toString();
  },
  bankName: JG.random('Access Bank','GTBank','Zenith Bank','UBA'),
  status: JG.random('active','inactive','pending'),
  dateJoined() {
    return moment(JG.date(new Date(2020,0,1), new Date())).format('MMM D, YYYY HH:mm A');
  },
  avatar: null,
  personal: {
    phoneNumber() {
      return '0' + JG.integer(7000000000,9099999999);
    },
    emailAddress() {
      return JG.firstName().toLowerCase() + '.' + JG.lastName().toLowerCase() + '@gmail.com';
    },
    gender: JG.random('Male','Female')
  },
  guarantors: JG.repeat(1,{
    fullName() {
      return JG.firstName() + ' ' + JG.lastName();
    },
    phoneNumber() {
      return '0' + JG.integer(7000000000,9099999999);
    },
    relationship: JG.random('Sister','Brother','Friend')
  })
})
```

Note: Some fields vary between records (e.g., some have `maritalStatus` or `gender`, guarantor count varies between 1-2).

## Styling

This project uses a combination of:
- **SCSS Modules** - Component-scoped styles (`.module.scss`)
- **Tailwind CSS** - Utility-first styling

Styles are located alongside their components in respective `.module.scss` files.

## Bug Fixes

### Socials and Guarantors Display Issue (Fixed)

**Issue:** Socials and guarantors were showing "N/A" on the user details page despite the data existing in the mock data.

**Root Cause:** The user details page at `app/dashboard/users/[id]/page.tsx` was crashing when transforming the `education` data because:
- The mock data has `education.monthlyIncome` as a **string** (e.g., `"₦175000 - ₦501000"`)
- The code was expecting it to be an **object** with `min` and `max` properties

This caused a `TypeError` that prevented the entire page from rendering properly, which resulted in socials and guarantors showing as N/A.

**Solution:** Updated the employment transformation to handle both string and object formats for `monthlyIncome` and `loanRepayment`:

```typescript
monthlyIncome: typeof user.education.monthlyIncome === 'string' 
  ? user.education.monthlyIncome 
  : user.education.monthlyIncome 
    ? `₦${user.education.monthlyIncome.min?.toLocaleString("en-NG")}– ₦${user.education.monthlyIncome.max?.toLocaleString("en-NG")}`
    : "N/A",
```

## License

Private - All rights reserved
