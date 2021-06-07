class Article::RemoveWorker
    include Sidekiq::Worker
    sidekiq_options queue: :high_priority, retry: 3
  
    def perform()
      logger.info "Article::RemoveWorker"
      ArticleRemover.new().run
    end
  end
  