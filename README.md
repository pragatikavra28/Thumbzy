# 🎨 Thumbzy – AI Thumbnail Generator

**Thumbzy** is a full-stack AI-powered thumbnail generation platform that helps creators generate customized, visually engaging thumbnails using AI-generated images.

Users can enter a **title, custom prompt, aspect ratio, visual style, and color scheme**, and Thumbzy generates a personalized thumbnail using **Hugging Face FLUX.1 Schnell**.

🔗 **Live Demo:** Add your deployed URL here  
🔗 **GitHub:** https://github.com/pragatikavra28/Thumbzy

---

## ✨ Features

### 🤖 AI-Powered Thumbnail Generation

- Generate thumbnails using **Hugging Face FLUX.1 Schnell**
- Create images from user-defined prompts
- Add custom thumbnail titles and descriptions
- Choose from multiple visual styles
- Select predefined color schemes
- Support multiple aspect ratios:
  - `16:9` – YouTube & landscape content
  - `1:1` – Social media posts
  - `9:16` – Shorts, Reels & Stories

### 🔐 Authentication & User Management

- User registration and login
- Secure password hashing using **bcrypt**
- Session-based authentication
- Protected API routes
- Persistent sessions using **MongoDB**
- Secure logout functionality

### 🖼️ Thumbnail Management

- View all generated thumbnails
- Search thumbnails by title
- Filter by visual style
- Filter by color scheme
- Sort by newest or oldest
- Mark thumbnails as favorites
- View favorite thumbnails separately
- Preview generated thumbnails
- Download thumbnails
- Delete thumbnails

### 📧 Contact System

- Integrated contact form
- Collects user name, email, and message
- Sends submitted messages directly to the configured email
- Powered by **Resend**

### ☁️ Cloud Image Storage

- Generated images are uploaded to **Cloudinary**
- Cloudinary URLs are stored with thumbnail metadata
- Efficient image retrieval without storing image files directly in MongoDB

### 🌗 Dark & Light Mode

- Dark theme
- Light theme
- Persistent theme preference using browser `localStorage`

### 📱 Responsive Design

- Fully responsive interface
- Optimized for desktop, mobile, and tablet
- Modern UI built using **React and Tailwind CSS**

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React.js | UI development |
| TypeScript | Type-safe development |
| React Router | Client-side routing |
| Tailwind CSS | Styling & responsive design |
| Axios | API communication |
| React Hot Toast | Notifications |
| Lucide React | UI icons |
| Vite | Frontend tooling & development |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| Express.js | REST API development |
| TypeScript | Type-safe backend development |
| MongoDB | Database |
| Mongoose | MongoDB object modeling |
| Express Session | Authentication sessions |
| Connect-Mongo | MongoDB session storage |
| bcrypt | Password hashing |
| CORS | Cross-origin communication |
| dotenv | Environment configuration |

### AI & External Services

| Service | Purpose |
|---|---|
| Hugging Face Inference API | AI image generation |
| FLUX.1 Schnell | Thumbnail generation model |
| Cloudinary | Image storage & delivery |
| Resend | Contact form email delivery |

### Deployment

- **Vercel** – Application deployment
- **MongoDB Atlas** – Cloud database

---

## 🏗️ Application Architecture

```text
                         ┌───────────────────┐
                         │       User        │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │  Login / Register │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │ Generate Thumbnail│
                         └─────────┬─────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
                    ▼              ▼              ▼
                  Title         Prompt        Customization
                                                  │
                              ┌───────────────────┤
                              │                   │
                              ▼                   ▼
                          Aspect Ratio         Style
                              │
                              ▼
                         Color Scheme
                              │
                              ▼
                    ┌───────────────────┐
                    │ Express REST API  │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ Hugging Face API  │
                    │   FLUX.1 Schnell  │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │  Generated Image  │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │    Cloudinary     │
                    │   Image Storage   │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │      MongoDB      │
                    │ Thumbnail Metadata│
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ Thumbnail Dashboard│
                    └───────────────────┘
```

---

## 🔐 Authentication Flow

Thumbzy uses **session-based authentication** to protect user data and thumbnail operations.

