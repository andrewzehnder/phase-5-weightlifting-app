class ProgramsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  
      def index
          programs = Program.all.order(:id)
          render json: programs
      end
  
      def create
          program = Program.create(program_params)
          if program.valid?
          render json: program, status: :created
          else
          render json: { errors: program.errors.full_messages }, status: :unprocessable_entity
          end
      end
  
      def show
          program = Program.find(params[:id])
          render json: program
      end
  
      def update
          program = Program.find(params[:id])
          program.update(program_params)
          render json: program
      end
  
      def destroy
          program = Program.find(params[:id])
          program.destroy
      end
  
  private
  
      def program_params
          params.permit(:name)
      end
  
      def render_unprocessable_entity(invalid)
          render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
      end
  
      def render_not_found
          render json: { errors: "Not Found." }, status: :unauthorized
      end
end
