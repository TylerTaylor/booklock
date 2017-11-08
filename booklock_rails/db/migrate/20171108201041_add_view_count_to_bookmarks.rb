class AddViewCountToBookmarks < ActiveRecord::Migration[5.1]
  def change
    add_column :bookmarks, :view_count, :integer
  end
end
