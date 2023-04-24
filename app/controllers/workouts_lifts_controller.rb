class WorkoutsLiftsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def lifts_in_workout
        lifts = WorkoutsLift.where(workout_id: params[:id])
        lift_ids = lifts.pluck(:id)
        associated_lifts = []
        lift_ids.each do |id|
            lift = Lift.find(id)
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
