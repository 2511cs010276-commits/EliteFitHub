'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Video,
  Phone,
  PhoneCall,
  MessageSquare,
  Clock,
  CheckCircle2,
  Camera,
  Mic,
  MicOff,
  VideoOff,
  ShieldCheck,
  ArrowRight,
  Calendar,
  Sparkles,
  Smartphone,
  Send,
  Copy,
  Check,
  ExternalLink,
  Zap,
  ChevronDown,
  ChevronUp,
  Dumbbell,
  Activity,
  Flame,
  UserCheck,
  RefreshCw,
  QrCode
} from 'lucide-react';

export default function TrainerVideoCall({ isStandalone = false }) {
  const WHATSAPP_NUMBER = '7981452169';
  const FORMATTED_PHONE = '+91 7981452169';
  const TRAINER_NAME = 'Coach Raja (Master Trainer)';

  // State
  const [copied, setCopied] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('live_form');
  const [clientName, setClientName] = useState('');
  const [fitnessGoal, setFitnessGoal] = useState('fat_loss');
  const [preferredTime, setPreferredTime] = useState('now');
  const [customNotes, setCustomNotes] = useState('');
  
  // Camera Test State
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoDisabled, setIsVideoDisabled] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  // Topics for the video call
  const callTopics = [
    {
      id: 'live_form',
      title: '1-on-1 Live Workout & Form Check',
      badge: 'Most Popular',
      desc: 'Real-time biomechanics analysis on squats, deadlifts, presses & posture to prevent injury.',
      icon: Dumbbell,
      defaultMsg: 'Hi Coach Raja! I would like to start a 1-on-1 Live Form Correction & Workout Video Call on WhatsApp.'
    },
    {
      id: 'fat_loss_diet',
      title: 'Fat Loss & Muscle Diet Consultation',
      badge: 'High Impact',
      desc: 'Personalized calorie breakdown, macro targets, meal timing, and supplement guidance.',
      icon: Flame,
      defaultMsg: 'Hi Coach Raja! I want to connect for a 1-on-1 Video Consultation to discuss my custom diet and calorie plan.'
    },
    {
      id: 'routine_design',
      title: 'Workout Split & Routine Customization',
      badge: 'Goal Focused',
      desc: 'Build or optimize your 4-6 day weekly gym split tailored to your equipment and schedule.',
      icon: Activity,
      defaultMsg: 'Hi Coach Raja! Let us do a Video Call to review and design my weekly workout split and exercise routine.'
    },
    {
      id: 'urgent_call',
      title: 'Quick 15-Min Instant Video Call',
      badge: 'Express',
      desc: 'Fast video call to clear doubts, check exercise execution, or plan immediate fitness next steps.',
      icon: Zap,
      defaultMsg: 'Hi Coach Raja! I am ready for an instant 15-minute WhatsApp Video Call to discuss my fitness queries.'
    }
  ];

  // Quick preset links
  const quickPresets = [
    {
      title: '📹 Form Check Video Call',
      text: `Hello Coach Raja! Requesting an immediate WhatsApp Video Call for an exercise form & posture evaluation. Number: ${WHATSAPP_NUMBER}`,
      color: 'from-lime-500 to-emerald-500'
    },
    {
      title: '🥗 Diet & Calorie Review',
      text: `Hello Coach Raja! I would like to do a WhatsApp Video Consultation for personalized nutrition and calorie target review.`,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: '⚡ Instant Video Call Now',
      text: `Hello Coach Raja! I am online on WhatsApp and ready for our 1-on-1 video call session now.`,
      color: 'from-amber-400 to-orange-500'
    },
    {
      title: '📅 Schedule Video Slot',
      text: `Hello Coach Raja! I would like to book a WhatsApp Video Call slot with you for this week. Please let me know your available times.`,
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  // Copy phone number to clipboard
  const handleCopyNumber = () => {
    navigator.clipboard.writeText(WHATSAPP_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Construct dynamic WhatsApp message
  const getConstructedMessage = () => {
    const topicObj = callTopics.find((t) => t.id === selectedTopic) || callTopics[0];
    const namePart = clientName.trim() ? `\n• Name: ${clientName.trim()}` : '';
    const goalText = fitnessGoal === 'fat_loss' ? 'Fat Loss & Definition' : fitnessGoal === 'muscle_gain' ? 'Muscle Hypertrophy & Strength' : fitnessGoal === 'endurance' ? 'Endurance & Stamina' : 'General Health & Mobility';
    const timeText = preferredTime === 'now' ? 'Right Now (Instant Video Call)' : preferredTime === 'today_eve' ? 'Today Evening (6 PM - 9 PM)' : preferredTime === 'tomorrow_morn' ? 'Tomorrow Morning (7 AM - 10 AM)' : 'Custom Scheduled Slot';
    const notesPart = customNotes.trim() ? `\n• Notes: "${customNotes.trim()}"` : '';

    return `🎥 *ELITEFIT HUB - WHATSAPP VIDEO CALL REQUEST*
━━━━━━━━━━━━━━━━━━━━
Hi Coach Raja! I want to start a 1-on-1 WhatsApp Video Call consultation with you.

📌 *Session Type:* ${topicObj.title}${namePart}
🎯 *Primary Goal:* ${goalText}
⏰ *Preferred Timing:* ${timeText}${notesPart}

📲 Direct WhatsApp Number: ${FORMATTED_PHONE}
Please let me know once you are ready to initiate the video call!`;
  };

  // Launch WhatsApp with custom message
  const handleStartWhatsAppCall = (customMsg = null) => {
    const msg = customMsg || getConstructedMessage();
    const encoded = encodeURIComponent(msg);
    const url = `https://wa.me/91${WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Start Camera Test using getUserMedia
  const startCameraTest = async () => {
    setCameraError('');
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Camera access is not supported by your browser.');
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
        audio: true
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
      setIsVideoDisabled(false);
      setIsMuted(false);
    } catch (err) {
      console.error('Camera error:', err);
      setCameraError('Unable to access camera or microphone. Please check browser permissions.');
    }
  };

  // Stop Camera Test
  const stopCameraTest = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  // Toggle Video Track
  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoDisabled(!videoTrack.enabled);
      }
    }
  };

  // Toggle Audio Track
  const toggleAudio = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  // Clean up media streams on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const faqs = [
    {
      q: 'How does the WhatsApp Video Call session work?',
      a: 'Once you click "Start WhatsApp Video Call", WhatsApp opens automatically with your pre-filled consultation request sent to Coach Raja (+91 7981452169). The trainer responds within 2-5 minutes to initiate or schedule the high-definition WhatsApp video call.'
    },
    {
      q: 'Can I do a live form check during my workout?',
      a: 'Yes! Place your smartphone against a bench or water bottle 6-8 feet away with your camera facing your workout area. Coach Raja will watch your reps in real time and guide your posture, bar path, and breathing.'
    },
    {
      q: 'What if I want to schedule the call for later?',
      a: 'Select "Today Evening" or "Tomorrow Morning" in the session builder, or choose the "Schedule Video Slot" quick preset. You can agree on the exact slot directly on WhatsApp.'
    },
    {
      q: 'What should I have prepared before the video call?',
      a: 'We recommend: 1) Workout attire, 2) Ample lighting in front of you, 3) 6-8 feet of clear floor space, 4) A water bottle, and 5) Your list of specific fitness questions or current diet intake.'
    }
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Standalone Back Link if on dedicated route */}
      {isStandalone && (
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-lime-400 transition-colors"
          >
            ← Back to EliteFit Hub Dashboard
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Trainer WhatsApp Live: {FORMATTED_PHONE}
          </div>
        </div>
      )}

      {/* Hero Banner with WhatsApp Branding & Trainer Status */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        {/* Glow accents */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#25D366]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headings & Direct WhatsApp Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 text-xs font-extrabold text-[#25D366] shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
                </span>
                LIVE WHATSAPP VIDEO CONSULTATION
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-medium text-slate-300">
                <Clock className="w-3 h-3 text-lime-400" /> Avg Response: &lt; 3 mins
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15]">
              Direct Video Call with Your{' '}
              <span className="bg-gradient-to-r from-[#25D366] via-lime-400 to-emerald-400 bg-clip-text text-transparent">
                Personal Trainer
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
              Connect instantly 1-on-1 via WhatsApp video call for live posture evaluation, personalized workout guidance, and real-time form correction directly with Coach Raja.
            </p>

            {/* Trainer WhatsApp Contact Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-wrap items-center justify-between gap-4 max-w-xl">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#25D366] to-emerald-600 flex items-center justify-center text-slate-950 shadow-lg shadow-[#25D366]/20">
                  <Smartphone className="w-6 h-6 text-slate-950" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">Direct WhatsApp Hotline</p>
                  <p className="text-xl sm:text-2xl font-black text-white tracking-wide">{FORMATTED_PHONE}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="copy-whatsapp-number-btn"
                  onClick={handleCopyNumber}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-700"
                  title="Copy Number"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-lime-400" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" /> Copy
                    </>
                  )}
                </button>

                <a
                  id="direct-phone-call-btn"
                  href={`tel:+91${WHATSAPP_NUMBER}`}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors border border-slate-700 cursor-pointer"
                  title="Direct Phone Call"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                </a>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                id="main-start-whatsapp-video-call-btn"
                onClick={() => handleStartWhatsAppCall()}
                className="px-7 py-4 rounded-2xl bg-gradient-to-r from-[#25D366] to-emerald-500 hover:from-[#20bd5a] hover:to-emerald-400 text-slate-950 font-black text-base shadow-xl shadow-[#25D366]/20 transition-all duration-300 flex items-center gap-3 cursor-pointer group"
              >
                <Video className="w-5 h-5 text-slate-950 group-hover:scale-110 transition-transform" />
                <span>Start WhatsApp Video Call</span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="scroll-to-camera-test-btn"
                onClick={() => {
                  const el = document.getElementById('camera-test-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-4 rounded-2xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700 text-white font-bold text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <Camera className="w-4 h-4 text-lime-400" />
                <span>Test Camera & Setup</span>
              </button>
            </div>
          </div>

          {/* Right Column: Coach Profile & Live Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-6 relative shadow-xl">
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full text-xs font-bold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available Today
              </div>

              {/* Coach Avatar & Intro */}
              <div className="flex items-center gap-4 mb-5">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=300&h=300&fit=crop&q=80"
                    alt="Coach Raja Raveendra"
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-lime-400/40 shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-[#25D366] text-slate-950 rounded-full p-1 border-2 border-slate-950">
                    <Video className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-white text-lg">Coach Raja</h3>
                    <ShieldCheck className="w-4 h-4 text-lime-400" />
                  </div>
                  <p className="text-xs text-lime-400 font-semibold">Master Trainer & Biomechanics Specialist</p>
                  <p className="text-xs text-slate-400 mt-1">Certified ACSM • 8+ Years • 500+ Video Form Checks</p>
                </div>
              </div>

              {/* Coach Stats Grid */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800/80 text-center my-4">
                <div className="p-2 bg-slate-900/60 rounded-xl">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Rating</p>
                  <p className="text-sm font-black text-amber-400 mt-0.5">★ 4.98</p>
                </div>
                <div className="p-2 bg-slate-900/60 rounded-xl">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Video Calls</p>
                  <p className="text-sm font-black text-white mt-0.5">180+ Completed</p>
                </div>
                <div className="p-2 bg-slate-900/60 rounded-xl">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Language</p>
                  <p className="text-sm font-black text-lime-400 mt-0.5">English / Hindi</p>
                </div>
              </div>

              {/* Features Pill List */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>Real-time squat, bench, and deadlift posture correction</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>Personalized calorie and macro breakdown on screen</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>Post-call summary sent directly to your WhatsApp</span>
                </div>
              </div>

              {/* Quick WhatsApp Link in card */}
              <button
                id="quick-card-whatsapp-call-btn"
                onClick={() => handleStartWhatsAppCall('Hi Coach Raja! Requesting an immediate 1-on-1 WhatsApp Video Call session.')}
                className="w-full mt-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Message on WhatsApp ({WHATSAPP_NUMBER})</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick 1-Click Call Presets */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-lime-400" /> Instant WhatsApp Action Shortcuts
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any card below to launch WhatsApp with tailored video call parameters ready to send.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickPresets.map((preset, idx) => (
            <div
              key={idx}
              onClick={() => handleStartWhatsAppCall(preset.text)}
              className="group bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 cursor-pointer transition-all duration-300 flex flex-col justify-between hover:shadow-lg hover:shadow-lime-500/5"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold text-white group-hover:text-lime-400 transition-colors block">
                  {preset.title}
                </span>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {preset.text}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-850 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-white">
                <span className="text-[#25D366]">Send to {WHATSAPP_NUMBER}</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Live Camera & Framing Tester */}
      <div id="camera-test-section" className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Instructions */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/20 text-xs font-bold text-lime-400">
              <Camera className="w-3.5 h-3.5" /> PRE-CALL HARDWARE CHECK
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Test Your Camera & Room Framing
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Before calling Coach Raja on WhatsApp, verify your camera angle, room lighting, and microphone so the trainer can observe your full range of motion without interruptions.
            </p>

            <div className="space-y-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-lime-400/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-lime-400">1</span>
                </div>
                <div className="text-xs">
                  <p className="font-bold text-white">Full Body Distance</p>
                  <p className="text-slate-400">Prop your phone ~6 to 8 feet away at waist-to-chest height.</p>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-lime-400/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-lime-400">2</span>
                </div>
                <div className="text-xs">
                  <p className="font-bold text-white">Lighting in Front</p>
                  <p className="text-slate-400">Keep windows or light sources in front of you, not behind your back.</p>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-lime-400/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-lime-400">3</span>
                </div>
                <div className="text-xs">
                  <p className="font-bold text-white">Horizontal or Vertical</p>
                  <p className="text-slate-400">WhatsApp supports both portrait and landscape video orientation.</p>
                </div>
              </div>
            </div>

            {/* Camera Control Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              {!cameraActive ? (
                <button
                  id="activate-camera-test-btn"
                  onClick={startCameraTest}
                  className="px-5 py-3 rounded-xl bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-lime-500/10"
                >
                  <Camera className="w-4 h-4" /> Start Live Camera Preview
                </button>
              ) : (
                <div className="flex flex-wrap gap-2">
                  <button
                    id="stop-camera-test-btn"
                    onClick={stopCameraTest}
                    className="px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/30 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    Stop Camera
                  </button>
                  <button
                    id="toggle-mic-btn"
                    onClick={toggleAudio}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                      isMuted
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                    }`}
                  >
                    {isMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-lime-400" />}
                    {isMuted ? 'Mic Muted' : 'Mic Live'}
                  </button>
                  <button
                    id="toggle-video-btn"
                    onClick={toggleVideo}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                      isVideoDisabled
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                    }`}
                  >
                    {isVideoDisabled ? <VideoOff className="w-3.5 h-3.5" /> : <Video className="w-3.5 h-3.5 text-lime-400" />}
                    {isVideoDisabled ? 'Video Paused' : 'Video Live'}
                  </button>
                </div>
              )}
            </div>

            {cameraError && (
              <p className="text-xs text-rose-400 font-semibold bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl">
                {cameraError}
              </p>
            )}
          </div>

          {/* Video Viewfinder Box */}
          <div className="lg:col-span-7">
            <div className="relative aspect-video w-full rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center">
              {/* Actual Video Feed */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover transform -scale-x-100 ${cameraActive ? 'block' : 'hidden'}`}
              />

              {/* Viewfinder Overlay Lines when Camera is Active */}
              {cameraActive && (
                <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-center text-[10px] text-lime-400 font-mono bg-slate-950/60 backdrop-blur-md px-3 py-1 rounded-full border border-lime-400/20 w-max">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" /> LIVE CAMERA FEED • READY FOR WHATSAPP
                    </span>
                  </div>

                  {/* Body guide silhouette wireframe */}
                  <div className="self-center border-2 border-dashed border-lime-400/40 rounded-3xl w-44 sm:w-56 h-40 sm:h-52 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-bold text-lime-400/80 bg-slate-950/80 px-2 py-0.5 rounded">
                      Position Body in Frame
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-slate-400">
                    <span>Aspect: 16:9 HD</span>
                    <span>Direct Call: {FORMATTED_PHONE}</span>
                  </div>
                </div>
              )}

              {/* Placeholder when camera is idle */}
              {!cameraActive && (
                <div className="text-center p-8 space-y-4 max-w-sm">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center text-slate-500">
                    <Camera className="w-8 h-8 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Camera Preview Inactive</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Click the button below to turn on your webcam or phone camera and check your workout framing.
                    </p>
                  </div>
                  <button
                    onClick={startCameraTest}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-lime-400 text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
                  >
                    Turn On Test Camera
                  </button>
                </div>
              )}
            </div>

            {/* Quick Action under Video */}
            {cameraActive && (
              <div className="mt-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between flex-wrap gap-2 text-xs">
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Camera framed properly? Launch your call with Coach Raja!
                </span>
                <button
                  onClick={() => handleStartWhatsAppCall()}
                  className="px-3.5 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold transition-colors cursor-pointer"
                >
                  Call Now on WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Consultation Request Form */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-bold text-lime-400 uppercase tracking-wider block mb-1">
            Custom Consultation Builder
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Customize Your Video Call Details
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Fill in your preferred topic and goals. We automatically format your message so Coach Raja is completely prepared for your session.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Input Controls */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Topic Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5">
                1. Select Video Call Topic
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {callTopics.map((topic) => {
                  const Icon = topic.icon;
                  const isSelected = selectedTopic === topic.id;
                  return (
                    <div
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-lime-400/10 border-lime-400 text-white shadow-md shadow-lime-500/5'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-lime-400' : 'text-slate-500'}`} />
                        <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                          isSelected ? 'bg-lime-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {topic.badge}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white mb-1">{topic.title}</h4>
                        <p className="text-[11px] text-slate-400 leading-tight">{topic.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Name & Primary Goal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Raja Kumar"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs outline-none focus:border-lime-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Fitness Goal
                </label>
                <select
                  value={fitnessGoal}
                  onChange={(e) => setFitnessGoal(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs outline-none focus:border-lime-400 transition-colors cursor-pointer"
                >
                  <option value="fat_loss">Fat Loss & Toning</option>
                  <option value="muscle_gain">Muscle Hypertrophy & Bulk</option>
                  <option value="endurance">Athletic Conditioning & Cardio</option>
                  <option value="posture">Mobility & Posture Alignment</option>
                </select>
              </div>
            </div>

            {/* Step 3: Preferred Time */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Preferred Call Timing
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: 'now', label: '⚡ Right Now' },
                  { id: 'today_eve', label: '🌆 Today Evening' },
                  { id: 'tomorrow_morn', label: '🌅 Tomorrow Morn' },
                  { id: 'custom', label: '📅 Custom Slot' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPreferredTime(item.id)}
                    className={`py-2 px-3 rounded-xl border font-semibold text-center transition-all cursor-pointer ${
                      preferredTime === item.id
                        ? 'bg-lime-400 text-slate-950 border-lime-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Notes / Specific Question */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Specific Exercise or Question (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Need knee pain advice on barbell squats & review my 2200 kcal macro plan..."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs outline-none focus:border-lime-400 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Right: Real-time WhatsApp Message Preview & Trigger */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-[#25D366]" /> Live WhatsApp Message Preview
                </span>
                <span className="text-[10px] bg-[#25D366]/10 text-[#25D366] px-2 py-0.5 rounded font-mono font-bold">
                  TO: {WHATSAPP_NUMBER}
                </span>
              </div>

              {/* Chat Bubble Display */}
              <div className="my-5 p-4 rounded-xl bg-[#0b141a] border border-emerald-950/60 font-sans text-xs text-slate-200 whitespace-pre-line leading-relaxed shadow-inner">
                {getConstructedMessage()}
              </div>

              <div className="text-[11px] text-slate-400 space-y-1">
                <p>• Clicking below opens WhatsApp on mobile, desktop app, or web.</p>
                <p>• The message will be pre-filled so you simply hit Send in WhatsApp.</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-850 space-y-3">
              <button
                id="send-custom-whatsapp-request-btn"
                onClick={() => handleStartWhatsAppCall()}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#25D366] to-emerald-500 hover:from-[#20bd5a] hover:to-emerald-400 text-slate-950 font-black text-sm shadow-lg shadow-[#25D366]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Video className="w-4 h-4 text-slate-950" />
                <span>Open WhatsApp & Call Trainer</span>
              </button>

              <div className="text-center">
                <span className="text-[11px] text-slate-500">
                  Direct Line: <strong className="text-slate-300">{FORMATTED_PHONE}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works - 4 Step Process */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-1">
          <h2 className="text-2xl font-bold text-white">How 1-on-1 Video Coaching Works</h2>
          <p className="text-xs text-slate-400">Zero complicated software. Everything happens right inside WhatsApp.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              step: '01',
              title: 'Tap to Connect',
              desc: 'Click the call button to open WhatsApp chat with Coach Raja (+91 7981452169).'
            },
            {
              step: '02',
              title: 'Call Confirmation',
              desc: 'Coach Raja accepts your video call request or confirms your designated time slot within minutes.'
            },
            {
              step: '03',
              title: 'Live Video Session',
              desc: 'Prop your phone up. Coach watches your workout form, counts tempo, and directs form adjustments live.'
            },
            {
              step: '04',
              title: 'Diet & Routine Plan',
              desc: 'Receive updated workout notes, calorie adjustments, and exercise recommendations via WhatsApp.'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative">
              <span className="text-2xl font-black text-lime-400/30 block mb-2 font-mono">{item.step}</span>
              <h3 className="font-bold text-white text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp QR Code Card (For Desktop Users) */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#25D366]/10 text-[#25D366] text-xs font-bold">
              <QrCode className="w-3.5 h-3.5" /> Instant Scan & Call
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              On Desktop? Scan with Your Phone to Video Call
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm max-w-lg leading-relaxed">
              Open your smartphone camera or WhatsApp scanner to immediately open the direct chat with Coach Raja (<strong>+91 7981452169</strong>) and start the video call.
            </p>
            <div className="pt-2">
              <button
                onClick={() => handleStartWhatsAppCall('Hi Coach Raja! Connecting from Desktop to initiate our WhatsApp Video Call.')}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-bold text-xs border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#25D366]" /> Open in WhatsApp Web / Desktop
              </button>
            </div>
          </div>

          <div className="md:col-span-4 flex justify-center">
            {/* Styled QR Code Box */}
            <div className="p-4 bg-white rounded-2xl shadow-xl flex flex-col items-center">
              {/* SVG QR Code representation for 7981452169 */}
              <div className="w-40 h-40 bg-slate-950 rounded-xl p-2.5 flex flex-col items-center justify-center relative">
                {/* SVG QR Code Mockup with WhatsApp center logo */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                  {/* Outer position markers */}
                  <rect x="5" y="5" width="25" height="25" rx="3" fill="none" stroke="white" strokeWidth="4" />
                  <rect x="11" y="11" width="13" height="13" rx="2" fill="white" />
                  
                  <rect x="70" y="5" width="25" height="25" rx="3" fill="none" stroke="white" strokeWidth="4" />
                  <rect x="76" y="11" width="13" height="13" rx="2" fill="white" />

                  <rect x="5" y="70" width="25" height="25" rx="3" fill="none" stroke="white" strokeWidth="4" />
                  <rect x="11" y="76" width="13" height="13" rx="2" fill="white" />

                  {/* Matrix dots pattern */}
                  <rect x="36" y="8" width="6" height="6" rx="1" fill="white" />
                  <rect x="48" y="8" width="6" height="6" rx="1" fill="white" />
                  <rect x="58" y="14" width="6" height="6" rx="1" fill="white" />
                  
                  <rect x="8" y="38" width="6" height="6" rx="1" fill="white" />
                  <rect x="20" y="44" width="6" height="6" rx="1" fill="white" />
                  
                  <rect x="76" y="38" width="6" height="6" rx="1" fill="white" />
                  <rect x="86" y="48" width="6" height="6" rx="1" fill="white" />

                  <rect x="38" y="76" width="6" height="6" rx="1" fill="white" />
                  <rect x="50" y="82" width="6" height="6" rx="1" fill="white" />
                  <rect x="62" y="76" width="6" height="6" rx="1" fill="white" />
                  <rect x="78" y="76" width="6" height="6" rx="1" fill="white" />
                  <rect x="86" y="86" width="6" height="6" rx="1" fill="white" />

                  {/* Center WhatsApp icon circle */}
                  <circle cx="50" cy="50" r="14" fill="#25D366" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Video className="w-4 h-4 text-slate-950" />
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-800 mt-2 font-mono">
                Scan to Call 7981452169
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-lime-400" /> WhatsApp Video Coaching FAQ
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-slate-950 border border-slate-850 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-white hover:text-lime-400 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-lime-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-850/60 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
