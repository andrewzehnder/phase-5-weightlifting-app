class Workout < ApplicationRecord
    has_many :workouts_lifts
    has_many :lifts, through: :workouts_lifts
    has_many :programs_workouts
    has_many :programs, through: :programs_workouts
end
