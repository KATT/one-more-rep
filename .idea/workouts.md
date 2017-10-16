

## Exercises types

### 5x5x5 style

- X Sets, same weights
- increase X.XX kg every every workout
- Warmup
    - bar + [...] steps.
- Reset
    - When not done exercise > 1wk
    - Go down [10%]
- Rest timer, X seconds between reps.


### Cardio

- Type
- Time
- Resistance
- Speed
- Increases?
    - Add X% time
    -


### Supersets

- Combine 2-N exercises


### N-M style

- X sets, same weights
- "15-20" reps
- Increases?

Example: Dumbbells, 2 sets, 15-20 reps.


## Entities

- Workout program - program you define
- Workout - A workout that you start
- WorkoutExercises - the exercises you do
- WorkoutExercise - the exercise(s) you do during a workout
- Exercise - An exercise you do
- Set - A set of a WorkoutExercise
- Rep - A rep of a Set


Sketching ---

```graphql

enum Unit {
  seconds
  minutes
  lbs
  kg
}

type WorkoutPlan {

}

type Exercise {
  id: ID!
  # 'squat'
  name: String;
}

type WorkoutExercisePart {
  exercise: Exercise!
  # 60s / 10m / 10kg / 15lbs
  amount: number
  unit: Unit
}

type WorkoutExercise {
  # e.g. Plank 60s, 5 rep squat
  sets: [WorkoutExercisePart]!
  # time to rest, e.g. 60s
  rest: number
}

# e.g. 5x5x5 Workout A
type Workout {
  id: ID!
  name: String!
  exercises: [WorkoutExercise]!
  # either
  #   it's an ongoing workout to be cloned, or
  #   or a plan for a workout
  template: Boolean!
}


```


```ts
const squat = {
  name: 'Squat',
  // ..
}
const workout = {
  name: '3x5 A',
  exercises: [
    {
      sets: [
        {
          exercise: squat,
          amount: 100,
          unit: 'kg',
          reps: 5,
          completed: 5,
        },
        {
          exercise: squat,
          amount: 100,
          unit: 'kg',
          reps: 5,
          completed: 4,
        },
        {
          exercise: squat,
          amount: 100,
          unit: 'kg',
          reps: 5,
          completed: null, // not started
        },
      ]
    }
  ]
}
```
