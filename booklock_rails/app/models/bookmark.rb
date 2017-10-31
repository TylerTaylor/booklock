class Bookmark < ApplicationRecord
  belongs_to :user, required: false

  validates :name, presence: true
  validates :url, presence: true, uniqueness: true
end
