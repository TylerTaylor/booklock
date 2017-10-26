class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  # include ActionController::Helpers

  # def current_user
  #   binding.pry
  # end
end
