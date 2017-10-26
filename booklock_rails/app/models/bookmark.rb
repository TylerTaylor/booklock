class Bookmark < ApplicationRecord
  belongs_to :user, required: false
end
