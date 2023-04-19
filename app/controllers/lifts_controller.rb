class LiftsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  
      def index
          lifts = Lift.all.order(:id)
          render json: lifts
      end
  
      def create
          lift = Lift.create(lift_params)
          if lift.valid?
          render json: lift, status: :created
          else
          render json: { errors: lift.errors.full_messages }, status: :unprocessable_entity
          end
      end
  
      def show
          lift = Lift.find(params[:id])
          render json: lift
      end
  
      def update
          lift = Lift.find(params[:id])
          lift.update(lift_params)
          render json: lift
      end
  
      def destroy
          lift = Lift.find(params[:id])
          lift.destroy
      end
  
  private
  
      def lift_params
          params.permit(:name, :body_part)
      end
  
      def render_unprocessable_entity(invalid)
          render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
      end
  
      def render_not_found
          render json: { errors: "Not Found." }, status: :unauthorized
      end
end
