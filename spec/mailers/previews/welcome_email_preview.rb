# Preview all emails at http://localhost:3000/rails/mailers/welcome_email
class WelcomeEmailPreview < ActionMailer::Preview

    require 'bcrypt'

    def new_welcome_email
        user = User.new(name: "Andrew Test", email_address: "chsbball232@yahoo.com", username: "andrewtest", password_digest: BCrypt::Password.create('Password1'))
    
        WelcomeEmailMailer.with(user: user).new_welcome_email
    end

end
