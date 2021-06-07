class TwitterAccount < ApplicationRecord

   def self.getTweetByName(name)
    found_user_name = TwitterAccount.where(name: name )
    tweets = []
    if found_user_name.length > 0
            #user found
            tweets = TwitterAccountFetcher.new(found_user_name[0].name).run
    else
        account = TwitterAccount.new(name:name)
        # if account.valid?
            # 
        tweets = TwitterAccountFetcher.new(name).run
        if tweets[0] != "Error" && account.valid?
            account.save!
        end
    end
     tweets
   end
end
