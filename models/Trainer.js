import mongoose from 'mongoose';

const TrainerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the trainer's name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide the trainer's email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    specialties: {
      type: [String],
      required: [true, 'Please provide at least one specialty'],
      default: [],
    },
    experience: {
      type: Number, // in years
      required: [true, 'Please provide years of experience'],
    },
    bio: {
      type: String,
      required: [true, 'Please provide a short biography'],
    },
    image: {
      type: String,
      default: '/images/default-trainer.jpg',
    },
    rating: {
      type: Number,
      default: 5.0,
      min: 1.0,
      max: 5.0,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    rates: {
      type: Number, // hourly rate in USD
      required: [true, 'Please provide hourly training rate'],
    },
    availability: [
      {
        day: {
          type: String,
          enum: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          required: true,
        },
        slots: {
          type: [String], // e.g., ["08:00 AM - 09:00 AM", "10:00 AM - 11:00 AM"]
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Trainer || mongoose.model('Trainer', TrainerSchema);
