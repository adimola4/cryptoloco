require 'sidekiq'
module Sidekiq
  module Cron
    class Job
      def not_past_scheduled_time?(current_time)
        last_cron_time = parsed_cron.previous_time(current_time).utc
        return false if (current_time.to_i - last_cron_time.to_i) > (ENV["CRON_LOOKBACK_TIME"] || 60).to_i
        true
      end
    end
  end
end

schedule_file = "config/schedule.yml"
Sidekiq.options[:poll_interval] = 10
if File.exist?(schedule_file)
  Sidekiq::Cron::Job.load_from_hash!(YAML.load_file(schedule_file))
end

if Gem::Version.new(Sidekiq::VERSION) < Gem::Version.new('6.1')
  Redis.exists_returns_integer = true
else
  raise 'Time to remove Redis.exists_returns_integer: https://github.com/mperham/sidekiq/issues/4591'
end
 


if Rails.env.development?
    Sidekiq.configure_server do |config|
      config.redis = { url: 'redis://localhost:6379/0'}
    end
  
    Sidekiq.configure_client do |config|
      config.redis = { url: 'redis://localhost:6379/0'}
    end
elsif Rails.env.production?
  Sidekiq.configure_server do |config|
    config.redis = { url: ENV['REDISTOGO_URL'] || ENV['REDIS_URL']}
  end
  Sidekiq.configure_client do |config|
    config.redis = { url: ENV['REDISTOGO_URL'] || ENV['REDIS_URL'], size: 2 }
  end
elsif Rails.env.staging?
    Sidekiq.configure_server do |config|
      config.redis = { url: "#{ENV['REDIS_URL']}"}
    end
    Sidekiq.configure_client do |config|
      config.redis = { url: "#{ENV['REDIS_URL']}" }
    end
end