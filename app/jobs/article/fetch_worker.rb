class Article::FetchWorker
  include Sidekiq::Worker
  sidekiq_options queue: :high_priority, retry: 10

  def perform(article_id)
    logger.info "---Article::FetchWorker---"
    article = Article.find(article_id)
   
    article.get_full_html_content
  end
end
