import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'trainer'],
      default: 'user',
    },
    profile: {
      age: { type: Number },
      gender: { type: String, enum: ['male', 'female', 'other'] },
      height: { type: Number }, // in cm
      weight: { type: Number }, // in kg
      targetWeight: { type: Number }, // in kg
      activityLevel: {
        type: String,
        enum: ['sedentary', 'light', 'moderate', 'active', 'very_active'],
        default: 'moderate',
      },
      fitnessGoal: {
        type: String,
        enum: ['weight_loss', 'muscle_gain', 'endurance', 'fitness'],
        default: 'fitness',
      },
    },
    progress: [
      {
        date: { type: Date, default: Date.now },
        weight: { type: Number },
        caloriesConsumed: { type: Number },
        waterIntake: { type: Number }, // in ml
        workoutsCompleted: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
