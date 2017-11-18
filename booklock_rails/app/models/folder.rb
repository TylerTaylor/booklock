class Folder < ApplicationRecord
    has_many :bookmarks
    has_many :taggings, dependent: :destroy
    has_many :tags, through: :taggings

    belongs_to :user, required: false
    belongs_to :parent, class_name: "Folder", required: false
    has_many :folders, foreign_key: "parent_id"
end
