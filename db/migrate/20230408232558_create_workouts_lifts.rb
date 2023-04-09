class CreateWorkoutsLifts < ActiveRecord::Migration[6.1]
  def change
    create_table :workouts_lifts do |t|
      t.integer :workout_id
      t.integer :lift_id

      t.timestamps
    end
  end
end
