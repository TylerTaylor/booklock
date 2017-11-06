Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  resources :bookmarks
  post '/upload', to: 'bookmarks#parse'
  post '/upload_single', to: 'bookmarks#create'
  get 'tags/:tag', to: 'bookmarks#index', as: :tag
end
