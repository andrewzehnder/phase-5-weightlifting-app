class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true, uniqueness: true
    has_many :weights
    has_many :users_programs
    has_many :programs, through: :users_programs
end
