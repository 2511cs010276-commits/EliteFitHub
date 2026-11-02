# EliteFitHub

**EliteFit Hub** is a modern Next.js 16 application for fitness tracking, certified personal trainer management, BMI/calorie calculations, AI voice coaching, and direct WhatsApp 1-on-1 video consultations.

---

## 🚀 Key Features

- **Direct Trainer WhatsApp Video Call**: Instant 1-on-1 video consultation line with certified trainers via WhatsApp (+91 7981452169) at `/trainer-call`.
- **In-Browser Camera & Lighting Check**: Live webcam/phone camera preview to test room framing, posture distance (6-8 ft), and microphone before calling.
- **Custom Video Consultation Builder**: Dynamically constructs and encodes custom WhatsApp messages with specific goals, session topics, and timings.
- **Health Tools Suite**: Interactive BMI & Total Daily Energy Expenditure (TDEE) calculator with personalized biology advice.
- **AI Voice Coach**: Synthesizes vocal coaching reps, motivation, and cadence.
- **Customer Analytics Dashboard**: Daily calorie tracking, hydration logging, and weekly trend graphs.
- **Role-Based Views**: Switch seamlessly between Guest, Customer (User), and Admin dashboard.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Library**: React 19
- **Styling**: Tailwind CSS v4, Lucide React Icons
- **Animations**: Framer Motion
- **Database**: MongoDB with Mongoose
- **Authentication**: BcryptJS & JWT

---

## 🏁 Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

- Visit [http://localhost:3000/trainer-call](http://localhost:3000/trainer-call) to access the dedicated WhatsApp Video Consultation page.

---

## 📦 Build for Production

```bash
npm run build
npm start
```
