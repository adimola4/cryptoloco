class Source::UpdateWorker
  include Sidekiq::Worker
  sidekiq_options queue: :medium_priority, retry: 3

  def perform()
    logger.info "Source::UpdateWorker"
     SourceUpdater.new().run
  end
end
