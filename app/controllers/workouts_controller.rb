class WorkoutsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  
      def index
          workouts = Workout.all.order(:id)
          render json: workouts
      end
  
      def create
          workout = Workout.create(workout_params)
          if workout.valid?
          render json: workout, status: :created
          else
          render json: { errors: workout.errors.full_messages }, status: :unprocessable_entity
          end
      end
  
      def show
          workout = Workout.find(params[:id])
          render json: workout
      end
  
      def update
          workout = Workout.find(params[:id])
          workout.update(workout_params)
          render json: workout
      end
  
      def destroy
          workout = Workout.find(params[:id])
          workout.destroy
      end
  
  private
  
      def workout_params
          params.permit(:name, :day_of_the_week)
      end
  
      def render_unprocessable_entity(invalid)
          render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
      end
  
      def render_not_found
          render json: { errors: "Not Found." }, status: :unauthorized
      end
end
