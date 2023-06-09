class ProgramsWorkoutsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def workouts_in_program
        workouts = ProgramsWorkout.where(program_id: params[:id])
        associated_workouts = []
        workouts.each do |program_workout|
          workout = Workout.find(program_workout.workout_id)
          label = "#{workout.name} - #{workout.day_of_the_week}"
          associated_workouts << label
        end
        render json: associated_workouts
      end

    def destroy
        program_workout = ProgramsWorkout.find(params[:id])
        program_workout.destroy
    end

private

    def render_unprocessable_entity(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found
        render json: { errors: "Not Found." }, status: :unauthorized
    end
end
