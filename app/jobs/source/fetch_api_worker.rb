class Source::FetchApiWorker
    include Sidekiq::Worker
    sidekiq_options queue: :medium_priority, retry: 3
    def perform(url, *api_keys)
      return if url.nil?
      puts "Source::FetchApiWorker", url      
      @data = ApiCaller.new(url, api_keys).run
      @data
    end
end
  