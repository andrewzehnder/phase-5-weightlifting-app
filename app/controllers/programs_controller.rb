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
        params[:workouts].each do |workout_id|
            workout = Workout.find(workout_id)
            program_workout = ProgramsWorkout.create(program_id: program.id, workout_id: workout.id)
        end 
        render json: { program: program, workouts: program.workouts }, status: :created
        else
        render json: { errors: program.errors.full_messages }, status: :unprocessable_entity
        end    
    end
  
    def show
    program = Program.includes(:programs_workouts => :workout).find(params[:id])
    render json: program.as_json(
        only: [:id, :name],
        include: {
        programs_workouts: {
            only: [],
            include: {
            workout: {
                only: [:id, :name, :day_of_the_week]
            }}}}
    )
    end
  
    def update
        program = Program.find(params[:id])
        program.update(program_params)
        
        program.programs_workouts.where(program_id: program.id).destroy_all
        
        params[:workouts].each do |workout_id|
            workout = Workout.find(workout_id)
            ProgramsWorkout.create(program_id: program.id, workout_id: workout.id)
        end

        render json: { program: program, workouts: program.workouts }, status: :ok
    end
      
  
    def destroy
        program = Program.find(params[:id])
        program.destroy
    end
  
  private
  
    def program_params
    params.require(:program).permit(:name, workouts: [])
    end

    def render_unprocessable_entity(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found
        render json: { errors: "Not Found." }, status: :unauthorized
    end
end
