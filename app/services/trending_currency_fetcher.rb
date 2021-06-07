class TrendingCurrencyFetcher

    def initialize()
        # @currencies = Currency.all
        foundCurrency = Currency.where(trending: true) 
        foundCurrency.each do |c|
            c.trending = false
            c.save!            
        end
        p "start trending"
        @api_uri  = "https://api.coingecko.com/api/v3/search/trending"
    end
    def run
        @currencies_from_api = ApiCaller.new(@api_uri).run         
        res_currencies = []
        JSON(@currencies_from_api)["coins"].each do | row |
            
            foundCurrency = Currency.where(api_id: row["item"]["id"])
            if foundCurrency.length == 0
                currency = CurrencyUpdate.new().CreateCurrency(row["item"]["id"])
            else
                currency = foundCurrency[0]
            end
                currency.trending = true
                currency.save!
                p currency
            res_currencies << currency
        end
    end
end