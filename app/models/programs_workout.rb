class ProgramsWorkout < ApplicationRecord
    belongs_to :program
    belongs_to :workout
end
