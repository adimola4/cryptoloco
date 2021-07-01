# frozen_string_literal: true

class SourceUpdater
  def initialize
    @sources = Source.all
    end

  def run
    @sources.each do |source|
      Source::FetchWorker.perform_async(source.id) if source.id?
    end
  end
end