```text
User Login
    │
    ▼
Express Authentication API
    │
    ▼
Validate Credentials
    │
    ▼
bcrypt Password Verification
    │
    ▼
Create Session
    │
    ▼
MongoDB Session Store
    │
    ▼
Authenticated Requests
```

Protected routes require an authenticated session before users can:

- Generate thumbnails
- View their thumbnails
- Search and filter thumbnails
- Favorite thumbnails
- Delete thumbnails
- Access user-specific data

---

## 🔄 Thumbnail Generation Workflow

```text
User Input
   │
   ├── Title
   ├── Additional Prompt
   ├── Aspect Ratio
   ├── Visual Style
   └── Color Scheme
          │
          ▼
     Express REST API
          │
          ▼
   Hugging Face Inference API
          │
          ▼
      FLUX.1 Schnell
          │
          ▼
    AI Generated Image
          │
          ▼
       Cloudinary
          │
          ▼
        MongoDB
          │
          ▼
   Thumbnail Dashboard
```

---

## 📂 Core Functionality

### Dashboard

The dashboard provides users with a centralized space to manage their generated thumbnails.

Users can:

- Browse generated thumbnails
- Search by title
- Filter by style
- Filter by color scheme
- Sort by creation date
- Mark thumbnails as favorites
- Preview images
- Download images
- Delete thumbnails

### Thumbnail Customization

Thumbzy allows users to control the visual output before generation:

```text
Title
   +
Custom Prompt
   +
Visual Style
   +
Color Scheme
   +
Aspect Ratio
   ↓
AI Generated Thumbnail
```

---

## 🌐 Deployment

Thumbzy is deployed using **Vercel**, with **MongoDB Atlas** used for cloud database management.

Production environment variables are configured through the Vercel dashboard and are **not committed to the GitHub repository**.

### Environment Variables

Example configuration:

```env
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
HUGGINGFACE_API_KEY=your_huggingface_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RESEND_API_KEY=your_resend_api_key
```

> ⚠️ Never commit real API keys, database credentials, session secrets, or other sensitive environment variables to GitHub.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/pragatikavra28/Thumbzy.git
cd Thumbzy
```

### 2. Install dependencies

If the project contains separate frontend and backend directories:

```bash
cd frontend
npm install
```

Then install backend dependencies:

```bash
cd ../backend
npm install
```

### 3. Configure environment variables

Create `.env` files for the required environment variables and add your API credentials.

### 4. Start the development server

Frontend:

```bash
npm run dev
```

Backend:

```bash
npm run dev
```

The exact commands may vary depending on the project's package scripts.

---

## 📌 Project Highlights

- ⚡ Full-stack TypeScript application
- 🤖 AI-powered image generation
- 🔐 Session-based authentication
- ☁️ Cloud-based image storage
- 🗄️ MongoDB database integration
- 📧 Email communication system
- 🎨 Customizable thumbnail generation
- 📱 Responsive UI
- 🌗 Dark/light theme support
- 🔎 Search, filtering and sorting
- ❤️ Favorites management
- 🚀 Production deployment with Vercel

---

## 🔮 Future Improvements

Potential future enhancements include:

- 🎯 AI-powered thumbnail title suggestions
- 🧠 Multiple AI image-generation models
- ✏️ Built-in thumbnail editor
- 🖼️ Custom image uploads
- 📊 Thumbnail performance analytics
- 📚 Generation history
- 👥 Public thumbnail templates
- 🔗 Social media sharing
- 📦 Batch thumbnail generation
- 🎨 More advanced customization options

---

## 👩‍💻 Author

**Pragati Kavra**

B.Tech Computer Science & Engineering

### Connect With Me

- 💼 LinkedIn: https://linkedin.com/in/pragati-kavra-018960279
- 💻 GitHub: https://github.com/pragatikavra28

---

## ⭐ Support

If you found **Thumbzy** useful or interesting, consider giving the repository a ⭐ on GitHub!

---

### 🎨 Create. Customize. Click.

**Thumbzy — Turn your ideas into eye-catching thumbnails with AI.**
