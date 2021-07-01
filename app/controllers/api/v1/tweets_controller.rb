# frozen_string_literal: true

class Api::V1::TweetsController < ActionController::API
  require_relative("../../../services/twitter_fetcher")

  def index
    tweets = TwitterFetcher.new.run
    render json: tweets
  end

  def new
    user_name = params[:twitter_user_name]
    if user_name.nil?
      render json: [{ "msg": "twitter user name is required!" }], status: :not_acceptable
      return
    end
    tweets = TwitterAccount.getTweetByName(user_name)
    if tweets[0] == "Error"
      render json: [{ "msg": tweets[1] }], status: :not_acceptable
      return
    else
      render json: tweets
    end
  end
end
