class AddParentIdToFolders < ActiveRecord::Migration[5.1]
  def change
    add_column :folders, :parent_id, :bigint
  end
end
