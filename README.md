# 🔗 Shareable Link Generator with LLM-Powered Suggestions

A full-stack application where users can create unique shareable links and get automatic question suggestions using LLMs. Built with **Next.js**, **MongoDB**, **NextAuth**, and **TailwindCSS**.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)

---

## 🚀 Features


- 🌐 **Unique Link Creation** — Users can generate and share custom links with friends
- 🔐 **Authentication** — Secure login/signup using **NextAuth.js**
- 🧠 **LLM Integration** — Uses Large Language Models to suggest relevant questions automatically
- 💾 **Backend with MongoDB** — Persistent data storage using **Mongoose** and **MongoDB Atlas**
- ⚙️ **Full-stack Integration** — Seamless flow from user login to data storage and dynamic LLM suggestions
- 📱 **Responsive Design** — Mobile-first approach with TailwindCSS
- 🔒 **Secure** — Built-in security features and best practices

---

## 🧱 Tech Stack

### Frontend
- **Next.js** (App Router) - React framework for production
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS** - Utility-first CSS framework
- **React** - Component-based UI library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB Atlas** - Cloud database service
- **Mongoose** - MongoDB object modeling

### Authentication
- **NextAuth.js** - Authentication for Next.js

### AI/ML
- **OpenAI API** - Large Language Model integration
- **LLM-powered suggestions** - Automatic question generation

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Git** - Version control

---

## 📂 Project Structure

```
.
├── emails/                 # Email templates and configuration
├── public/                 # Static assets (images, icons, etc.)
├── src/                    # Main application source code
│   ├── components/         # Reusable React components
│   │   ├── ui/            # UI components
│   │   ├── forms/         # Form components
│   │   └── layout/        # Layout components
│   ├── pages/             # Next.js page routes
│   │   ├── api/           # API endpoints
│   │   ├── auth/          # Authentication pages
│   │   └── dashboard/     # Dashboard pages
│   ├── utils/             # Utility functions and helpers
│   │   ├── db.ts          # Database utilities
│   │   ├── auth.ts        # Authentication utilities
│   │   └── llm.ts         # LLM integration utilities
│   ├── lib/               # Core integrations
│   │   ├── mongodb.ts     # MongoDB connection
│   │   ├── auth.ts        # NextAuth configuration
│   │   └── openai.ts      # OpenAI API integration
│   ├── models/            # Mongoose schemas
│   │   ├── User.ts        # User model
│   │   └── Link.ts        # Link model
│   ├── types/             # TypeScript type definitions
│   └── styles/            # Custom CSS styles
├── .env.local             # Environment variables (not in repo)
├── .eslintrc.json         # ESLint configuration
├── .gitignore             # Git ignore rules
├── next.config.mjs        # Next.js configuration
├── package.json           # Project dependencies and scripts
├── postcss.config.mjs     # PostCSS configuration
├── tailwind.config.ts     # TailwindCSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** account
- **OpenAI API** key

### 1. Clone the Repository

```bash
git clone https://github.com/Aryan11072003/shareable-link-generator.git
cd shareable-link-generator
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000

# AI/ML
OPENAI_API_KEY=your_openai_api_key

# Optional: Email service (if using email features)
EMAIL_SERVER_HOST=your_email_host
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your_email_user
EMAIL_SERVER_PASSWORD=your_email_password
EMAIL_FROM=noreply@yourapp.com
```

### 4. Set Up MongoDB

1. Create a [MongoDB Atlas](https://www.mongodb.com/atlas) account
2. Create a new cluster
3. Get your connection string
4. Add it to your `.env.local` file

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 6. Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

---

## 🎯 Usage

### Creating Shareable Links

1. **Sign up/Login** using the authentication system
2. **Create a new link** from your dashboard
3. **Get LLM suggestions** for relevant questions
4. **Share your unique link** with others
5. **Track engagement** and responses



---

## 🔧 Configuration

### Tailwind CSS

The project uses a custom Tailwind configuration with:
- Custom color palette
- Extended spacing and typography
- Responsive breakpoints
- Dark mode support

### Next.js

Configured with:
- App Router for modern routing
- TypeScript support
- Optimized for production builds
- API routes for backend functionality

---

## 📱 Features in Detail

### Authentication System
- **NextAuth.js** integration
- Multiple provider support (Google, GitHub, etc.)
- Secure session management
- Protected routes and API endpoints

### LLM Integration
- **OpenAI GPT** integration
- Contextual question suggestions
- Natural language processing
- Customizable prompts and responses

### Database Operations
- **MongoDB** with Mongoose ODM
- User and link data models
- Optimized queries and indexing
- Data validation and sanitization

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms

The application can be deployed on:
- **Netlify**
- **Railway**
- **Heroku**
- **DigitalOcean App Platform**

---

## 📸 Screenshots

_Screenshots and demo GIFs coming soon..._

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📋 Roadmap

- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Advanced LLM models integration
- [ ] Webhook support
- [ ] Team collaboration features

---

## 🐛 Known Issues

- LLM suggestions may take a few seconds to load
- Large datasets might require pagination optimization

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Aryan**
- GitHub: [@Aryan11072003](https://github.com/Aryan11072003)
- LinkedIn: [Connect with me](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [MongoDB](https://www.mongodb.com/) for the database solution
- [OpenAI](https://openai.com/) for LLM capabilities
- [Vercel](https://vercel.com/) for hosting and deployment
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework

---

## 📞 Support

If you have any questions or need help, please:
- Open an [issue](https://github.com/Aryan11072003/shareable-link-generator/issues)
- Check the [documentation](https://github.com/Aryan11072003/shareable-link-generator/wiki)
- Contact me directly

---

⭐ **Star this repository if it helped you!**
