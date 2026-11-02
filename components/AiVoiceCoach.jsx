'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, Square, SkipForward, Sparkles, Trophy, ArrowRight, RefreshCw, Mic } from 'lucide-react';

function WorkoutAvatar({ exerciseName, speakingState }) {
  // Determine stance based on exercise name
  let exerciseType = 'idle';
  const name = exerciseName?.toLowerCase() || '';

  if (name.includes('squat')) {
    exerciseType = 'squat';
  } else if (name.includes('push-up') || name.includes('pushup')) {
    exerciseType = 'pushup';
  } else if (name.includes('plank')) {
    exerciseType = 'plank';
  } else if (name.includes('jack')) {
    exerciseType = 'jumping-jack';
  } else if (name.includes('climber') || name.includes('mountain')) {
    exerciseType = 'mountain-climber';
  } else if (name.includes('knee')) {
    exerciseType = 'high-knees';
  } else if (name.includes('row')) {
    exerciseType = 'row';
  } else if (name.includes('burpee')) {
    exerciseType = 'burpee';
  } else if (name.includes('cat-cow') || name.includes('flow')) {
    exerciseType = 'cat-cow';
  } else if (name.includes('dog')) {
    exerciseType = 'downward-dog';
  } else if (name.includes('cobra')) {
    exerciseType = 'cobra';
  } else if (name.includes('child')) {
    exerciseType = 'childs-pose';
  }

  // Neon style properties
  const neonColor = speakingState === 'speaking' ? '#a3e635' : '#10b981'; // lime-400 or emerald-500
  const glowFilter = "drop-shadow(0 0 6px " + (speakingState === 'speaking' ? 'rgba(163,230,53,0.6)' : 'rgba(16,185,129,0.4)') + ")";

  return (
    <div className="w-full h-60 bg-slate-950/80 rounded-2xl border border-slate-850 relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Background Hologram grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />
      
      {/* Scanline Effect */}
      <motion.div
        animate={{
          y: [-120, 120]
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: 'linear'
        }}
        className="absolute left-0 right-0 h-[1.5px] bg-lime-400/20 blur-[0.5px] shadow-[0_0_6px_rgba(163,230,53,0.5)] pointer-events-none"
      />

      {/* Title info overlay */}
      <div className="absolute top-3 left-4 flex items-center gap-1.5 text-[9px] font-bold text-slate-500 tracking-widest uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-ping" />
        AI Muscle Avatar Ares • {exerciseType.replace('-', ' ')} stance
      </div>

      {/* SVG Mannequin Container */}
      <svg width="100%" height="100%" viewBox="0 0 120 120" className="max-w-[140px] max-h-[140px] select-none">
        
        {/* Ground level indicator */}
        <line x1="10" y1="105" x2="110" y2="105" stroke="#334155" strokeWidth="2" strokeDasharray="3 3" />

        {/* --- IDLE BREATHING --- */}
        {exerciseType === 'idle' && (
          <g style={{ filter: glowFilter }}>
            {/* Ground support anchors */}
            <circle cx="48" cy="102" r="3.5" fill={neonColor} />
            <line x1="48" y1="102" x2="48" y2="105" stroke={neonColor} strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="72" cy="102" r="3.5" fill={neonColor} />
            <line x1="72" y1="102" x2="72" y2="105" stroke={neonColor} strokeWidth="4.5" strokeLinecap="round" />

            {/* Breathing dynamic components */}
            <motion.g
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Head with hair trim */}
              <circle cx="60" cy="18" r="8" fill="none" stroke={neonColor} strokeWidth="3" />
              <path d="M 55 12 Q 60 7 65 12" fill="none" stroke={neonColor} strokeWidth="2.5" />
              <circle cx="60" cy="18" r="3.5" fill={neonColor} />
              
              {/* Neck */}
              <line x1="60" y1="26" x2="60" y2="33" stroke={neonColor} strokeWidth="3" />

              {/* Deltoids / Shoulders */}
              <circle cx="43" cy="35" r="4.5" fill={neonColor} />
              <circle cx="77" cy="35" r="4.5" fill={neonColor} />

              {/* Muscular Torso Outline */}
              <path d="M 43 35 Q 60 36 77 35 L 70 65 H 50 Z" fill="none" stroke={neonColor} strokeWidth="3.5" strokeLinejoin="round" />
              
              {/* Chest (Pecs) */}
              <path d="M 46 43 Q 53 45 60 43" fill="none" stroke={neonColor} strokeWidth="2.5" />
              <path d="M 60 43 Q 67 45 74 43" fill="none" stroke={neonColor} strokeWidth="2.5" />

              {/* 6-pack abs */}
              <rect x="52" y="47" width="7" height="4.5" rx="1.5" fill="none" stroke={neonColor} strokeWidth="2" />
              <rect x="61" y="47" width="7" height="4.5" rx="1.5" fill="none" stroke={neonColor} strokeWidth="2" />
              <rect x="52" y="53" width="7" height="4.5" rx="1.5" fill="none" stroke={neonColor} strokeWidth="2" />
              <rect x="61" y="53" width="7" height="4.5" rx="1.5" fill="none" stroke={neonColor} strokeWidth="2" />
              <rect x="52" y="59" width="7" height="4.5" rx="1.5" fill="none" stroke={neonColor} strokeWidth="2" />
              <rect x="61" y="59" width="7" height="4.5" rx="1.5" fill="none" stroke={neonColor} strokeWidth="2" />

              {/* Muscular Arms (Biceps) */}
              <path d="M 43 35 Q 36 46 38 64" fill="none" stroke={neonColor} strokeWidth="4" strokeLinecap="round" />
              <path d="M 77 35 Q 84 46 82 64" fill="none" stroke={neonColor} strokeWidth="4" strokeLinecap="round" />
            </motion.g>

            {/* Thicker legs */}
            <g>
              <path d="M 50 65 L 48 83 L 48 102" fill="none" stroke={neonColor} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 70 65 L 72 83 L 72 102" fill="none" stroke={neonColor} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
        )}

        {/* --- SQUAT STANCE --- */}
        {exerciseType === 'squat' && (
          <g style={{ filter: glowFilter }}>
            {/* Foot anchors remain static on ground */}
            <line x1="45" y1="105" x2="40" y2="105" stroke={neonColor} strokeWidth="4.5" strokeLinecap="round" />
            <line x1="75" y1="105" x2="80" y2="105" stroke={neonColor} strokeWidth="4.5" strokeLinecap="round" />

            {/* Animate Squat: Hips drop down, knees bend outward, head drops */}
            <motion.g
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Head */}
              <circle cx="60" cy="18" r="8" fill="none" stroke={neonColor} strokeWidth="3" />
              <circle cx="60" cy="18" r="3.5" fill={neonColor} />
              <line x1="60" y1="26" x2="60" y2="33" stroke={neonColor} strokeWidth="3" />
              
              {/* Shoulders */}
              <circle cx="43" cy="35" r="4.5" fill={neonColor} />
              <circle cx="77" cy="35" r="4.5" fill={neonColor} />

              {/* Torso */}
              <path d="M 43 35 Q 60 36 77 35 L 70 65 H 50 Z" fill="none" stroke={neonColor} strokeWidth="3.5" strokeLinejoin="round" />
              
              {/* Pecs */}
              <path d="M 46 43 Q 53 45 60 43" fill="none" stroke={neonColor} strokeWidth="2.5" />
              <path d="M 60 43 Q 67 45 74 43" fill="none" stroke={neonColor} strokeWidth="2.5" />

              {/* 6-pack abs */}
              <rect x="52" y="47" width="7" height="4.5" rx="1.5" fill="none" stroke={neonColor} strokeWidth="2" />
              <rect x="61" y="47" width="7" height="4.5" rx="1.5" fill="none" stroke={neonColor} strokeWidth="2" />
              <rect x="52" y="53" width="7" height="4.5" rx="1.5" fill="none" stroke={neonColor} strokeWidth="2" />
              <rect x="61" y="53" width="7" height="4.5" rx="1.5" fill="none" stroke={neonColor} strokeWidth="2" />
              <rect x="52" y="59" width="7" height="4.5" rx="1.5" fill="none" stroke={neonColor} strokeWidth="2" />
              <rect x="61" y="59" width="7" height="4.5" rx="1.5" fill="none" stroke={neonColor} strokeWidth="2" />

              {/* Biceps raising weight goblet */}
              <path d="M 43 35 L 48 48 L 56 46" fill="none" stroke={neonColor} strokeWidth="4" strokeLinecap="round" />
              <path d="M 77 35 L 72 48 L 64 46" fill="none" stroke={neonColor} strokeWidth="4" strokeLinecap="round" />
              <rect x="54" y="42" width="12" height="8" rx="2" fill={neonColor} />
            </motion.g>

            {/* Knees bend outwards in response to hips movement */}
            <motion.path
              animate={{
                d: [
                  "M 45 102 L 48 83 L 50 65 M 75 102 L 72 83 L 70 65", 
                  "M 45 102 L 32 85 L 50 89 M 75 102 L 88 85 L 70 89", 
                  "M 45 102 L 48 83 L 50 65 M 75 102 L 72 83 L 70 65"
                ]
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              fill="none"
              stroke={neonColor}
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )}

        {/* --- PUSHUP STANCE --- */}
        {exerciseType === 'pushup' && (
          <g style={{ filter: glowFilter }}>
            {/* Ground support anchors */}
            <circle cx="35" cy="98" r="3.5" fill={neonColor} />
            <circle cx="98" cy="98" r="3.5" fill={neonColor} />

            {/* Planking Body pivots on feet */}
            <motion.g
              animate={{
                y: [0, 14, 0],
                rotate: [0, -4, 0]
              }}
              style={{ originX: '98px', originY: '98px' }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Head & Neck */}
              <circle cx="20" cy="74" r="8" fill="none" stroke={neonColor} strokeWidth="3" />
              <line x1="28" y1="74" x2="35" y2="74" stroke={neonColor} strokeWidth="3" />

              {/* Shoulders */}
              <circle cx="35" cy="74" r="4.5" fill={neonColor} />

              {/* Torso */}
              <path d="M 35 68 L 65 72 L 65 86 L 35 80 Z" fill="none" stroke={neonColor} strokeWidth="3.5" strokeLinejoin="round" />
              
              {/* Pecs */}
              <line x1="42" y1="70" x2="42" y2="82" stroke={neonColor} strokeWidth="2.5" />

              {/* Abs Grid */}
              <rect x="47" y="72" width="4.5" height="7" rx="1.5" fill="none" stroke={neonColor} strokeWidth="2" />
              <rect x="47" y="80" width="4.5" height="7" rx="1.5" fill="none" stroke={neonColor} strokeWidth="2" />
              <rect x="53" y="72" width="4.5" height="7" rx="1.5" fill="none" stroke={neonColor} strokeWidth="2" />
              <rect x="53" y="80" width="4.5" height="7" rx="1.5" fill="none" stroke={neonColor} strokeWidth="2" />
              <rect x="59" y="72" width="4.5" height="7" rx="1.5" fill="none" stroke={neonColor} strokeWidth="2" />
              <rect x="59" y="80" width="4.5" height="7" rx="1.5" fill="none" stroke={neonColor} strokeWidth="2" />

              {/* Legs */}
              <path d="M 65 79 L 98 98" fill="none" stroke={neonColor} strokeWidth="4.5" strokeLinecap="round" />

              {/* Arms */}
              <motion.path
                animate={{
                  d: [
                    "M 35 74 L 35 88 L 35 98", 
                    "M 35 74 L 45 88 L 35 98", 
                    "M 35 74 L 35 88 L 35 98"
                  ]
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                fill="none"
                stroke={neonColor}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.g>
          </g>
        )}

        {/* --- PLANK HOLD (STIFF SHAKE CORE) --- */}
        {exerciseType === 'plank' && (
          <g style={{ filter: glowFilter }}>
            {/* Elbow support and toe support */}
            <line x1="33" y1="98" x2="43" y2="98" stroke={neonColor} strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="98" cy="98" r="3.5" fill={neonColor} />

            {/* Shaking Plank core body */}
            <motion.g
              animate={{
                y: [0, -0.8, 0.8, -0.5, 0.5, 0]
              }}
              transition={{ duration: 0.22, repeat: Infinity, ease: 'linear' }}
            >
              {/* Head & Neck */}
              <circle cx="23" cy="78" r="8" fill="none" stroke={neonColor} strokeWidth="3" />
              
              {/* Torso */}
              <path d="M 35 76 L 65 80 L 65 92 L 35 88 Z" fill="none" stroke={neonColor} strokeWidth="3.5" strokeLinejoin="round" />
              
              {/* Pecs */}
              <line x1="42" y1="78" x2="42" y2="90" stroke={neonColor} strokeWidth="2.5" />

              {/* Abs Grid */}
              <rect x="47" y="79" width="4.5" height="7" rx="1.5" fill="none" stroke={neonColor} strokeWidth="2" />
              <rect x="47" y="87" width="4.5" height="7" rx="1.5" fill="none" stroke={neonColor} strokeWidth="2" />
              <rect x="53" y="79" width="4.5" height="7" rx="1.5" fill="none" stroke={neonColor} strokeWidth="2" />
              <rect x="53" y="87" width="4.5" height="7" rx="1.5" fill="none" stroke={neonColor} strokeWidth="2" />
              <rect x="59" y="79" width="4.5" height="7" rx="1.5" fill="none" stroke={neonColor} strokeWidth="2" />
              <rect x="59" y="87" width="4.5" height="7" rx="1.5" fill="none" stroke={neonColor} strokeWidth="2" />

              {/* Legs */}
              <path d="M 65 86 L 98 98" fill="none" stroke={neonColor} strokeWidth="4.5" strokeLinecap="round" />
              
              {/* Forearm support */}
              <path d="M 35 82 L 38 98" fill="none" stroke={neonColor} strokeWidth="4" strokeLinecap="round" />
            </motion.g>
          </g>
        )}

        {/* --- JUMPING JACKS --- */}
        {exerciseType === 'jumping-jack' && (
          <g style={{ filter: glowFilter }}>
            <motion.g
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
            >
              {/* Head & Neck */}
              <circle cx="60" cy="18" r="8" fill="none" stroke={neonColor} strokeWidth="3" />
              <circle cx="60" cy="18" r="3.5" fill={neonColor} />
              <line x1="60" y1="26" x2="60" y2="33" stroke={neonColor} strokeWidth="3" />

              {/* Torso */}
              <path d="M 43 35 Q 60 36 77 35 L 70 65 H 50 Z" fill="none" stroke={neonColor} strokeWidth="3.5" strokeLinejoin="round" />
              
              {/* Pecs */}
              <path d="M 46 43 Q 53 45 60 43" fill="none" stroke={neonColor} strokeWidth="2.5" />
              <path d="M 60 43 Q 67 45 74 43" fill="none" stroke={neonColor} strokeWidth="2.5" />

              {/* Abs Grid */}
              <rect x="52" y="47" width="7" height="4.5" rx="1.5" fill="none" stroke={neonColor} strokeWidth="2" />
              <rect x="61" y="47" width="7" height="4.5" rx="1.5" fill="none" stroke={neonColor} strokeWidth="2" />
              <rect x="52" y="53" width="7" height="4.5" rx="1.5" fill="none" stroke={neonColor} strokeWidth="2" />
              <rect x="61" y="53" width="7" height="4.5" rx="1.5" fill="none" stroke={neonColor} strokeWidth="2" />
              <rect x="52" y="59" width="7" height="4.5" rx="1.5" fill="none" stroke={neonColor} strokeWidth="2" />
              <rect x="61" y="59" width="7" height="4.5" rx="1.5" fill="none" stroke={neonColor} strokeWidth="2" />

              {/* Deltoids / Shoulders */}
              <circle cx="43" cy="35" r="4.5" fill={neonColor} />
              <circle cx="77" cy="35" r="4.5" fill={neonColor} />

              {/* Dynamic limbs */}
              <motion.path
                animate={{
                  d: [
                    "M 43 35 Q 36 46 38 64 M 77 35 Q 84 46 82 64 M 50 65 L 48 83 L 52 96 M 70 65 L 72 83 L 68 96",
                    "M 43 35 Q 35 24 32 12 M 77 35 Q 85 24 88 12 M 50 65 L 40 83 L 34 94 M 70 65 L 80 83 L 86 94",
                    "M 43 35 Q 36 46 38 64 M 77 35 Q 84 46 82 64 M 50 65 L 48 83 L 52 96 M 70 65 L 72 83 L 68 96"
                  ]
                }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                fill="none"
                stroke={neonColor}
                strokeWidth="4"
                strokeLinecap="round"
              />
            </motion.g>
          </g>
        )}

      </svg>
    </div>
  );
}

export default function AiVoiceCoach() {
  const [goal, setGoal] = useState('strength');
  const [intensity, setIntensity] = useState('intermediate');
  const [speakingState, setSpeakingState] = useState('idle'); // 'idle' | 'speaking' | 'thinking'
  const [workout, setWorkout] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [voiceList, setVoiceList] = useState([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState('');

  // Fetch available Web Speech synthesis voices
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setVoiceList(voices);
        // Pre-select a default premium-sounding voice if available
        const defaultVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Natural')) || voices[0];
        if (defaultVoice) {
          setSelectedVoiceName(defaultVoice.name);
        }
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speak = (text) => {
    if (typeof window === 'undefined' || !window.speechSynthesis || isMuted) return;

    window.speechSynthesis.cancel(); // Interrupt any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Assign selected voice
    if (selectedVoiceName) {
      const voice = voiceList.find(v => v.name === selectedVoiceName);
      if (voice) utterance.voice = voice;
    }

    utterance.onstart = () => setSpeakingState('speaking');
    utterance.onend = () => setSpeakingState('idle');
    utterance.onerror = () => setSpeakingState('idle');

    window.speechSynthesis.speak(utterance);
  };

  const handleGenerateWorkout = () => {
    setSpeakingState('thinking');
    setWorkout(null);

    // Simulate AI thinking and building custom workout
    setTimeout(() => {
      let workoutName = '';
      let exercises = [];
      let introPhrase = '';

      if (goal === 'strength') {
        workoutName = 'Hypertrophy Power Session';
        introPhrase = `Hello! I am your AI Elite coach. Today we are focusing on Strength and Muscle Development. Let's power through this session.`;
        exercises = [
          {
            name: 'Goblet Squats',
            sets: 3,
            reps: '12 Reps',
            instruction: 'Hold a weight close to your chest, lower your hips below your knees keeping your back straight, and drive up through your heels.',
            actionTip: 'Keep your chest proud and core tight.'
          },
          {
            name: 'Push-ups',
            sets: 3,
            reps: '10 Reps',
            instruction: 'Lower your body in a straight line until your chest almost touches the floor, keep your elbows tucked at 45 degrees, and push back up.',
            actionTip: 'Do not sag your lower back.'
          },
          {
            name: 'Dumbbell Rows',
            sets: 3,
            reps: '12 Reps per arm',
            instruction: 'Hinge forward at the hips, pull the dumbbell up to your ribs, keeping your back flat, and squeeze your shoulder blades at the top.',
            actionTip: 'Focus on pulling with your back muscles, not your arm.'
          },
          {
            name: 'Plank Hold',
            sets: 3,
            reps: '45 Seconds',
            instruction: 'Support your weight on your forearms and toes. Keep your body in a straight line and squeeze your core and glutes.',
            actionTip: 'Do not let your hips sag.'
          }
        ];
      } else if (goal === 'cardio') {
        workoutName = 'Fat-Burn HIIT Circuit';
        introPhrase = `Welcome to your Cardio workout. Today we are doing high intensity intervals to burn fat and boost stamina. Keep your energy high!`;
        exercises = [
          {
            name: 'Jumping Jacks',
            sets: 4,
            reps: '45 Seconds',
            instruction: 'Jump your feet out wide while swinging your arms above your head, then quickly return to the starting position.',
            actionTip: 'Stay light and springy on the balls of your feet.'
          },
          {
            name: 'Mountain Climbers',
            sets: 4,
            reps: '30 Seconds',
            instruction: 'Start in a plank position, drive your knees toward your chest as fast as possible in an alternating running motion.',
            actionTip: 'Keep your hips level and shoulders directly over hands.'
          },
          {
            name: 'High Knees',
            sets: 4,
            reps: '30 Seconds',
            instruction: 'Run in place, driving your knees up to waist height while pumping your arms dynamically.',
            actionTip: 'Keep your chest tall and move as fast as you can.'
          },
          {
            name: 'Burpees',
            sets: 3,
            reps: '10 Reps',
            instruction: 'Drop into a squat, jump your feet back into a plank, perform a pushup, jump back in, and explosively jump upward.',
            actionTip: 'Maintain a smooth, continuous rhythm.'
          }
        ];
      } else {
        workoutName = 'Yoga Recovery & Core Flex';
        introPhrase = `Welcome to Zen Flow recovery. Today we are restoring joints, expanding flexibility, and strengthening stabilizer muscle systems. Move mindfully.`;
        exercises = [
          {
            name: 'Cat-Cow Flow',
            sets: 2,
            reps: '10 Repetitions',
            instruction: 'On all fours, inhale to arch your back and lift your chest to the sky, then exhale to round your spine and tuck your chin.',
            actionTip: 'Sync your movement with slow, deep breathing.'
          },
          {
            name: 'Downward Dog Hold',
            sets: 2,
            reps: '45 Seconds',
            instruction: 'Press your palms flat, lift your knees off the ground, push your hips back and upward to create an inverted V shape.',
            actionTip: 'Relax your neck and drive your heels towards the floor.'
          },
          {
            name: 'Cobra Stretch',
            sets: 2,
            reps: '30 Seconds',
            instruction: 'Lie on your stomach, place hands under your shoulders, press through your palms to gently arch your back and lift your chest.',
            actionTip: 'Keep your shoulders rolled away from your ears.'
          },
          {
            name: 'Childs Pose Rest',
            sets: 1,
            reps: '60 Seconds',
            instruction: 'Kneel and sit back on your heels, fold forward extending your arms flat on the floor, resting your forehead downward.',
            actionTip: 'Breathe deeply into your lower back and ribs.'
          }
        ];
      }

      setWorkout({
        name: workoutName,
        intro: introPhrase,
        exercises
      });
      setActiveStep(0);
      setSpeakingState('idle');

      // AI speaks the introduction out loud
      speak(`${introPhrase} Your routine is called the ${workoutName}. Let's look at the first action, which is ${exercises[0].name}.`);
    }, 1200);
  };

  const handleNextStep = () => {
    if (!workout) return;
    const nextIndex = activeStep + 1;
    if (nextIndex < workout.exercises.length) {
      setActiveStep(nextIndex);
      const ex = workout.exercises[nextIndex];
      speak(`Next action is ${ex.name}. You will do ${ex.sets} sets of ${ex.reps}. Here are the instructions: ${ex.instruction}. Pro tip: ${ex.actionTip}`);
    } else {
      speak("Congratulations! You have completed your daily workout routine. Excellent work today. Keep up the elite work!");
      alert("Workout complete! Awesome work!");
      setWorkout(null);
      setActiveStep(0);
    }
  };

  const handleStop = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setSpeakingState('idle');
  };

  const speakCurrentStep = () => {
    if (!workout) return;
    const ex = workout.exercises[activeStep];
    speak(`Action is ${ex.name}. ${ex.sets} sets of ${ex.reps}. Instructions: ${ex.instruction}. Pro tip: ${ex.actionTip}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side Panel: Coach Setup */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col items-center">
          
          {/* Holographic AI Workout Avatar Screen */}
          <div className="w-full mb-6 mt-2">
            <WorkoutAvatar
              exerciseName={workout ? workout.exercises[activeStep].name : ''}
              speakingState={speakingState}
            />
          </div>

          <div className="text-center w-full mb-6">
            <h3 className="text-xl font-bold text-white mb-1 flex items-center justify-center gap-1.5">
              <Sparkles className="w-5 h-5 text-lime-400" />
              Elite AI Voice Coach
            </h3>
            <p className="text-xs text-slate-400">
              {speakingState === 'speaking' ? 'Coach is speaking...' : speakingState === 'thinking' ? 'Generating daily workout...' : 'Tap the core to listen to the coach'}
            </p>
          </div>

          {/* Configuration form */}
          <div className="w-full space-y-4 pt-4 border-t border-slate-800">
            {/* Goal Choice */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Daily Focus</label>
              <div className="grid grid-cols-3 gap-2">
                {['strength', 'cardio', 'flexibility'].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGoal(g)}
                    className={`py-2 px-1 text-xs rounded-xl font-bold border capitalize transition-colors ${
                      goal === g
                        ? 'bg-lime-400/10 border-lime-400 text-lime-400'
                        : 'bg-slate-800/30 hover:bg-slate-800 text-slate-400 border-transparent'
                    }`}
                  >
                    {g === 'flexibility' ? 'Yoga Flex' : g}
                  </button>
                ))}
              </div>
            </div>

            {/* Intensity Level */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Fitness Intensity</label>
              <div className="grid grid-cols-3 gap-2">
                {['beginner', 'intermediate', 'advanced'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setIntensity(lvl)}
                    className={`py-2 px-1 text-xs rounded-xl font-bold border capitalize transition-colors ${
                      intensity === lvl
                        ? 'bg-lime-400/10 border-lime-400 text-lime-400'
                        : 'bg-slate-800/30 hover:bg-slate-800 text-slate-400 border-transparent'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Select */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Coach Voice Accent</label>
              <select
                value={selectedVoiceName}
                onChange={(e) => setSelectedVoiceName(e.target.value)}
                className="w-full text-xs py-2.5 px-3 bg-slate-850 border border-slate-800 rounded-xl text-slate-300 outline-none focus:border-lime-400 transition-colors"
              >
                {voiceList.map((v) => (
                  <option key={v.name} value={v.name}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </div>

            {/* Controls */}
            <div className="flex gap-2 pt-2 justify-center">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2.5 rounded-xl border ${
                  isMuted ? 'bg-rose-500/10 border-rose-500 text-rose-500' : 'bg-slate-850 border-slate-800 text-slate-400'
                }`}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              {speakingState === 'speaking' && (
                <button
                  onClick={handleStop}
                  className="p-2.5 rounded-xl bg-slate-850 border border-slate-800 text-slate-400 hover:text-white"
                  title="Stop Speech"
                >
                  <Square className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={handleGenerateWorkout}
              className="w-full mt-2 py-3 bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-400 hover:to-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-lime-500/5 transition-all active:scale-[0.98]"
            >
              Generate Daily Workout
            </button>

          </div>
        </div>

        {/* Right Side Panel: Workout Plan & Actions */}
        <div className="lg:col-span-7 flex flex-col justify-center min-h-[500px]">
          <AnimatePresence mode="wait">
            {!workout ? (
              <motion.div
                key="waiting"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center justify-center p-8 text-center bg-slate-900/40 border border-slate-800/50 rounded-3xl h-[520px]"
              >
                <div className="w-14 h-14 rounded-full bg-slate-900 flex items-center justify-center mb-4 border border-slate-800">
                  <Trophy className="text-slate-600 w-6 h-6 animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">No active routine</h3>
                <p className="text-slate-400 max-w-xs text-xs">
                  Choose a focus (Strength, HIIT Cardio, or Yoga Flow), configure the coach accent, and generate your routine to begin.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="workout-active"
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -15 }}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative flex flex-col justify-between min-h-[520px]"
              >
                <div>
                  {/* Workout Header */}
                  <div className="flex justify-between items-start border-b border-slate-850 pb-4 mb-6">
                    <div>
                      <span className="text-[10px] bg-lime-400/10 text-lime-400 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        {intensity} Routine
                      </span>
                      <h3 className="text-xl font-extrabold text-white mt-1.5">{workout.name}</h3>
                    </div>
                    <span className="text-xs text-slate-400 font-semibold bg-slate-850 px-3 py-1 rounded-full border border-slate-800">
                      Step {activeStep + 1} of {workout.exercises.length}
                    </span>
                  </div>

                  {/* Active Exercise Detail */}
                  <div className="space-y-6">
                    <div className="p-5 rounded-2xl bg-slate-850 border border-lime-400/15 shadow-inner relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-lime-400/5 rounded-full blur-xl pointer-events-none" />
                      
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-extrabold text-lime-400">
                          {workout.exercises[activeStep].name}
                        </h4>
                        <div className="text-right">
                          <span className="text-xs font-bold text-white bg-slate-800/80 px-2.5 py-1 rounded-lg">
                            {workout.exercises[activeStep].sets} sets × {workout.exercises[activeStep].reps}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-slate-200 leading-relaxed font-medium mb-4">
                        {workout.exercises[activeStep].instruction}
                      </p>

                      <div className="p-3 bg-lime-400/5 border border-lime-400/10 rounded-xl text-xs text-lime-300 font-medium">
                        <span className="font-bold text-white block mb-0.5">Coach Action Tip:</span>
                        {workout.exercises[activeStep].actionTip}
                      </div>
                    </div>

                    {/* Speech Text Area */}
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-850 flex items-start gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-lime-400 mt-1.5 animate-pulse" />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">What the Coach is saying</p>
                        <p className="text-xs text-slate-400 italic">
                          "{activeStep === 0 && speakingState === 'idle' ? workout.intro : `Do ${workout.exercises[activeStep].sets} sets of ${workout.exercises[activeStep].reps} of ${workout.exercises[activeStep].name}.`}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation and Flow controls */}
                <div className="mt-8 pt-4 border-t border-slate-850 flex items-center justify-between gap-4">
                  <button
                    onClick={speakCurrentStep}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-750 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <Volume2 className="w-4 h-4" /> Repeat Voice Guidance
                  </button>

                  <button
                    onClick={handleNextStep}
                    className="px-6 py-3 bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1 cursor-pointer"
                  >
                    {activeStep === workout.exercises.length - 1 ? 'Finish Workout' : 'Next Action'}
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
