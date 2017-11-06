class Tag < ApplicationRecord
    has_many :taggings
    has_many :bookmarks, through: :taggings
end
