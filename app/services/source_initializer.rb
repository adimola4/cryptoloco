# frozen_string_literal: true

class SourceInitializer
  require_relative("./page_parser")
  def initialize(source)
    @source = source
    @doc = ""
  end

  def run
    @doc = PageParser.new(@source.website_url).run

    channel = @doc.search("channel")
    desc = channel.xpath("description").inner_html.to_s.strip
    desc = "0" if desc == ""
    img = channel.search("image").xpath("url").inner_html.to_s.strip
    img = "none" if img == ""

    title = channel.xpath("title").inner_html.to_s.strip
    if title == ""
      title = @source.website_url
      return nil if img == "none" && desc == "0"
    end

    @source.attributes = {
      title: title,
      description: desc,
      img_url: img
    }
    @source.save!
  end
end
