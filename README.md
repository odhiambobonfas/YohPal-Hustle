# YohPal Hustle

A modern, full-featured HUSTLER application connecting service providers with clients, built with Next.js, React, and TypeScript.

## 📋 Short Description

YohPal Hustle is a comprehensive platform that enables hustlers (service providers) to showcase their skills, manage jobs, track work history, and connect with clients. Built with cutting-edge web technologies, it provides a seamless experience across all devices.

## 🎯 Purpose

The YohPal Hustle application aims to:
- Connect skilled workers with clients seeking services
- Provide a professional platform for hustlers to manage their profiles and showcase their work
- Enable efficient job management and tracking
- Build trust through reviews, badges, and verified work history
- Streamline communication between service providers and clients

## ✨ Key Features

- **User Profiles**: Comprehensive profile management with badges, reviews, and work history
- **Job Management**: Track and manage jobs from application to completion
- **Dashboard**: Real-time overview of activities, earnings, and opportunities
- **Notifications**: Stay updated with job offers, messages, and platform updates
- **Reviews & Ratings**: Build reputation through client feedback
- **Organization Support**: Multi-tenant architecture for organizations
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Modern UI**: Built with Tailwind CSS and Lucide icons for a polished experience

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Yohpal-International-Limited/YohPal-Hustle.git
   cd YohPal-Hustle
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
YohPal-Hustle/
├── actions/              # Server actions for data mutations
├── app/                  # Next.js app directory
│   ├── (organization)/   # Organization-specific routes
│   ├── (yohpal)/        # Main application routes
│   │   ├── (profiles)/  # Profile management
│   │   │   ├── badges/
│   │   │   ├── edit-profile/
│   │   │   ├── reviews/
│   │   │   ├── settings/
│   │   │   └── workhistory/
│   │   ├── about/
│   │   ├── dashboard/
│   │   ├── help-and-support/
│   │   ├── myjobs/
│   │   └── notifications/
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/          # React components
│   ├── custom/         # Custom components
│   │   ├── app/        # App-specific components
│   │   └── organization/ # Organization components
│   └── ui/             # Reusable UI components
├── constants/          # Application constants
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and libraries
├── providers/          # Context providers
├── public/             # Static assets
├── services/           # API and service layer
│   ├── client/         # Client-side services
│   └── server/         # Server-side services
├── types/              # TypeScript type definitions
│   └── actions/        # Action type definitions
├── .eslintrc.json      # ESLint configuration
├── .gitignore          # Git ignore rules
├── next.config.mjs     # Next.js configuration
├── package.json        # Project dependencies
├── postcss.config.mjs  # PostCSS configuration
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## 🛠️ Development Guide

### Tech Stack

- **Framework**: Next.js 15.x (App Router)
- **Language**: TypeScript 5.x
- **UI Library**: React 19.x
- **Styling**: Tailwind CSS 3.x
- **Icons**: Lucide React
- **Linting**: ESLint

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Folder Guidelines

- **`/actions`**: Place server actions for form submissions and data mutations
- **`/app`**: Next.js pages and layouts using App Router
- **`/components/custom`**: Feature-specific components
- **`/components/ui`**: Reusable UI components (buttons, cards, etc.)
- **`/constants`**: Configuration constants and enums
- **`/hooks`**: Custom React hooks for shared logic
- **`/lib`**: Utility functions, helpers, and third-party integrations
- **`/providers`**: React Context providers for global state
- **`/services/client`**: Client-side API calls and data fetching
- **`/services/server`**: Server-side API routes and database operations
- **`/types`**: TypeScript interfaces and type definitions

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules configured in `.eslintrc.json`
- Use functional components with hooks
- Implement proper error handling
- Write meaningful commit messages

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
   - Write clean, documented code
   - Follow the existing code style
   - Add tests if applicable
4. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```
5. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request**
   - Provide a clear description of changes
   - Reference any related issues

### Contribution Guidelines

- Ensure code passes linting: `npm run lint`
- Test your changes thoroughly
- Update documentation as needed
- Keep pull requests focused and atomic
- Be respectful and constructive in discussions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support & Resources

- **Documentation**: [Coming Soon]
- **Issues**: [GitHub Issues](https://github.com/Yohpal-International-Limited/YohPal-Hustle/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Yohpal-International-Limited/YohPal-Hustle/discussions)
- **Email**: support@yohpal.com

## 🙏 Acknowledgments

Built with modern web technologies:
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

---

**Ready to start hustling?** 🚀 Get started by following the Quick Start guide above!
