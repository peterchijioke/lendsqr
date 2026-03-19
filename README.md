# Lendsqr Dashboard

A modern web application built with Next.js for managing users, loans, and financial operations. This dashboard provides comprehensive user management with filtering, pagination, and detailed user profiles.

## Tech Stack

- **Framework:** Next.js 16.1.7
- **UI Library:** React 19.2.3
- **Styling:** SCSS Modules
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
├── styles/                       # Global styles
│   └── _variables.scss          # Design system variables
├── data/                         # Mock data
│   └── mock-users.json          # User mock data (500 records)
└── Configuration files
    ├── next.config.ts
    ├── tsconfig.json
    ├── eslint.config.mjs
    └── package.json
```

## Features

### Authentication
- Login page with form validation
- Email and password authentication
- Native form validation

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
- Header with user info display from local storage
- Header search functionality that filters users table
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
- `/dashboard/users` - Users list with search and filters
- `/dashboard/users/[id]` - User details

## API Routes

- `/api/login` - User login
- `/api/stats` - Dashboard statistics
- `/api/users` - Users list with filtering
- `/api/users/[id]` - Individual user details
- `/api/organisations` - Organizations list

## API Endpoints

### Login API

```
POST /api/login
```

Authenticates a user and returns access token with user profile.

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "65f02d6c9d92",
      "firstName": "Akpan",
      "lastName": "Okon",
      "username": "admin_admin",
      "email": "okon@sqr.com",
      "organization": "LendSqr",
      "tier": 2,
      "accountNumber": "1029384756",
      "bankName": "GTBank",
      "status": "active"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock.payload.signature"
  }
}
```

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

This project uses **SCSS Modules** for component-scoped styles (`.module.scss` files).

### Design System Variables

The project includes a centralized design system in `styles/_variables.scss` with:

- **Colors:** Brand colors (teal, navy), neutral colors, text colors, status colors
- **Typography:** Font family (Work Sans), font sizes, font weights
- **Spacing:** Spacing scale from xs to 3xl
- **Border Radius:** Small, medium, large, extra large, and full radius values
- **Shadows:** Small to extra large shadow presets
- **Transitions:** Fast, base, and slow transition timings
- **Layout:** Sidebar width, header height values

Components import these variables using:
```scss
@use '../../styles/variables' as *;
```

## New Features

### User Information in Header
The header now displays the logged-in user's name fetched from local storage. When a user logs in, their profile information is stored in local storage under the key `lendsqr_user`. The header automatically displays the user's first and last name.

### Search Functionality
The global header search now integrates with the users table:
- Users can search for any user by name, email, phone number, or account number
- Search is performed by typing in the header search input and pressing Enter
- Results are displayed on the users page with real-time filtering
- Clearing the search input automatically resets and shows all users
- The search state is synced with URL parameters for shareable links

#### Search Fields
The search filters users by:
- Full name
- First name
- Last name
- Email address
- Phone number
- Account number

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
