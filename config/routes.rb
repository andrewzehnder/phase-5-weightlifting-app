Rails.application.routes.draw do
  
  get "/users", to: "users#index"
  get "/me", to: "users#show"
  post "/user/create", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get "/lifts_all", to: "lifts#index"
  post "lifts", to: "lifts#create"

  get "/workouts_all", to: "workouts#index"
  post "/workouts", to: "workouts#create"
  delete "/workout/:id", to: "workouts#destroy"

  get "/programs_all", to: "programs#index"
  post "/programs", to: "programs#create"
  delete "/program/:id", to: "programs#destroy"

  get "/workoutlifts/:id", to: "workouts_lifts#lifts_in_workout"

  get "/programworkouts/:id", to: "programs_workouts#workouts_in_program"


  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
