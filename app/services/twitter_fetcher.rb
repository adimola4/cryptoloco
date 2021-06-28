# frozen_string_literal: true

class TwitterFetcher
    require 'twitter'
    def initialize()
        @twitter_client = Twitter::REST::Client.new do |config|
            config.consumer_key        = ENV["TWITTER_CONSUMER_KEY"].to_s
            config.consumer_secret     = ENV["TWITTER_CONFIG_CONSUMER_SECRET"].to_s
            config.access_token        = ENV["TWITTER_CONFIG_ACCESS_TOKEN"].to_s
            config.access_token_secret = ENV["TWITTER_CONFIG_ACCESS_TOKEN_SECRET"].to_s
        end
        @accounts = TwitterAccount.all
    end

    def run
        res_tweets = []
        

        @accounts.each do | account |
            # p account.name
            # p JSON(@twitter_client.user_search(account.name)).to_param
            tweets = @twitter_client.user_timeline(account.name, count: 10)
            # p tweets.methods
            tweets.to_ary.each do |t|
                 next if t.reply? == false 
                 p t.metadata
                 media_img = ""
                 if t.media?
                    media_img = t.media[0].media_url_https.to_s
                 end
                 hash =[]
                 if t.hashtags.length > 0
                    t.hashtags.each do | h |
                        hash.push(h.text)
                    end
                 end
                tweet = {
                    "url": t.uri.to_s,
                    "name": account.name,
                    "full_text": t.full_text,
                    "text": t.text,
                    "hashtags": hash,
                    "media":  media_img,
                    "retweet": t.retweet?,
                    "profile_image": t.user.profile_image_url_https.to_s,
                    "favorite_count": t.favorite_count,
                    "quote_count": t.quote_count,
                    "reply_count": t.reply_count,
                    "retweet_count": t.retweet_count,
                    "created_at": t.created_at
                 }
                # puts t.user.profile_image_url_https
                res_tweets << tweet
            end
        end

        return res_tweets
        

    end

# tweeter links 
# name
# t. methods --- options
#     uri
# text?
# text
# user?
# lang
# filter_level
# in_reply_to_screen_name
# favorite_count
# in_reply_to_status_id
# in_reply_to_user_id
# quote_count
# reply_count
# retweet_count
# in_reply_to_tweet_id
# reply?
# in_reply_to_user_id?
# geo
# place
# retweeted_status
# quoted_status
# current_user_retweet
# retweeted_tweet
# retweet?
# retweeted_status?
# metadata
# quoted_tweet
# quote?
# quoted_status?
# quoted_tweet?
# retweeted_tweet?
# url
# filter_level?
# in_reply_to_screen_name?
# favorite_count?
# in_reply_to_status_id?
# lang?
# reply_count?
# retweet_count?
# quote_count?
# source?
# metadata?
# geo?
# current_user_retweet?
# place?
# possibly_sensitive?
# favorited?
# truncated?
# user
# full_text
# retweeted?
# source
# symbols
# entities?
# hashtags
# uris
# hashtags?
# media
# media?
# symbols?
# urls
# uris?
# urls?
# user_mentions
# user_mentions?
# created?
# created_at
end