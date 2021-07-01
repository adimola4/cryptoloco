# frozen_string_literal: true

class Api::V1::CurrenciesController < ActionController::API
  require_relative("../../../services/trending_currency_fetcher.rb")

  def index
    @currencies = Currency.sort_by_rank.limit(25)
    @res = []
    @currencies.each do |c|
      @res << {
        'api_id': c.api_id,
        'code': c.code,
        'title': c.title,
        'rank': c.rank,
        'description': c.description,
        'market_cap_usd': c.market_cap_usd,
        'keywords': c.keywords,
        'price_usd': c.price_usd,
        'v24': c.v24,
        'p24': c.p24,
        'p1h': c.p1h,
        'p7d': c.p7d,
        'links': c.links,
        'img_url': c.img_url
      }
    end
    render json: @res
  end

  def show
    @currency = Currency.where(api_id: params[:api_id])
    return null if @currency.empty?

    @res = {
      'api_id': @currency[0].api_id,
      'code': @currency[0].code,
      'title': @currency[0].title,
      'rank': @currency[0].rank,
      'description': @currency[0].description,
      'market_cap_usd': @currency[0].market_cap_usd,
      'keywords': @currency[0].keywords,
      'price_usd': @currency[0].price_usd,
      'v24': @currency[0].v24,
      'p24': @currency[0].p24,
      'p1h': @currency[0].p1h,
      'p7d': @currency[0].p7d,
      'links': @currency[0].links,
      'img_url': @currency[0].img_url
    }
    render json: @res
  end

  def trending
    @trending_currencis = Currency.where(trending: true)
    @res = []
    @trending_currencis.each do |c|
      @res << {
        'api_id': c.api_id,
        'code': c.code,
        'title': c.title,
        'rank': c.rank,
        'description': c.description,
        'market_cap_usd': c.market_cap_usd,
        'keywords': c.keywords,
        'price_usd': c.price_usd,
        'v24': c.v24,
        'p24': c.p24,
        'p1h': c.p1h,
        'p7d': c.p7d,
        'links': c.links,
        'img_url': c.img_url
      }
    end
    render json: @res
  end
end
