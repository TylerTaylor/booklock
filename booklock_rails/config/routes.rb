Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  resources :bookmarks
  post '/upload', to: 'bookmarks#parse'
  post '/upload_single', to: 'bookmarks#create'
  get 'tags/:tag', to: 'bookmarks#index', as: :tag
  get 'add_viewing/:id', to: 'bookmarks#increase_view_count'
  post 'favorite/:id', to: 'bookmarks#favorite'
end
