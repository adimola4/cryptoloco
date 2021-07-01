# frozen_string_literal: true

class Currency::UpdateWorker
  include Sidekiq::Worker
  sidekiq_options queue: :medium_priority, retry: 3

  def perform
    CurrencyUpdate.new.run
  end
  end
