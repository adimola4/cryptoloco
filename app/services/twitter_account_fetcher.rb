# frozen_string_literal: true

class TwitterAccountFetcher
  require 'twitter'
  def initialize(name)
    @twitter_client = Twitter::REST::Client.new do |config|
      config.consumer_key = ENV["TWITTER_CONSUMER_KEY"].to_s
      config.consumer_secret     = ENV["TWITTER_CONFIG_CONSUMER_SECRET"].to_s
      config.access_token        = ENV["TWITTER_CONFIG_ACCESS_TOKEN"].to_s
      config.access_token_secret = ENV["TWITTER_CONFIG_ACCESS_TOKEN_SECRET"].to_s
    end
    @account = name
    @err_key = "Error"
    @err_msg = "Cannot find Twitter account for `#{name}`"
  end

  def run
    return [@err_key, @err_msg] if @twitter_client.user?(@account) == false

    res_tweets = []
    tweets = @twitter_client.user_timeline(@account, count: 40)

    tweets.to_ary.each do |t|
      next if t.reply? == false

      media_img = ""
      media_img = t.media[0].media_url_https.to_s if t.media?
      hash = []
      unless t.hashtags.empty?
        t.hashtags.each do |h|
          hash.push(h.text)
        end
      end
      tweet = {
        "url": t.uri.to_s,
        "name": @account,
        "full_text": t.full_text,
        "text": t.text,
        "hashtags": hash,
        "media": media_img,
        "retweet": t.retweet?,
        "profile_image": t.user.profile_image_url_https.to_s,
        "favorite_count": t.favorite_count,
        "quote_count": t.quote_count,
        "reply_count": t.reply_count,
        "retweet_count": t.retweet_count,
        "created_at": t.created_at
      }
      res_tweets << tweet
    end

    res_tweets
  end
end
