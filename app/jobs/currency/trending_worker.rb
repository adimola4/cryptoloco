class Currency::TrendingWorker
    include Sidekiq::Worker
    sidekiq_options queue: :medium_priority, retry: 3

    def perform()

        TrendingCurrencyFetcher.new().run
    end
    
end