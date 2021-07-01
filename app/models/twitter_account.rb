# frozen_string_literal: true

class TwitterAccount < ApplicationRecord
  def self.getTweetByName(name)
    found_user_name = TwitterAccount.where(name: name)
    tweets = []
    if !found_user_name.empty?
      # user found
      tweets = TwitterAccountFetcher.new(found_user_name[0].name).run
    else
      account = TwitterAccount.new(name: name)
      # if account.valid?
      #
      tweets = TwitterAccountFetcher.new(name).run
      account.save! if tweets[0] != "Error" && account.valid?
    end
    tweets
  end
end
