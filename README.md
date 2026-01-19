# VŌCE - Authority Broadcast Platform

<div align="center">
  <img src="docs/assets/voce-logo.png" alt="VŌCE Logo" width="120" />
  
  **"Everyone Can See, Few Can Speak"**
  
  A one-way broadcast platform where verified public figures share authentic opinions with the world.
  
  [Live Demo](https://voce-platform.vercel.app) · [System Design](docs/SYSTEM_DESIGN.md) · [API Docs](docs/API.md)
  
  ![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
  ![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)
  ![License](https://img.shields.io/badge/License-MIT-green)
</div>

---

## 🎯 The Problem

Social media today is broken:
- **Misinformation** spreads through fake accounts impersonating public figures
- **Toxic comments** drown out meaningful discourse
- **Engagement algorithms** prioritize controversy over authenticity
- **Noise** makes it impossible to hear authentic voices

## 💡 The Solution

VŌCE is a **read-only social platform** where:
- ✅ Only **verified authorities** (celebrities, experts, leaders) can post
- ✅ **Everyone** can view content without an account
- ✅ **No comments, no replies, no DMs** — zero toxicity by design
- ✅ **Minimal engagement** — just likes and follows, no viral mechanics

Think of it as **Twitter meets Substack meets Press Releases** — authentic voices, zero noise.

---

## 📸 Screenshots

<div align="center">
  <img src="docs/assets/feed-screenshot.png" alt="Feed View" width="80%" />
  <p><em>Trending Feed — Top voices from verified authorities</em></p>
</div>

<div align="center">
  <img src="docs/assets/discover-screenshot.png" alt="Discover View" width="80%" />
  <p><em>Discover — Browse authorities by category</em></p>
</div>

<div align="center">
  <img src="docs/assets/profile-screenshot.png" alt="Profile View" width="80%" />
  <p><em>Authority Profile — All posts from a single verified voice</em></p>
</div>

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        PLATFORM                             │
├──────────────────────────┬──────────────────────────────────┤
│      AUTHORITIES         │           AUDIENCE               │
│    (Verified Creators)   │      (Everyone Else)             │
├──────────────────────────┼──────────────────────────────────┤
│  • Post opinions         │  • View all content              │
│  • Upload media          │  • Like posts                    │
│  • Create channels       │  • Follow authorities            │
├──────────────────────────┼──────────────────────────────────┤
│  🔐 Verified identity    │  🌐 No account needed to browse  │
│  📝 Full posting rights  │  🔇 No comments/replies/DMs      │
└──────────────────────────┴──────────────────────────────────┘
```

For the complete system design including database schema, API design, scalability considerations, and interview discussion points, see [**SYSTEM_DESIGN.md**](docs/SYSTEM_DESIGN.md).

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/voce-platform.git
cd voce-platform

# Install dependencies
cd frontend
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
voce-platform/
├── README.md
├── docs/
│   ├── SYSTEM_DESIGN.md      # Complete system design document
│   ├── API.md                # API documentation
│   └── assets/               # Screenshots and diagrams
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Header.jsx
│   │   │   ├── PostCard.jsx
│   │   │   ├── AuthorityCard.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── ...
│   │   ├── pages/            # Route pages
│   │   │   ├── Feed.jsx
│   │   │   ├── Discover.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── ...
│   │   ├── hooks/            # Custom React hooks
│   │   ├── data/             # Mock data
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── .github/
    └── workflows/
        └── deploy.yml        # Auto-deploy to Vercel
```

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|-------|------------|-----|
| **Framework** | React 18 | Industry standard, hooks, concurrent features |
| **Build Tool** | Vite | Lightning fast HMR, optimized builds |
| **Styling** | Tailwind CSS | Utility-first, rapid prototyping |
| **Routing** | React Router 6 | Declarative routing |
| **State** | React Context + Hooks | Simple, no over-engineering |
| **Icons** | Lucide React | Beautiful, consistent icons |
| **Deployment** | Vercel | Zero-config, automatic previews |

---

## ✨ Features

### Implemented
- [x] Responsive feed with trending posts
- [x] Authority discovery with category filters
- [x] Authority profile pages
- [x] Follow/unfollow functionality
- [x] Like posts
- [x] Search authorities
- [x] Dark theme with ambient effects
- [x] Smooth animations and micro-interactions
- [x] Mobile responsive design

### Roadmap
- [ ] Backend API (Express/Fastify)
- [ ] Database integration (PostgreSQL/Supabase)
- [ ] Authentication (JWT)
- [ ] Media upload (S3)
- [ ] Real-time updates (WebSocket)
- [ ] Authority verification flow
- [ ] Analytics dashboard

---

## 🎨 Design Decisions

### Why No Comments?
Comments are the #1 source of toxicity on social media. By removing them entirely, we:
- Eliminate harassment and trolling
- Remove the incentive for provocative content
- Keep focus on the authority's authentic voice
- Simplify moderation to content-only

### Why Optional Accounts?
- **Browsing**: No account needed — universal access to all content
- **Engagement**: Account required only for likes and follows
- **Privacy**: Minimal data collection, no tracking

### Why Verified Only?
The platform's value comes from **trust**. Every post is guaranteed to come from a verified public figure, eliminating impersonation and misinformation at the source.

---

## 📊 System Design Highlights

For interviews and portfolio reviews, key talking points:

| Topic | Decision | Rationale |
|-------|----------|-----------|
| **Read:Write Ratio** | 99:1 | Drives caching strategy, CDN-first |
| **Feed Generation** | Fan-out on read | Works at scale with ~10K authorities |
| **Like Counts** | Eventually consistent | Redis counter + async DB sync |
| **Media Delivery** | S3 + CloudFront | Cost-effective, globally distributed |
| **Verification** | Manual + automated | High trust, quality control |

See [SYSTEM_DESIGN.md](docs/SYSTEM_DESIGN.md) for complete details.

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Portfolio: [yourportfolio.com](https://yourportfolio.com)

---

<div align="center">
  <strong>Built with ☕ and ambition</strong>
  <br />
  <sub>A portfolio project demonstrating full-stack system design capabilities</sub>
</div>
