# frozen_string_literal: true

class SourceUpdater
  def initialize
    @sources = Source.all
    end

  def run
    p "source Updater..."
    @sources.each do |source|
      p source
      if source.id?

        Source::FetchWorker.perform_async(source.id)
      else
        p "not found"
      end
    end
  end
end
