class ChangeFavoriteToIsFavorite < ActiveRecord::Migration[5.1]
  def change
    rename_column :bookmarks, :favorite, :is_favorite
  end
end
