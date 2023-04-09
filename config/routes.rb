Rails.application.routes.draw do
  
  resources :users_programs
  resources :programs_workouts
  resources :workouts_lifts
  resources :programs
  resources :workouts
  resources :weights
  resources :lifts
  resources :users
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
