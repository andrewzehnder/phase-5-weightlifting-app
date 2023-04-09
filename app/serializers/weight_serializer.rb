class WeightSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :lift_id, :one_rep_max, :last_number_of_sets, :last_number_of_reps, :last_number_of_weight
end
