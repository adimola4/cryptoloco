# frozen_string_literal: true

class Article::RemoveWorker
  include Sidekiq::Worker
  sidekiq_options queue: :high_priority, retry: 3

  def perform
    ArticleRemover.new.run
  end
  end
