require 'rails_helper'

RSpec.describe Bookmark, type: :model do

  it "has a valid factory" do
    expect(FactoryGirl.build(:bookmark)).to be_valid
  end

  it "is valid with a name and url" do
    bookmark = FactoryGirl.build(:bookmark)
    expect(bookmark).to be_valid
  end

  it "is invalid without a name" do
    bookmark = FactoryGirl.build(:bookmark, name: nil)
    bookmark.valid?
    expect(bookmark.errors[:name]).to include("can't be blank")
  end

  it "is invalid without a url" do
    bookmark = FactoryGirl.build(:bookmark, url: nil)
    bookmark.valid?
    expect(bookmark.errors[:url]).to include("can't be blank")
  end

  # it "is invalid with a duplicate url" do

  # end

end
