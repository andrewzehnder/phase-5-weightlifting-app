class ProgramsWorkoutsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def workouts_in_program
        program = ProgramsWorkout.where(program_id: params[:id])
        program_ids = program.pluck(:id)
        associated_workouts = []
        program_ids.each do |id|
            workout = Workout.find(id)
            label = "#{workout.name} - #{workout.day_of_the_week}"
            associated_workouts << label
        end
        render json: associated_workouts
    end

private

    def render_unprocessable_entity(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found
        render json: { errors: "Not Found." }, status: :unauthorized
    end
end
