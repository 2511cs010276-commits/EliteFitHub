'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import BmiCalorieCalculator from '@/components/BmiCalorieCalculator';
import AiVoiceCoach from '@/components/AiVoiceCoach';
import TrainerVideoCall from '@/components/TrainerVideoCall';
import {
  Dumbbell,
  Users,
  Calendar,
  Layers,
  Sparkles,
  Shield,
  Activity,
  UserCheck,
  TrendingUp,
  MessageSquare,
  Lock,
  Mail,
  User,
  Plus,
  BookOpen,
  IndianRupee,
  ClipboardList,
  Scale,
  RefreshCw,
  Video,
  PhoneCall,
  Smartphone
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' });
  const [registerStatus, setRegisterStatus] = useState({ success: null, message: '' });
  const [registerLoading, setRegisterLoading] = useState(false);

  // User Role & Analytics States
  const [userRole, setUserRole] = useState('user'); // 'guest' | 'user' (customer) | 'admin'
  const [waterIntake, setWaterIntake] = useState(1500); // ml
  const [caloriesBurned, setCaloriesBurned] = useState(520); // kcal

  // Trainer list for content features
  const trainers = [
    {
      id: '1',
      name: 'Marcus Steele',
      specialties: ['Strength Training', 'Bodybuilding'],
      experience: 8,
      rates: 6000,
      rating: 4.9,
      reviewsCount: 142,
      image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=400&fit=crop&q=80',
    },
    {
      id: '2',
      name: 'Elena Rostova',
      specialties: ['Yoga', 'Pilates', 'Mobility'],
      experience: 6,
      rates: 5000,
      rating: 5.0,
      reviewsCount: 98,
      image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=400&fit=crop&q=80',
    },
    {
      id: '3',
      name: 'David Chen',
      specialties: ['HIIT', 'Athletic Conditioning'],
      experience: 5,
      rates: 5500,
      rating: 4.8,
      reviewsCount: 115,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop&q=80',
    },
  ];

  // Workout Plans list
  const workoutPlans = [
    {
      title: 'Hypertrophy Mastery',
      description: 'Focus on progressive overload to stimulate maximum muscle growth.',
      difficulty: 'Intermediate',
      weeks: 8,
      tag: 'Strength',
    },
    {
      title: 'HIIT Fat Shredder',
      description: 'High intensity interval training designed to accelerate metabolic rate.',
      difficulty: 'Beginner',
      weeks: 4,
      tag: 'Cardio',
    },
    {
      title: 'Core & Mobility Flow',
      description: 'Enhance stabilizer strength, flexibilities, and posture alignment.',
      difficulty: 'All Levels',
      weeks: 6,
      tag: 'Yoga',
    },
  ];

  // Registration handler
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterLoading(true);
    setRegisterStatus({ success: null, message: '' });

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerForm),
      });
      const data = await response.json();

      if (response.ok) {
        setRegisterStatus({ success: true, message: data.message });
        setRegisterForm({ name: '', email: '', password: '' });
        setUserRole('user');
        setTimeout(() => {
          setIsRegisterOpen(false);
          setRegisterStatus({ success: null, message: '' });
          setActiveTab('analytics');
        }, 2000);
      } else {
        setRegisterStatus({ success: false, message: data.error || 'Registration failed' });
      }
    } catch (err) {
      setRegisterStatus({ success: false, message: 'Something went wrong. Is MongoDB connected?' });
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-lime-400 selection:text-slate-900 font-sans pb-20">
      
      {/* Header/Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-lime-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-lime-500/20">
              <Dumbbell className="text-slate-950 w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              ELITEFIT <span className="text-lime-400">HUB</span>
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => setActiveTab('home')}
              className={`text-sm font-semibold tracking-wide transition-colors ${
                activeTab === 'home' ? 'text-lime-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`text-sm font-semibold tracking-wide transition-colors ${
                activeTab === 'calculator' ? 'text-lime-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              Health Tools
            </button>
            {userRole === 'user' && (
              <button
                onClick={() => setActiveTab('analytics')}
                className={`text-sm font-semibold tracking-wide transition-colors ${
                  activeTab === 'analytics' ? 'text-lime-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                My Analytics
              </button>
            )}
            <button
              onClick={() => setActiveTab('services')}
              className={`text-sm font-semibold tracking-wide transition-colors ${
                activeTab === 'services' ? 'text-lime-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              Programs & Bookings
            </button>
            <button
              onClick={() => setActiveTab('ai-coach')}
              className={`text-sm font-semibold tracking-wide transition-colors ${
                activeTab === 'ai-coach' ? 'text-lime-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              AI Voice Coach
            </button>
            <button
              onClick={() => setActiveTab('trainer-call')}
              className={`text-sm font-semibold tracking-wide transition-colors flex items-center gap-1.5 ${
                activeTab === 'trainer-call' ? 'text-lime-400 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Video className="w-4 h-4 text-[#25D366]" />
              Video Call Trainer
            </button>
            {userRole === 'admin' && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`text-sm font-semibold tracking-wide transition-colors ${
                  activeTab === 'admin' ? 'text-lime-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                Admin Dashboard
              </button>
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/trainer-call"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-xs font-bold text-[#25D366] transition-colors"
              title="Direct WhatsApp Video Call"
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              WhatsApp: 7981452169
            </Link>
            <select
              value={userRole}
              onChange={(e) => {
                setUserRole(e.target.value);
                setActiveTab('home');
              }}
              className="bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 rounded-xl px-3 py-2 outline-none focus:border-lime-400 cursor-pointer transition-colors hover:border-slate-700"
            >
              <option value="guest">Role: Guest</option>
              <option value="user">Role: Customer (Raja)</option>
              <option value="admin">Role: Admin</option>
            </select>
            <button
              onClick={() => setIsRegisterOpen(true)}
              className="px-5 py-2.5 rounded-xl text-slate-950 font-bold bg-lime-400 hover:bg-lime-300 transition-colors text-sm cursor-pointer shadow-md shadow-lime-500/10"
            >
              Join Elite
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 mt-8">
        <AnimatePresence mode="wait">
          
          {/* HOME TAB */}
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-20 py-8"
            >
              {/* Hero Section */}
              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-6 z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/20 text-xs font-semibold text-lime-400">
                    <Sparkles className="w-3.5 h-3.5" /> Unleash Your Elite Potential
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
                    BRIDGING FITNESS & <span className="bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">PROFESSIONAL</span> COACHING
                  </h1>
                  <p className="text-slate-400 text-lg max-w-xl">
                    EliteFit Hub connects fitness enthusiasts with premium certified personal trainers. Track metrics, access premium workouts, book schedules, and manage gyms within a singular, modern ecosystem.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <button
                      onClick={() => setActiveTab('trainer-call')}
                      className="px-6 py-3.5 bg-gradient-to-r from-[#25D366] to-emerald-500 hover:from-[#20bd5a] hover:to-emerald-400 text-slate-950 font-black rounded-xl transition-all duration-300 shadow-lg shadow-[#25D366]/20 flex items-center gap-2 cursor-pointer"
                    >
                      <Video className="w-5 h-5 text-slate-950" />
                      WhatsApp Video Call (7981452169)
                    </button>
                    <button
                      onClick={() => setActiveTab('calculator')}
                      className="px-6 py-3.5 bg-slate-900 border border-slate-800 hover:bg-slate-850 text-white font-bold rounded-xl transition-all duration-300 cursor-pointer"
                    >
                      Calculate BMI & Calories
                    </button>
                    <button
                      onClick={() => setActiveTab('services')}
                      className="px-5 py-3.5 bg-slate-900/60 border border-slate-800 hover:bg-slate-850 text-slate-300 rounded-xl font-bold transition-all duration-300 cursor-pointer"
                    >
                      Explore Programs
                    </button>
                  </div>
                </div>

                <div className="relative flex justify-center z-10">
                  {/* Visual mockup of the fitness dashboard */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl relative"
                  >
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 text-xs text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded-md font-semibold">
                      <Activity className="w-3 h-3 animate-pulse" /> Live Stats
                    </div>
                    <h3 className="font-bold text-white mb-4">Dashboard Preview</h3>
                    
                    <div className="space-y-4">
                      {/* Stat item */}
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-lime-400/10 flex items-center justify-center">
                            <TrendingUp className="text-lime-400 w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-400">Weekly Calorie Deficit</p>
                            <p className="text-sm font-bold text-white">3,500 kcal achieved</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-lime-400">Goal: 80%</span>
                      </div>

                      {/* Trainer Schedule Mockup */}
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                        <p className="text-xs text-slate-400 mb-2">Upcoming Session</p>
                        <div className="flex items-center gap-3">
                          <img
                            src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=100&h=100&fit=crop&q=80"
                            alt="Marcus"
                            className="w-9 h-9 rounded-full object-cover border border-slate-700"
                          />
                          <div>
                            <p className="text-sm font-bold text-white">Marcus Steele</p>
                            <p className="text-xs text-slate-400">Strength Training • Today at 3:00 PM</p>
                          </div>
                        </div>
                      </div>

                      {/* Workout Plan progress bar */}
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-white">Hypertrophy Mastery</span>
                          <span className="text-slate-400">Week 3 of 8</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-lime-400 h-full w-[37.5%]" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Gym Memberships Section */}
              <div className="py-12 border-t border-slate-900">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                  <h2 className="text-3xl font-extrabold text-white">Select Your Elite Membership</h2>
                  <p className="text-slate-400">
                    Transparent, Vercel-ready options crafted for local and premium digital users. No hidden signup fees.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Basic Plan */}
                  <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 hover:border-slate-700 transition-all flex flex-col justify-between">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-white">Basic Member</h3>
                        <p className="text-sm text-slate-400 mt-1">Gym access and fundamental tracking tools.</p>
                      </div>
                      <div className="text-4xl font-black text-white">
                        ₹2,499<span className="text-sm text-slate-400 font-medium">/month</span>
                      </div>
                      <ul className="space-y-3 text-sm text-slate-300">
                        <li className="flex items-center gap-2"><UserCheck className="w-4 h-4 text-lime-400" /> Standard gym floor access</li>
                        <li className="flex items-center gap-2"><UserCheck className="w-4 h-4 text-lime-400" /> BMI & calorie analysis tools</li>
                        <li className="flex items-center gap-2"><UserCheck className="w-4 h-4 text-lime-400" /> General workout templates</li>
                      </ul>
                    </div>
                    <button
                      onClick={() => setIsRegisterOpen(true)}
                      className="w-full mt-8 py-3 bg-slate-800 hover:bg-slate-750 font-bold rounded-xl text-sm transition-colors cursor-pointer"
                    >
                      Get Started
                    </button>
                  </div>

                  {/* Elite Plan (Recommended) */}
                  <div className="bg-slate-900 border-2 border-lime-400 rounded-3xl p-8 relative flex flex-col justify-between shadow-xl shadow-lime-500/5">
                    <div className="absolute top-0 right-8 -translate-y-1/2 bg-lime-400 text-slate-950 font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-lime-400/20">
                      Recommended
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-white">Elite Athlete</h3>
                        <p className="text-sm text-slate-400 mt-1">Our most popular plan for rapid fitness progress.</p>
                      </div>
                      <div className="text-4xl font-black text-lime-400">
                        ₹4,999<span className="text-sm text-slate-400 font-medium">/month</span>
                      </div>
                      <ul className="space-y-3 text-sm text-slate-300">
                        <li className="flex items-center gap-2"><UserCheck className="w-4 h-4 text-lime-400" /> 24/7 Premium gym access</li>
                        <li className="flex items-center gap-2"><UserCheck className="w-4 h-4 text-lime-400" /> 4 Personal coach sessions/month</li>
                        <li className="flex items-center gap-2"><UserCheck className="w-4 h-4 text-lime-400" /> Elite nutrition & custom guides</li>
                        <li className="flex items-center gap-2"><UserCheck className="w-4 h-4 text-lime-400" /> Advanced progress reports</li>
                      </ul>
                    </div>
                    <button
                      onClick={() => setIsRegisterOpen(true)}
                      className="w-full mt-8 py-3.5 bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-400 hover:to-emerald-400 text-slate-950 font-extrabold rounded-xl text-sm transition-all shadow-md shadow-lime-500/10 cursor-pointer"
                    >
                      Access Elite Tier
                    </button>
                  </div>

                  {/* VIP Plan */}
                  <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 hover:border-slate-700 transition-all flex flex-col justify-between">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-white">VIP Elite</h3>
                        <p className="text-sm text-slate-400 mt-1">Total health management and infinite support.</p>
                      </div>
                      <div className="text-4xl font-black text-white">
                        ₹7,999<span className="text-sm text-slate-400 font-medium">/month</span>
                      </div>
                      <ul className="space-y-3 text-sm text-slate-300">
                        <li className="flex items-center gap-2"><UserCheck className="w-4 h-4 text-lime-400" /> Unlimited coach hours</li>
                        <li className="flex items-center gap-2"><UserCheck className="w-4 h-4 text-lime-400" /> Dedicated bio-metric tracking</li>
                        <li className="flex items-center gap-2"><UserCheck className="w-4 h-4 text-lime-400" /> 1-on-1 private recovery room access</li>
                        <li className="flex items-center gap-2"><UserCheck className="w-4 h-4 text-lime-400" /> Gym apparel package & supplements</li>
                      </ul>
                    </div>
                    <button
                      onClick={() => setIsRegisterOpen(true)}
                      className="w-full mt-8 py-3 bg-slate-800 hover:bg-slate-750 font-bold rounded-xl text-sm transition-colors cursor-pointer"
                    >
                      Go VIP
                    </button>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {/* CALCULATOR TAB */}
          {activeTab === 'calculator' && (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="py-8"
            >
              <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Health Tools Suite</h1>
                <p className="text-slate-400">
                  Assess body mass, daily caloric expenditure, and review health recommendations built dynamically for your biology.
                </p>
              </div>
              <BmiCalorieCalculator />
            </motion.div>
          )}

          {/* CUSTOMER ANALYTICS TAB */}
          {activeTab === 'analytics' && userRole === 'user' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="py-8 space-y-8"
            >
              {/* Customer Welcome Header */}
              <div className="flex justify-between items-center flex-wrap gap-4 border-b border-slate-900 pb-6">
                <div>
                  <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
                    <Activity className="text-lime-400 w-7 h-7" /> My Fitness Analytics
                  </h1>
                  <p className="text-slate-400 text-sm mt-1">Real-time daily calorie burning tracker, activity stats, and goals.</p>
                </div>
                <div className="flex items-center gap-3">
                  {/* Calorie Burning Log Trigger */}
                  <button
                    onClick={() => {
                      setCaloriesBurned(prev => prev + 120);
                    }}
                    className="px-4 py-2 bg-lime-400 border border-lime-400/10 hover:bg-lime-300 text-slate-950 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-lime-500/10"
                  >
                    <Plus className="w-3.5 h-3.5" /> Log Workout (+120 kcal)
                  </button>
                </div>
              </div>

              {/* Analytics Summary Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Calories Burned Ring Widget */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between min-h-[140px]">
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Calories Burned</p>
                    <p className="text-3xl font-black text-lime-400 mt-1">{caloriesBurned} <span className="text-xs text-slate-400 font-medium">kcal</span></p>
                  </div>
                  <div className="w-full bg-slate-850 h-2 rounded-full overflow-hidden mt-3">
                    <div
                      className="bg-gradient-to-r from-lime-500 to-emerald-400 h-full transition-all duration-500"
                      style={{ width: `${Math.min((caloriesBurned / 700) * 100, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2 font-medium">
                    <span>Goal: 700 kcal</span>
                    <span>{Math.round((caloriesBurned / 700) * 100)}%</span>
                  </div>
                </div>

                {/* Water Intake Tracker Widget */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between min-h-[140px]">
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Water Intake</p>
                    <p className="text-3xl font-black text-white mt-1">{(waterIntake / 1000).toFixed(2)} <span className="text-xs text-slate-400 font-medium">Liters</span></p>
                  </div>
                  <div className="flex gap-2 items-center mt-3.5">
                    <button
                      onClick={() => setWaterIntake(prev => prev + 250)}
                      className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-750 text-white text-[10px] font-bold rounded-lg border border-slate-700/50 transition-colors"
                    >
                      + 1 Glass (250ml)
                    </button>
                    <button
                      onClick={() => setWaterIntake(0)}
                      className="p-1.5 bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white rounded-lg border border-slate-700/50 transition-colors cursor-pointer"
                      title="Reset"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Active Workout Sessions Widget */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between min-h-[140px]">
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active Exercise Time</p>
                    <p className="text-3xl font-black text-white mt-1">45 <span className="text-xs text-slate-400 font-medium">mins</span></p>
                  </div>
                  <span className="text-[10px] text-lime-400 font-bold bg-lime-400/10 px-1.5 py-0.5 rounded mt-3 w-max">
                    84% of daily target met
                  </span>
                </div>

                {/* Heart Rate Widget */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between min-h-[140px]">
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Avg Active Heart Rate</p>
                    <p className="text-3xl font-black text-rose-400 mt-1">138 <span className="text-xs text-slate-400 font-medium">bpm</span></p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium mt-3">
                    Aerobic training zone peak
                  </span>
                </div>
              </div>

              {/* Detail analytics layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Daily Calorie Burn Analytics Bar Chart */}
                <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between animate-fade-in">
                  <div>
                    <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
                      <TrendingUp className="text-lime-400 w-4 h-4" /> Weekly Calories Burned Trend
                    </h3>
                    
                    {/* CSS Bar Chart */}
                    <div className="flex justify-between items-end h-56 pt-4 px-2 border-b border-slate-800">
                      {[
                        { day: 'Mon', kcal: 450, color: 'bg-lime-400' },
                        { day: 'Tue', kcal: 320, color: 'bg-lime-400' },
                        { day: 'Wed', kcal: 500, color: 'bg-lime-400' },
                        { day: 'Thu', kcal: 120, color: 'bg-emerald-500' }, // Active recovery
                        { day: 'Fri', kcal: 620, color: 'bg-lime-400' },
                        { day: 'Sat', kcal: caloriesBurned, color: 'bg-gradient-to-t from-lime-500 to-emerald-400 animate-pulse' }, // Current day
                        { day: 'Sun', kcal: 0, color: 'bg-slate-800' }
                      ].map((d, idx) => (
                        <div key={idx} className="flex flex-col items-center flex-1 space-y-3">
                          <span className="text-[10px] font-bold text-slate-400">{d.kcal > 0 ? `${d.kcal}` : '-'}</span>
                          <div className="w-8 sm:w-10 bg-slate-950 rounded-t-lg overflow-hidden h-36 flex items-end">
                            <div
                              className={`w-full rounded-t-lg transition-all duration-500 ${d.color}`}
                              style={{ height: `${(d.kcal / 700) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-500 font-semibold">{d.day}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Weight Goal Progress widget */}
                <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
                      <Scale className="text-lime-400 w-4 h-4" /> Weight Goal Progress
                    </h3>

                    <div className="space-y-6">
                      <div className="grid grid-cols-3 text-center gap-2">
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-850">
                          <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Start</span>
                          <span className="text-sm font-bold text-white mt-1 block">74.0 kg</span>
                        </div>
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-850">
                          <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Current</span>
                          <span className="text-sm font-bold text-lime-400 mt-1 block">70.0 kg</span>
                        </div>
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-850">
                          <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Target</span>
                          <span className="text-sm font-bold text-white mt-1 block">68.0 kg</span>
                        </div>
                      </div>

                      {/* Weight progress bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400 font-semibold">Overall Goal Completion</span>
                          <span className="text-lime-400 font-bold">67.0%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-lime-400 h-full w-[67%]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-850 text-xs text-slate-400 leading-relaxed">
                    <span className="font-bold text-white block mb-1">Coach Note:</span>
                    "You have successfully shed 4 kg so far! Keep your daily activity consistent, stay hydrated at 3L+, and maintain your deficit."
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* AI VOICE COACH TAB */}
          {activeTab === 'ai-coach' && (
            <motion.div
              key="ai-coach"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="py-8"
            >
              <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Elite AI Voice Coach</h1>
                <p className="text-slate-400">
                  Select your daily focus and accent, tap the voice core to synthesize, and perform the workout actions along with the vocal instructions.
                </p>
              </div>
              <AiVoiceCoach />
            </motion.div>
          )}

          {/* SERVICES & PROGRAMS TAB */}
          {activeTab === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="py-8 space-y-16"
            >
              {/* Workout Programs */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <BookOpen className="text-lime-400 w-6 h-6" />
                  Premium Workout Programs
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {workoutPlans.map((plan, index) => (
                    <div key={index} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition-colors">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-lime-400 bg-lime-400/10 px-2.5 py-1 rounded-md">
                          {plan.tag}
                        </span>
                        <span className="text-xs text-slate-400 font-semibold">{plan.weeks} Weeks</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-white mb-2">{plan.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{plan.description}</p>
                      </div>
                      <div className="pt-2 flex justify-between items-center text-xs">
                        <span className="text-slate-500 font-medium">Difficulty</span>
                        <span className="text-slate-300 font-semibold">{plan.difficulty}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trainers Booking */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                  <Users className="text-lime-400 w-6 h-6" />
                  Book Certified Trainers
                </h2>
                <p className="text-slate-400 mb-6 text-sm max-w-xl">
                  Filter schedule slots, review training rates, and lock in session slots with our elite professionals.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {trainers.map((trainer) => (
                    <div key={trainer.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-colors">
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <img
                            src={trainer.image}
                            alt={trainer.name}
                            className="w-16 h-16 rounded-xl object-cover border border-slate-850"
                          />
                          <div>
                            <h3 className="font-bold text-white text-base">{trainer.name}</h3>
                            <p className="text-xs text-slate-400 mt-0.5">{trainer.experience} yrs experience</p>
                            <div className="flex items-center gap-1 mt-1 text-xs text-amber-400 font-semibold">
                              ★ {trainer.rating} <span className="text-slate-500">({trainer.reviewsCount} reviews)</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {trainer.specialties.map((specialty, idx) => (
                            <span key={idx} className="text-[10px] bg-slate-850 text-slate-300 border border-slate-800/80 px-2 py-0.5 rounded-md">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-850 flex items-center justify-between gap-2">
                        <div>
                           <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Rates</p>
                           <p className="text-lg font-extrabold text-white">₹{trainer.rates.toLocaleString('en-IN')} <span className="text-xs text-slate-400 font-medium">/ hr</span></p>
                        </div>
                        <div className="flex items-center gap-2">
                          <a
                            href="https://wa.me/917981452169?text=Hello%20Coach!%20I%20would%20like%20to%20start%20a%20direct%20WhatsApp%20Video%20Call%20session."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] rounded-xl border border-[#25D366]/30 transition-colors"
                            title="Direct WhatsApp Video Call (7981452169)"
                          >
                            <Video className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => setActiveTab('trainer-call')}
                            className="px-4 py-2 bg-lime-400 hover:bg-lime-300 text-slate-950 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                          >
                            Video Call
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ADMIN DASHBOARD TAB */}
          {activeTab === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="py-8 space-y-8"
            >
              <div className="flex justify-between items-center flex-wrap gap-4 border-b border-slate-900 pb-6">
                <div>
                  <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
                    <Shield className="text-lime-400 w-7 h-7" /> Admin Control Center
                  </h1>
                  <p className="text-slate-400 text-sm mt-1">Gym memberships, trainer scheduling pipelines, and member requests.</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-lime-400 bg-lime-400/10 px-3 py-1.5 rounded-xl border border-lime-400/10">
                  <Activity className="w-3.5 h-3.5 animate-pulse" /> SYSTEM OVERVIEW - OK
                </div>
              </div>

              {/* Stats Widgets Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Stat 1 */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
                  <Users className="absolute right-4 bottom-4 w-12 h-12 text-slate-800/60 pointer-events-none" />
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Gym Members</p>
                  <p className="text-3xl font-black text-white mt-1">1,248</p>
                  <span className="text-[10px] text-lime-400 font-bold bg-lime-400/10 px-1.5 py-0.5 rounded mt-3 inline-block">
                    +12% vs last month
                  </span>
                </div>

                {/* Stat 2 */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
                  <Calendar className="absolute right-4 bottom-4 w-12 h-12 text-slate-800/60 pointer-events-none" />
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Trainer Bookings</p>
                  <p className="text-3xl font-black text-white mt-1">84 <span className="text-sm font-medium text-slate-400">/ wk</span></p>
                  <span className="text-[10px] text-lime-400 font-bold bg-lime-400/10 px-1.5 py-0.5 rounded mt-3 inline-block">
                    95% capacity
                  </span>
                </div>

                {/* Stat 3 */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
                  <IndianRupee className="absolute right-4 bottom-4 w-12 h-12 text-slate-800/60 pointer-events-none" />
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Monthly Revenue</p>
                  <p className="text-3xl font-black text-lime-400 mt-1">₹4,82,500</p>
                  <span className="text-[10px] text-lime-400 font-bold bg-lime-400/10 px-1.5 py-0.5 rounded mt-3 inline-block">
                    Goal: ₹5,00,000
                  </span>
                </div>

                {/* Stat 4 */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
                  <MessageSquare className="absolute right-4 bottom-4 w-12 h-12 text-slate-800/60 pointer-events-none" />
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Unresolved Queries</p>
                  <p className="text-3xl font-black text-rose-400 mt-1">7</p>
                  <span className="text-[10px] text-rose-400 font-bold bg-rose-400/10 px-1.5 py-0.5 rounded mt-3 inline-block">
                    Action required
                  </span>
                </div>

              </div>

              {/* Admin Layout Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Active Trainer Schedules list */}
                <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                    <ClipboardList className="text-lime-400 w-4 h-4" /> Gym Trainer Roster & Schedules
                  </h3>
                  <div className="space-y-4">
                    {trainers.map((tr) => (
                      <div key={tr.id} className="p-4 bg-slate-950 rounded-xl border border-slate-850 flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={tr.image}
                            alt={tr.name}
                            className="w-10 h-10 rounded-full object-cover border border-slate-800"
                          />
                          <div>
                            <p className="text-sm font-bold text-white">{tr.name}</p>
                            <p className="text-xs text-slate-400">{tr.specialties.join(', ')}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-semibold text-lime-400">Available Today</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">8:00 AM - 4:00 PM</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer inquiries list */}
                <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                    <MessageSquare className="text-lime-400 w-4 h-4" /> Active Queries & Inquiries
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 text-xs">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-white">Sarah Jenkins</span>
                        <span className="text-rose-400 font-semibold bg-rose-400/5 px-2 py-0.5 rounded border border-rose-400/10">High</span>
                      </div>
                      <p className="text-slate-400 mt-1">"Having issues booking Elena for Wednesday afternoon slots. Help?"</p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 text-xs">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-white">Robert Dow</span>
                        <span className="text-amber-400 font-semibold bg-amber-400/5 px-2 py-0.5 rounded border border-amber-400/10">Medium</span>
                      </div>
                      <p className="text-slate-400 mt-1">"Can I upgrade from Basic to VIP athlete plan midway through the month?"</p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TRAINER VIDEO CALL TAB */}
          {activeTab === 'trainer-call' && (
            <motion.div
              key="trainer-call"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="py-6"
            >
              <TrainerVideoCall isStandalone={false} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-900 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-lime-400/10 flex items-center justify-center">
              <Dumbbell className="text-lime-400 w-4 h-4" />
            </div>
            <span className="font-bold text-white">EliteFit Hub</span>
          </div>
          <p>© {new Date().getFullYear()} EliteFit Hub. Prepared for Vercel Deployment.</p>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <Link href="/trainer-call" className="text-[#25D366] hover:underline flex items-center gap-1 font-bold">
              <Video className="w-3.5 h-3.5" /> WhatsApp Video Call (7981452169)
            </Link>
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">Terms</span>
            <span className="hover:text-white cursor-pointer">Support</span>
          </div>
        </div>
      </footer>

      {/* REGISTRATION MODAL */}
      <AnimatePresence>
        {isRegisterOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRegisterOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 md:p-8 shadow-2xl relative overflow-hidden z-10"
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-lime-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Lock className="text-lime-400 w-5 h-5" />
                Register for EliteFit Hub
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Register to log workouts, track body metrics, and book coaching sessions.
              </p>

              {registerStatus.message && (
                <div
                  className={`p-3 mb-4 rounded-xl text-xs font-semibold border ${
                    registerStatus.success
                      ? 'bg-emerald-400/5 text-emerald-400 border-emerald-400/20'
                      : 'bg-rose-400/5 text-rose-400 border-rose-400/20'
                  }`}
                >
                  {registerStatus.message}
                </div>
              )}

              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white outline-none focus:border-lime-400 transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="johndoe@email.com"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white outline-none focus:border-lime-400 transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white outline-none focus:border-lime-400 transition-colors text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={registerLoading}
                  className="w-full mt-4 py-3.5 bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-md shadow-lime-500/10 cursor-pointer flex items-center justify-center gap-2"
                >
                  {registerLoading ? 'Creating Account...' : 'Complete Sign Up'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
