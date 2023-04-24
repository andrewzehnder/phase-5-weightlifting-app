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


  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
