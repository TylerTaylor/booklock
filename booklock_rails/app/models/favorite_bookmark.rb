class FavoriteBookmark < ApplicationRecord
    belongs_to :user
    belongs_to :bookmark
end
