# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'bcrypt'

puts "🌱 Seeding..."

# Creating two users
user1 = User.create(name: "John", username: "johndoe", password_digest: BCrypt::Password.create('Password1'))
user2 = User.create(name: "Jane", username: "janedoe", password_digest: BCrypt::Password.create('Password1'))

# Create lifts
chest_lifts = [
  Lift.create(name: "Bench Press", body_part: "Chest"),
  Lift.create(name: "Incline Bench Press", body_part: "Chest"),
  Lift.create(name: "Chest Fly", body_part: "Chest")
]

back_lifts = [
  Lift.create(name: "Deadlift", body_part: "Back"),
  Lift.create(name: "Pull-Ups", body_part: "Back"),
  Lift.create(name: "Lat Pulldowns", body_part: "Back")
]

# Create weights
chest_lifts.each do |lift|
  Weight.create(user_id: user1.id, lift_id: lift.id, one_rep_max: rand(100..300), last_number_of_sets: rand(1..5), last_number_of_reps: rand(1..10), last_number_of_weight: rand(50..200))
  Weight.create(user_id: user2.id, lift_id: lift.id, one_rep_max: rand(100..300), last_number_of_sets: rand(1..5), last_number_of_reps: rand(1..10), last_number_of_weight: rand(50..200))
end

back_lifts.each do |lift|
  Weight.create(user_id: user1.id, lift_id: lift.id, one_rep_max: rand(100..300), last_number_of_sets: rand(1..5), last_number_of_reps: rand(1..10), last_number_of_weight: rand(50..200))
  Weight.create(user_id: user2.id, lift_id: lift.id, one_rep_max: rand(100..300), last_number_of_sets: rand(1..5), last_number_of_reps: rand(1..10), last_number_of_weight: rand(50..200))
end

# Create workouts
chest_workout = Workout.create(name: "Chest Workout", day_of_the_week: "Monday")
back_workout = Workout.create(name: "Back Workout", day_of_the_week: "Wednesday")

# Link lifts to workouts
chest_lifts.each do |lift|
  WorkoutsLift.create(workout_id: chest_workout.id, lift_id: lift.id)
end

back_lifts.each do |lift|
  WorkoutsLift.create(workout_id: back_workout.id, lift_id: lift.id)
end

# Create program
test_program = Program.create(name: "Test Program")

# Link workouts to program
ProgramsWorkout.create(program_id: test_program.id, workout_id: chest_workout.id)
ProgramsWorkout.create(program_id: test_program.id, workout_id: back_workout.id)

# Link program to users
UsersProgram.create(user_id: user1.id, program_id: test_program.id)
UsersProgram.create(user_id: user2.id, program_id: test_program.id)

puts "✅ Done seeding!"