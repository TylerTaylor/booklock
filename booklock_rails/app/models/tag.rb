class Tag < ApplicationRecord
    has_many :taggings
    has_many :bookmarks, through: :taggings
    has_many :folders, through: :taggings
end
