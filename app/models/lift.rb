class Lift < ApplicationRecord
    has_many :weights
    has_many :workouts_lifts
    has_many :workouts, through: :workouts_lifts
end
