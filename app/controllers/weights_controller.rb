class WeightsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  
    def index
        weights = Weight.all.order(:id)
        render json: weight
    end

    def create
        weight = Weight.create(weight_params)
        if weight.valid?
        render json: weight, status: :created
        else
        render json: { errors: weight.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        user = User.find_by(id: session[:user_id])
        weight = Weight.where(lift_id: params[:id], user_id: user.id)
        render json: weight
    end

    def update
        weight = Weight.find(params[:id])
        weight.update(weight_params)
        render json: weight
    end

    def destroy
        weight = Weight.find(params[:id])
        weight.destroy
    end
  
  private
  
      def weight_params
          params.permit(:user_id, :lift_id, :one_rep_max, :last_number_of_sets, :last_number_of_reps, :last_number_of_weight)
      end
  
      def render_unprocessable_entity(invalid)
          render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
      end
  
      def render_not_found
          render json: { errors: "Not Found." }, status: :unauthorized
      end
end
