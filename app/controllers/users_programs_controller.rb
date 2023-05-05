class UsersProgramsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def programs
        user = User.find_by(id: session[:user_id])
        programs = UsersProgram.where(user_id: user.id)
        render json: programs 
      end

    def destroy
        program = UsersProgram.find(params[:id])
        program.destroy
    end

private

    def render_unprocessable_entity(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found
        render json: { errors: "Not Found." }, status: :unauthorized
    end
end
