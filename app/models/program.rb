class Program < ApplicationRecord
    has_many :programs_workouts
    has_many :workouts, through: :programs_workouts
    has_many :users_programs
    has_many :users, through: :users_programs
end
