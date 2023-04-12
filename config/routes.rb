Rails.application.routes.draw do
  
  resources :users_programs
  resources :programs_workouts
  resources :workouts_lifts
  resources :programs
  resources :workouts
  resources :weights
  resources :lifts
  
  get "/users", to: "users#index"
  get "/me", to: "users#show"
  post "/user/create", to: "users#create"


  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
