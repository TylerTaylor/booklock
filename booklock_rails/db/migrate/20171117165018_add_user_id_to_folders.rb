class AddUserIdToFolders < ActiveRecord::Migration[5.1]
  def change
    add_column :folders, :user_id, :bigint
  end
end
