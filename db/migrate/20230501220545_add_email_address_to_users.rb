class AddEmailAddressToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :email_address, :string
  end
end
