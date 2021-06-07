# frozen_string_literal: true

class ApiCaller
    require "httparty"
  
    def initialize(url, *api_keys)
      @url = url
      @type = ""
      @response = ""
    end

    def run 
        return if @url.nil?
        p @url
        @response = HTTParty.get(@url)
        return if @response.code.to_s != "200"
        #  puts @response.body, @response.code, @response.message, @response.headers.inspect
        @response.body
    end
end