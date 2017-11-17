class Folder < ApplicationRecord
    has_many :bookmarks
    has_many :taggings, dependent: :destroy
    has_many :tags, through: :taggings
end
