class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, 
         :registerable,   
         :recoverable, 
         :rememberable, 
         :trackable, 
         :validatable,
         :omniauthable
  include DeviseTokenAuth::Concerns::User

  has_many :bookmarks
  has_many :folders

  has_many :favorite_bookmarks
  has_many :favorites, through: :favorite_bookmarks, source: :bookmark
end
