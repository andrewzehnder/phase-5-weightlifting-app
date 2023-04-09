class CreateProgramsWorkouts < ActiveRecord::Migration[6.1]
  def change
    create_table :programs_workouts do |t|
      t.integer :program_id
      t.integer :workout_id

      t.timestamps
    end
  end
end
