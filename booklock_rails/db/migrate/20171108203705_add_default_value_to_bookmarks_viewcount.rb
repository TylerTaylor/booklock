class AddDefaultValueToBookmarksViewcount < ActiveRecord::Migration[5.1]
  def up
    change_column_default :bookmarks, :view_count, 0
  end

  def down
    change_column_default :bookmarks, :view_count, nil
  end
end
