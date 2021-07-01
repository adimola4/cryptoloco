# frozen_string_literal: true

class TrendingCurrencyFetcher
  def initialize
    foundCurrency = Currency.where(trending: true)
    foundCurrency.each do |c|
      c.trending = false
      c.save!
    end
    @api_uri = "https://api.coingecko.com/api/v3/search/trending"
  end

  def run
    @currencies_from_api = ApiCaller.new(@api_uri).run
    res_currencies = []
    JSON(@currencies_from_api)["coins"].each do |row|
      foundCurrency = Currency.where(api_id: row["item"]["id"])
      currency = if foundCurrency.empty?
                   CurrencyUpdate.new.CreateCurrency(row["item"]["id"])
                 else
                   foundCurrency[0]
                 end
      currency.trending = true
      currency.save!
      res_currencies << currency
    end
  end
end
