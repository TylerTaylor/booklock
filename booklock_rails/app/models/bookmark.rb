class Bookmark < ApplicationRecord
  # attr_accessor :name, :url, :reading_list, :tag_list
  belongs_to :user, required: false
  belongs_to :folder, required: false
  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings

  accepts_nested_attributes_for :tags

  validates :name, presence: true
  validates :url, presence: true, uniqueness: true

  has_many :favorite_bookmarks
  has_many :favorited_by, through: :favorite_bookmarks, source: :user

  def self.tagged_with(name)
    Tag.find_by_name!(name).bookmarks
  end

  def self.tag_counts
    Tag.select("tags.*, count(taggings.tag_id) as count").
      joins(:taggings).group("taggings.tag_id")
  end

  def tag_list
    tags.map(&:name).join(", ")
  end

  def tag_list=(names)
    # Take in a list of names, split on commas, then create our Tags
    self.tags = names.split(",").map do |n|
      Tag.where(name: n.strip).first_or_create!
    end
  end

end
