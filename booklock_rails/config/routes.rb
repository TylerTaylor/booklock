Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  resources :bookmarks
  post '/upload', to: 'bookmarks#parse'

end
