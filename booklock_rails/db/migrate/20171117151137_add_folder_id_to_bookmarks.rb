class AddFolderIdToBookmarks < ActiveRecord::Migration[5.1]
  def change
    add_column :bookmarks, :folder_id, :integer
  end
end
