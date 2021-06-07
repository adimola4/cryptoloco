class TimeDiff 


    def initialize(from_time)
        @from_time = from_time
        @time_now = Time.now
      end
    
      def run
        @time_now =  Time.now
        seconds_diff = (@from_time - @time_now).to_i.abs
      
        hours = seconds_diff / 3600
        seconds_diff -= hours * 3600
        if hours > 24
          return "#{(hours / 24).to_i.abs}d ago"
        end 
    
        minutes = seconds_diff / 60
        seconds_diff -= minutes * 60
        if minutes > 60
          return "#{(minutes/60).to_i.abs}h age"
        end
    
        seconds = seconds_diff
        if seconds > 60 
          return "#{seconds}m ago"
        else 
          return "just now"
        end
      end

end