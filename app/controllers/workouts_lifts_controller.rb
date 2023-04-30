class WorkoutsLiftsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def lifts_in_workout
        lifts = WorkoutsLift.where(workout_id: params[:id])
        associated_lifts = []
        lifts.each do |workout_lift|
            lift = Lift.find(workout_lift.lift_id)
            associated_lifts << lift.name
        end
        render json: associated_lifts
    end


private

    def render_unprocessable_entity(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found
        render json: { errors: "Not Found." }, status: :unauthorized
    end

end
