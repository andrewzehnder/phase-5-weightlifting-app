class CreateWeights < ActiveRecord::Migration[6.1]
  def change
    create_table :weights do |t|
      t.integer :user_id
      t.integer :lift_id
      t.integer :one_rep_max
      t.integer :last_number_of_sets
      t.integer :last_number_of_reps
      t.integer :last_number_of_weight

      t.timestamps
    end
  end
end
