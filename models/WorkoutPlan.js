import mongoose from 'mongoose';

const WorkoutPlanSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a workout plan title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a workout plan description'],
    },
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trainer',
      required: false, // Can be null if it's a general/system plan
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
      required: true,
    },
    durationWeeks: {
      type: Number,
      default: 4,
      required: true,
    },
    daysPerWeek: {
      type: Number,
      default: 3,
      required: true,
    },
    exercises: [
      {
        dayName: {
          type: String, // e.g., "Day 1: Upper Body Push" or "Monday"
          required: true,
        },
        focusArea: {
          type: String,
          required: true,
        },
        list: [
          {
            name: { type: String, required: true },
            sets: { type: Number, default: 3 },
            reps: { type: String, default: '10-12' }, // e.g., '10-12' or 'AMRAP'
            restSeconds: { type: Number, default: 60 },
          },
        ],
      },
    ],
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.WorkoutPlan ||
  mongoose.model('WorkoutPlan', WorkoutPlanSchema);
