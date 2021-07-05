# frozen_string_literal: true

class CurrencyUpdate
  def initialize
    @currency = Currency.all
    @api_uri = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d'
  end

  def run
    @currencies_from_api = ApiCaller.new(@api_uri).run

    JSON(@currencies_from_api).each do |row|
      foundCurrency = Currency.where(api_id: row["id"])
      if !foundCurrency.empty?
        foundCurrency[0].update(rank: row["market_cap_rank"], market_cap_usd: row["market_cap"],
                                price_usd: row["current_price"], v24: row["total_volume"],
                                p24: row["price_change_percentage_24h_in_currency"], p1h: row["price_change_percentage_1h_in_currency"], p7d: row["price_change_percentage_7d_in_currency"])
      else
        CreateCurrency(row["id"])
      end
    end
  end

  def CreateCurrency(id)
    uri = "https://api.coingecko.com/api/v3/coins/" + id + "?localization=false&tickers=false&developer_data=true&sparkline=false"

    @currency_details = JSON(ApiCaller.new(uri).run)
    new_currency = Currency.new(api_id: @currency_details["id"], code: @currency_details["symbol"], title: @currency_details["name"], description: @currency_details["description"]["en"], rank: @currency_details["market_cap_rank"],
                                market_cap_usd: @currency_details["market_data"]["market_cap"]["usd"], price_usd: @currency_details["market_data"]["current_price"]["usd"], v24: @currency_details["market_data"]["total_volume"]["usd"],
                                p24: @currency_details["market_data"]["price_change_percentage_24h_in_currency"]["usd"], p1h: @currency_details["market_data"]["price_change_percentage_1h_in_currency"]["usd"], p7d: @currency_details["market_data"]["price_change_percentage_7d_in_currency"]["usd"],
                                img_url: @currency_details["image"]["small"])
    if new_currency.valid?
      new_currency.save!

      homepage = Link.new(currency_id: new_currency.id, kind: "Home_Page", url: @currency_details["links"]["homepage"][0])
      blockchain_site = Link.new(currency_id: new_currency.id, kind: "Blockchain_Site", url: @currency_details["links"]["blockchain_site"][0])
      reddit = Link.new(currency_id: new_currency.id, kind: "reedit", url: @currency_details["links"]["subreddit_url"])
      twitter = Link.new(currency_id: new_currency.id, kind: "twitter", url: "https://twitter.com/" + @currency_details["links"]["twitter_screen_name"])
      if homepage.valid?
        homepage.save!
        new_currency.links << homepage
      end
      if blockchain_site.valid?
        blockchain_site.save!
        new_currency.links << blockchain_site
      end
      if reddit.valid?
        reddit.save!
        new_currency.links << reddit
      end
      if twitter.valid?
        twitter.save!
        new_currency.links << twitter
      end

      @currency_details["categories"].to_ary.each do |c|
        new_currency.keywords << c
      end

      new_currency.save!
    end
    new_currency
  end
  end
