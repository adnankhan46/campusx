# CampusX - Campus Recruitment Platform

CampusX is a modern, real-time platform that bridges the gap between students and companies. It enables seamless job discovery, application management, and networking within the campus ecosystem.

##  Key Features

- **Real-time Chat & Notifications** - Instant messaging and live updates for users
- **Job Opportunities** - Companies post opportunities, students browse and apply
- **Application Management** - Track applications and manage hiring pipelines
- **Discussion Feed** - Post updates, comments, and community engagement
- **Payment Integration** - Secure payment processing for premium features
- **Admin Dashboard** - Platform management and user oversight
- **Rate Limiting & Security** - Protected APIs with authentication and error handling

##  User Roles

### Applicant (Students)
- Browse job opportunities
- Apply for positions
- View application status
- Participate in discussions
- Connect with other students
- Receive notifications

### Company (Recruiters)
- Post job opportunities
- Manage applications
- Process payments
- Track hiring pipeline
- Communicate with applicants

### Admin (Platform Managers)
- Oversee all platform activities
- Manage users and roles
- Monitor system health
- Handle disputes and reports

##  Tech Stack

**Backend:**
- Node.js + Express.js
- Socket.io (Real-time communication)
- RESTful API architecture

**Frontend:**
- React with Vite
- Redux (State management)
- Tailwind CSS (Styling)
- Firebase integration

**Database & Tools:**
- MongoDB (Data persistence)
- Payment Gateway Integration
- Webhook support (Dodo)

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or pnpm
- MongoDB
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/adnankhan46/campusx
   cd campusx
   ```

2. **Install dependencies**
   ```bash
   # Backend
   npm install
   # or
   pnpm install

   # Frontend
   cd client
   npm install
   # or
   pnpm install
   ```

3. **Setup environment variables**
   - Create `.env` file in root directory for backend
   - Create `.env.local` file in `client/` for frontend
   - Configure: Database URL, Firebase keys, Payment gateway credentials, etc.

4. **Run the application**
   ```bash
   # Backend (from root)
   npm run dev

   # Frontend (from client directory)
   cd client
   npm run dev
   ```

### Quick Start
```bash
# Install all dependencies
pnpm install && cd client && pnpm install && cd ..

# Start development server
pnpm dev
```

---

## Our Team

Garv Thakre : https://github.com/garvthakre   Adnan Khan : https://github.com/adnankhan46

**Join us in building the future of campus recruitment!**
