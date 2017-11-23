class CreateFavoriteBookmarks < ActiveRecord::Migration[5.1]
  def change
    create_table :favorite_bookmarks do |t|
      t.integer :bookmark_id
      t.integer :user_id

      t.timestamps
    end
  end
end
