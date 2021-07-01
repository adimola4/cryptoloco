# frozen_string_literal: true

class TimeDiff
  def initialize(from_time)
    @from_time = from_time
    @time_now = Time.zone.now
    end

  def run
    @time_now =  Time.zone.now
    seconds_diff = (@from_time - @time_now).to_i.abs

    hours = seconds_diff / 3600
    seconds_diff -= hours * 3600
    return "#{(hours / 24).to_i.abs}d ago" if hours > 24

    minutes = seconds_diff / 60
    seconds_diff -= minutes * 60
    return "#{(minutes / 60).to_i.abs}h age" if minutes > 60

    seconds = seconds_diff
    if seconds > 60
      return "#{seconds}m ago"
    else
      return "just now"
    end
  end
end
