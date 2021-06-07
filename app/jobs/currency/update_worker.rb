class Currency::UpdateWorker
    include Sidekiq::Worker
    sidekiq_options queue: :medium_priority, retry: 3
  
    def perform()
      logger.info "Currency::UpdateWorker"
      CurrencyUpdate.new().run
    end
  end
  