const squat = {
  name: 'Squat',
  // ..
};
const plank = {
  name: 'plank',
};

enum Unit {
  time,
  lbs,
  kg,
}

enum ExercsiseType {
  bodyWeight,
  bodyWeightPlusWeights,
}

const treadmill = {
  name: 'treadmill',
  unit: Unit.time,
};

interface WorkoutPlan {}

interface Exercise {
  id: number;
  // 'squat'
  name: String;
}

interface WorkoutExercisePart {
  exercise: Exercise;
  // 60s / 10m / 10kg / 15lbs
  amount: number;
  unit: Unit;
}

interface WorkoutExercise {
  // e.g. Plank 60s, 5 rep squat
  sets: WorkoutExercisePart[];
  // time to rest, e.g. 60s
  rest: number[];
}

// e.g. 5x5x5 Workout A
interface Workout {
  id: number;
  name: String;
  exercises: WorkoutExercise[];
  // either
  //   it's an ongoing workout to be cloned, or
  //   or a plan for a workout
  template: Boolean;
}
let workout: any;

// naïve 5x5
workout = {
  name: '3x5 A',
  exercises: [
    {
      exercise: squat,
      amount: 100,
      unit: 'kg',
      reps: 5,
      rest: 90, // seconds

      sets: [
        {
          completed: 5,
        },
        {
          completed: 4,
        },
        {
          completed: null, // not started
        },
      ],
    },
  ],
};

// cardio
workout = {
  name: 'cardio',
  exercises: [
    {
      exercise: treadmill,
      amount: 600,
      unit: 'time',
      reps: 1,
      rest: null,

      sets: [
        {
          completed: 600,
        },
      ],
    },
  ],
};

// superset squat + plank
workout = {
  name: 'superset',
  items: {
    name: 'squat+plank',
    supersets: [
      {
        exercises: [
          {
            exercise: treadmill,
            amount: 600,
            unit: 'time',
            reps: 1,
          },
          {
            exercise: squat,
            amount: 600,
            unit: 'time',
            reps: 1,
          },
        ],
      },
    ],
  },
};
