# frozen_string_literal: true

class Source::FetchWorker
  include Sidekiq::Worker
  sidekiq_options queue: :medium_priority, retry: 3

  def perform(source_id)
    source = Source.find(source_id)
    Source.get_feed(source)
  end
end
