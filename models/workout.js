const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now()
    },
    exercises: [
        {
            type: {
                type: String,
                enum: ["resistance", "cardio"],
                require: true
            },
            name: {
                type: String,
                trim: true,
                required: "Must enter an exercise name!"
            },
            duration: {
                type: Number,
                min: [1, "Duration must be at least one minute!"]
            },
            distance: Number,
            weight: Number,
            reps: Number,
            sets: Number
        }
    ]
})

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;