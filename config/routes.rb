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
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/lifts_all", to: "lifts#index"


  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
