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
  get "/todaysworkouts", to: "workouts#todays_workouts"

  get "/programs_all", to: "programs#index"
  get "/program/:id", to: "programs#show"
  post "/programs", to: "programs#create"
  patch "program/:id", to: "programs#update"
  delete "/program/:id", to: "programs#destroy"

  get "/weight/:id", to: "weights#show"

  get "/workoutlifts/:id", to: "workouts_lifts#lifts_in_workout"

  get "/programworkouts/:id", to: "programs_workouts#workouts_in_program"
  delete "/programworkouts/:id", to: "programs_workouts#destroy"


  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
