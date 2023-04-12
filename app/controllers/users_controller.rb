class UsersController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def index
      user = User.all.order(:id)
      render json: user
    end
  
    def create
      user = User.create(user_params)
      if user.valid?
        render json: user, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def show
      user = User.find_by(id: session[:user_id])
      render json: user, status: :created
    end
    
    private
  
    def user_params
      params.permit(:name, :username, :password, :password_confirmation)
    end

    def render_unprocessable_entity(invalid)
      render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found
      render json: { errors: "Not Found." }, status: :unauthorized
    end
end
