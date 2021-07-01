# frozen_string_literal: true

class Source::UpdateWorker
  include Sidekiq::Worker
  sidekiq_options queue: :medium_priority, retry: 3

  def perform
    SourceUpdater.new.run
  end
end
