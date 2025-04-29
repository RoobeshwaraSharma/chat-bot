# Chat-Bot Application

Chat-Bot is a **full-stack chatbot application** built with Next.js, React, and various modern web technologies, designed to interact with users via the OpenAI API. It is flexible, extendable, and highly customizable to meet the needs of different use cases.

## 🚀 Tech Stack

### Frontend

- **Next.js** (v15.2.4)
- **React** (v19.0.0)
- **Material Tailwind** for UI components
- **Lucide React** for icons
- **Tailwind CSS** for styling
- **Sonner** for toast notifications
- **clsx** for conditional class management

### Backend

- **Next.js API routes** for server-side logic
- **OpenAI API** for chatbot functionality

### Authentication & Authorization

- **No external authentication** (focus on frontend interactions)

### Dev & Tooling

- **ESLint** & **TypeScript** for code quality
- **Vercel** for deployment
- **Turbopack** for fast builds in development

## 📂 Project Structure

```
chat-bot/
│-- src/
│   ├── components/   # UI components (shadcn/ui)
│   ├── pages/        # Next.js pages
│   ├── utils/        # Helper functions
│-- public/           # Static assets
│-- .env.local        # Environment variables (local dev)
│-- package.json      # Dependencies & scripts
│-- tailwind.config.js # Tailwind CSS configuration
```

## 🛠 Setup & Installation

### Prerequisites

- **Node.js v16+**
- **NPM or Yarn**
- **Hugging Face API Key** (Sign up [here](https://huggingface.co/))

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/RoobeshwaraSharma/chat-bot.git
   cd new-shop
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Set up environment variables**
   Create a `.env.local` file in the root folder and add the following variables:
   ```sh
   NEXT_PUBLIC_BACKEND_URL="http://localhost:5000"
   API_TOKEN=
   ```
4. **Run the development server**
   ```sh
   npm run dev
   ```
   The app should now be running at [http://localhost:3000](http://localhost:3000)

## ⚙️ Available Scripts

### Development

```sh
npm run dev   # Start the Next.js dev server
npm run build # Build the project for production
npm run start # Start the production server
npm run lint  # Run ESLint
```

## 🔗 Resources

- **Hugging Face Documentation**: [https://huggingface.co/docs](https://huggingface.co/docs)
- **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)

## 📌 License

This project is licensed under the MIT License.
