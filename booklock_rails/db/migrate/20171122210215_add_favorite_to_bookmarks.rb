class AddFavoriteToBookmarks < ActiveRecord::Migration[5.1]
  def change
    add_column :bookmarks, :favorite, :boolean, default: false
  end
end
