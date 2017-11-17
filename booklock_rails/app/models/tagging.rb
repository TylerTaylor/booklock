class Tagging < ApplicationRecord
  belongs_to :tag
  belongs_to :bookmark, required: false
  belongs_to :folder, required: false
end
