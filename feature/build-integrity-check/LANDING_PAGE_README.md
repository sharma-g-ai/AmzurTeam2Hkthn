# AI Test Master Landing Page

A comprehensive landing page with login and signup functionality for the AI Test Master platform, inspired by the design from https://ai-test-master-one.surge.sh/.

## Features

### Landing Page (`/landing`)
- **Modern Hero Section**: Eye-catching header with AI-powered testing messaging
- **Dashboard Preview**: Interactive dashboard showcase with real-time metrics
- **Test Management Demo**: Complete test suite management interface
- **Feature Showcase**: 6 key feature cards with detailed descriptions
- **Role-Based Solutions**: Tailored sections for QA Engineers, Developers, and Clients
- **Pricing Tiers**: Three pricing plans (Starter, Professional, Enterprise)
- **Integrations**: Popular tool integrations (GitHub, Jenkins, Selenium, JIRA)
- **Call-to-Action**: Multiple conversion points throughout the page

### Authentication Pages
- **Login Page (`/login`)**: Clean, modern login form with social auth options
- **Signup Page (`/signup`)**: Comprehensive registration with validation
- **Form Validation**: Real-time validation with error handling
- **Social Authentication**: Google and GitHub login options
- **Responsive Design**: Mobile-optimized forms

### Design Highlights
- **Light Theme**: Modern light UI with clean, professional appearance
- **Glassmorphism**: Subtle backdrop blur effects and translucent panels
- **Smooth Animations**: Hover effects and transitions
- **Responsive Layout**: Mobile-first design approach
- **Accessibility**: Focus states, keyboard navigation, screen reader support

## Tech Stack

- **React 18**: Latest React features with hooks
- **React Router**: Client-side routing for SPA navigation
- **CSS3**: Modern CSS with Grid, Flexbox, and custom properties
- **Responsive Design**: Mobile-first approach with breakpoints

## File Structure

```
src/
├── components/
│   ├── Landing/
│   │   ├── LandingPage.js      # Main landing page component
│   │   └── LandingPage.css     # Landing page styles
│   └── Auth/
│       ├── LoginPage.js        # Login page component
│       ├── SignupPage.js       # Signup page component
│       └── Auth.css           # Authentication styles
└── App.js                     # Main app with routing
```

## Routes

- `/landing` - Landing page
- `/login` - Login page
- `/signup` - Signup page
- `/` - AI Test Dashboard (existing)
- `/build-integrity-check` - Build Integrity Form (existing)
- `/qa-engineer-dashboard` - QA Engineer Dashboard (existing)

## Getting Started

1. Navigate to the project directory:
   ```bash
   cd "c:/Users/GeethaK.AMZURTECH/Desktop/build_integrity/AmzurTeam2Hkthn/feature/build-integrity-check"
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Visit the pages:
   - Landing Page: http://localhost:3000/landing
   - Login: http://localhost:3000/login
   - Signup: http://localhost:3000/signup
   - Main Dashboard: http://localhost:3000/

## Features Implemented

### Landing Page Sections
1. **Navigation Bar**: Fixed header with logo and action buttons
2. **Hero Section**: Main value proposition with statistics
3. **Dashboard Preview**: Live dashboard demonstration
4. **Test Management**: Test suite organization showcase
5. **Features Grid**: 6 detailed feature cards
6. **Role-Based Solutions**: 3 persona-specific sections
7. **Pricing Table**: 3-tier pricing with feature comparisons
8. **Integrations**: 4 popular tool integrations
9. **Call-to-Action**: Final conversion section
10. **Footer**: Links and company information

### Authentication Features
1. **Form Validation**: Real-time field validation
2. **Error Handling**: User-friendly error messages
3. **Loading States**: Submit button loading indicators
4. **Social Auth UI**: Google and GitHub buttons
5. **Navigation Links**: Seamless page transitions
6. **Responsive Forms**: Mobile-optimized layouts

### Interactive Elements
- Hover effects on cards and buttons
- Form validation with real-time feedback
- Smooth page transitions
- Responsive navigation
- Loading animations
- Social authentication buttons

## Customization

### Colors and Branding
The design uses a consistent color palette defined in CSS custom properties. Key colors:
- Primary: #3b82f6 (Blue)
- Secondary: #8b5cf6 (Purple)
- Success: #22c55e (Green)
- Error: #ef4444 (Red)
- Background: #ffffff (Light)
- Text: #1f2937 (Dark Gray)

### Content Updates
All text content can be easily updated in the respective component files:
- Landing page content in `LandingPage.js`
- Feature descriptions, pricing, and company information
- Authentication form labels and messages

### Styling
- Responsive breakpoints: 1024px, 768px, 480px
- Modern CSS features: Grid, Flexbox, CSS custom properties
- Smooth animations and transitions
- Accessibility-focused design

## Integration with Existing App

The landing page seamlessly integrates with your existing AI Test Master application:
- Maintains existing routing structure
- Uses consistent navigation patterns
- Redirects to main dashboard after authentication
- Preserves existing component architecture

This implementation provides a production-ready landing page that matches modern SaaS platform standards and provides an excellent user experience for potential customers.
