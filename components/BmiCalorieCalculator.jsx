'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Flame, Dumbbell, TrendingDown, TrendingUp, Sparkles, Activity } from 'lucide-react';

export default function BmiCalorieCalculator() {
  const [weight, setWeight] = useState(70); // kg
  const [height, setHeight] = useState(175); // cm
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [results, setResults] = useState(null);

  const calculateMetrics = () => {
    // 1. BMI Calculation
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    let bmiCategory = '';
    let bmiColor = '';
    let bmiAdvice = '';

    if (bmi < 18.5) {
      bmiCategory = 'Underweight';
      bmiColor = 'text-blue-400 border-blue-400/20 bg-blue-400/5';
      bmiAdvice = 'Focus on nutrient-dense foods and strength training to build healthy mass.';
    } else if (bmi >= 18.5 && bmi < 25) {
      bmiCategory = 'Normal Weight';
      bmiColor = 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5';
      bmiAdvice = 'Great job! Maintain your current routine and focus on functional fitness.';
    } else if (bmi >= 25 && bmi < 30) {
      bmiCategory = 'Overweight';
      bmiColor = 'text-amber-400 border-amber-400/20 bg-amber-400/5';
      bmiAdvice = 'Consider a moderate calorie deficit combined with consistent aerobic and weight training.';
    } else {
      bmiCategory = 'Obese';
      bmiColor = 'text-rose-400 border-rose-400/20 bg-rose-400/5';
      bmiAdvice = 'Focus on cardiovascular health, calorie management, and consult a professional trainer.';
    }

    // 2. BMR (Harris-Benedict Equation)
    let bmr = 0;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    // 3. TDEE (Total Daily Energy Expenditure)
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    };
    const tdee = Math.round(bmr * activityMultipliers[activityLevel]);

    setResults({
      bmi,
      bmiCategory,
      bmiColor,
      bmiAdvice,
      tdee,
      bmr: Math.round(bmr),
      deficit: tdee - 500,
      surplus: tdee + 500,
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Input Panel */}
        <div className="lg:col-span-6 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="text-lime-400 w-6 h-6 animate-pulse" />
            Body Metrics Calculator
          </h2>

          <div className="space-y-6">
            {/* Gender Toggle */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Gender</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setGender('male')}
                  className={`py-3 px-4 rounded-xl font-medium transition-all duration-300 border ${
                    gender === 'male'
                      ? 'bg-gradient-to-r from-lime-500 to-emerald-500 text-slate-950 border-lime-400 shadow-lg shadow-lime-500/20'
                      : 'bg-slate-800/50 hover:bg-slate-800 text-slate-300 border-slate-700/50'
                  }`}
                >
                  Male
                </button>
                <button
                  onClick={() => setGender('female')}
                  className={`py-3 px-4 rounded-xl font-medium transition-all duration-300 border ${
                    gender === 'female'
                      ? 'bg-gradient-to-r from-lime-500 to-emerald-500 text-slate-950 border-lime-400 shadow-lg shadow-lime-500/20'
                      : 'bg-slate-800/50 hover:bg-slate-800 text-slate-300 border-slate-700/50'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            {/* Height Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Height</label>
                <span className="text-lg font-bold text-lime-400">{height} <span className="text-xs text-slate-400">cm</span></span>
              </div>
              <input
                type="range"
                min="120"
                max="220"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-lime-400"
              />
            </div>

            {/* Weight Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Weight</label>
                <span className="text-lg font-bold text-lime-400">{weight} <span className="text-xs text-slate-400">kg</span></span>
              </div>
              <input
                type="range"
                min="40"
                max="160"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-lime-400"
              />
            </div>

            {/* Age Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Age</label>
                <span className="text-lg font-bold text-lime-400">{age} <span className="text-xs text-slate-400">years</span></span>
              </div>
              <input
                type="range"
                min="15"
                max="80"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-lime-400"
              />
            </div>

            {/* Activity Level */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Activity Level</label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
                className="w-full py-3.5 px-4 bg-slate-800/80 border border-slate-700/50 rounded-xl text-white outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors"
              >
                <option value="sedentary">Sedentary (Little/no exercise)</option>
                <option value="light">Lightly Active (Exercise 1-3 days/week)</option>
                <option value="moderate">Moderately Active (Exercise 3-5 days/week)</option>
                <option value="active">Active (Hard exercise 6-7 days/week)</option>
                <option value="very_active">Extremely Active (Athletic/Physical job)</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              onClick={calculateMetrics}
              className="w-full mt-4 py-4 px-6 bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-400 hover:to-emerald-400 text-slate-950 font-bold text-base rounded-2xl transition-all duration-300 shadow-lg shadow-lime-500/10 hover:shadow-lime-400/20 active:scale-[0.98]"
            >
              Calculate Metrics
            </button>
          </div>
        </div>

        {/* Right Side: Results Panel */}
        <div className="lg:col-span-6 flex flex-col justify-center h-full min-h-[500px]">
          <AnimatePresence mode="wait">
            {!results ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center p-8 text-center bg-slate-900/40 border border-slate-800/50 rounded-3xl h-[450px]"
              >
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                  <Scale className="text-slate-500 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Metrics Pending</h3>
                <p className="text-slate-400 max-w-sm text-sm">
                  Enter your physical details on the left and click "Calculate Metrics" to view your BMI and customized daily calorie goals.
                </p>
              </motion.div>
            ) : (
              /* Antigravity floating card animation */
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: [0, -8, 0] // continuous floating sequence
                }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{
                  y: {
                    repeat: Infinity,
                    duration: 6,
                    ease: 'easeInOut',
                  },
                  default: { duration: 0.4 } // snap-in duration
                }}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
              >
                {/* Glowing badge design */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-lime-500 via-emerald-400 to-lime-500 rounded-b-full shadow-lg" />
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-lime-500/10 rounded-full blur-2xl" />
                
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white tracking-wide uppercase">Your Fitness Report</h3>
                  <div className="flex items-center gap-1 text-xs font-semibold text-lime-400 bg-lime-400/10 px-3 py-1 rounded-full">
                    <Sparkles className="w-3.5 h-3.5" /> Customized
                  </div>
                </div>

                {/* Score Section */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* BMI Widget */}
                  <div className="bg-slate-850 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-center">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Body Mass Index</span>
                    <span className="text-4xl font-extrabold text-white mt-1 leading-none">{results.bmi}</span>
                    <span className={`inline-block mt-3 text-xs font-bold border py-1 px-2.5 rounded-lg w-max ${results.bmiColor}`}>
                      {results.bmiCategory}
                    </span>
                  </div>

                  {/* Daily Caloric Requirement Widget */}
                  <div className="bg-slate-850 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-center">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Maintenance TDEE</span>
                    <span className="text-4xl font-extrabold text-lime-400 mt-1 leading-none">{results.tdee}</span>
                    <span className="text-xs text-slate-400 mt-3 font-medium flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400/20" /> Calories / day
                    </span>
                  </div>
                </div>

                {/* Dynamic BMI Advice Alert */}
                <div className="mb-6 p-4 rounded-xl bg-slate-800/40 border border-slate-700/30 text-sm text-slate-300">
                  <span className="font-bold text-white block mb-1">Diet & Training Recommendation:</span>
                  {results.bmiAdvice}
                </div>

                {/* Calorie Goals Breakdown */}
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3.5">Calorie Targets by Goal</h4>
                  <div className="space-y-3">
                    
                    {/* Deficit (Fat Loss) */}
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-850/60 border border-slate-800 hover:border-slate-700/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                          <TrendingDown className="text-orange-400 w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">Fat Loss Deficit</p>
                          <p className="text-xs text-slate-400">Calorie target to lose ~0.5kg/week</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-extrabold text-orange-400">{results.deficit}</span>
                        <span className="text-[10px] block text-slate-400">kcal/day</span>
                      </div>
                    </div>

                    {/* Maintenance */}
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-850/60 border border-slate-800 hover:border-slate-700/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-lime-500/10 flex items-center justify-center border border-lime-500/20">
                          <Flame className="text-lime-400 w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">Maintenance Weight</p>
                          <p className="text-xs text-slate-400">Calorie target to support active metabolism</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-extrabold text-lime-400">{results.tdee}</span>
                        <span className="text-[10px] block text-slate-400">kcal/day</span>
                      </div>
                    </div>

                    {/* Surplus (Muscle Gain) */}
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-850/60 border border-slate-800 hover:border-slate-700/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                          <Dumbbell className="text-indigo-400 w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">Lean Muscle Gain</p>
                          <p className="text-xs text-slate-400">Calorie target to support hyper-trophy</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-extrabold text-indigo-400">{results.surplus}</span>
                        <span className="text-[10px] block text-slate-400">kcal/day</span>
                      </div>
                    </div>

                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
