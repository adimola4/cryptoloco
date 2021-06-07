# frozen_string_literal: true

class TitleGetter
  require "httparty"

  def initialize(url)
    @url = url
  end

  def run
    return if @url == ""

    @response = HTTParty.get(@url, follow_redirects: false)
    @doc = Nokogiri::HTML(@response.to_s)
    p @doc.search("meta").search("title")
  end
end
