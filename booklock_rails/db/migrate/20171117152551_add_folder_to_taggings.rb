class AddFolderToTaggings < ActiveRecord::Migration[5.1]
  def change
    add_reference :taggings, :folder, foreign_key: true
  end
end
