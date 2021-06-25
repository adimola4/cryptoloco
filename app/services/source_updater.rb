# frozen_string_literal: true

class SourceUpdater
  def initialize
    @sources = Source.all
    end

  def run
    @sources.each do |source|
      if source.id?
        Source::FetchWorker.perform_async(source.id)
      else
        p "not found"
      end
    end
  end
end
