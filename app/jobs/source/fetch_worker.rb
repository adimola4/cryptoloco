class Source::FetchWorker
  include Sidekiq::Worker
  sidekiq_options queue: :medium_priority, retry: 3

  def perform(source_id)
    p "aaaa"
    source = Source.find(source_id)
    puts "Source::FetchWorker", source
    Source.get_feed(source)
  end
end
