class WelcomeEmailMailer < ApplicationMailer
    def new_welcome_email
        @user = params[:user]
    
        mail(to: @user.email_address, subject: "Welcome to the Weightlifting App!")
      end
end
