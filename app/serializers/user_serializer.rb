class UserSerializer < ActiveModel::Serializer
  attributes :id, :email_address, :name, :username, :password_digest
end
