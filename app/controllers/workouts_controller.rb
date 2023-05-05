class WorkoutsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    require 'date'
  
      def index
          workouts = Workout.all.order(:id)
          render json: workouts
      end
  
      def create
          workout = Workout.create(workout_params)
          if workout.valid?
            params[:lifts].each do |lift_id|
                lift = Lift.find(lift_id)
                workout_lift = WorkoutsLift.create(workout_id: workout.id, lift_id: lift.id)
            end 
          render json: { workout: workout, lifts: workout.lifts }, status: :created
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

    #   def todays_workouts
    #     day_of_week = Date.today.strftime('%A')
      
    #     user = User.find_by(id: session[:user_id])
    #     user_programs = UsersProgram.where(user_id: user.id)
    #     program_ids = user_programs.pluck(:program_id)
    #     program_id = program_ids.first
      
    #     program_workouts = ProgramsWorkout.where(program_id: program_id)
      
    #     workouts = []
    #     program_workouts.each do |pw|
    #         workout = Workout.find_by(id: pw.workout_id)
    #         if workout.day_of_the_week == day_of_week
    #             workouts << workout
    #         end
    #     end

    #     render json: workouts
    #   end

    def todays_workouts
        day_of_week = Date.today.strftime('%A')
        
        user = User.find_by(id: session[:user_id])
        program_workouts = ProgramsWorkout.where(program_id: user.users_programs.pluck(:program_id), workout_id: Workout.where(day_of_the_week: day_of_week).pluck(:id)).joins(:workout).order('workouts.id')
        
        render json: program_workouts.first.workout
      end
      
      
  
  private
  
      def workout_params
          params.require(:workout).permit(:name, :day_of_the_week, lifts: [])
      end
  
      def render_unprocessable_entity(invalid)
          render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
      end
  
      def render_not_found
          render json: { errors: "Not Found." }, status: :unauthorized
      end
end
