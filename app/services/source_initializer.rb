# frozen_string_literal: true

class SourceInitializer
  require_relative("./page_parser")
  def initialize(source)
    @source = source
    @doc = ""
  end

  def run
    p "sourceInitializer running..."
    @doc = PageParser.new(@source.website_url).run

    channel = @doc.search("channel")
    desc = channel.xpath("description").inner_html.to_s.strip
    desc = "0" if desc == ""
    img = channel.search("image").xpath("url").inner_html.to_s.strip
    img = "none" if img == ""
    p channel.search("image").xpath("link").inner_html.to_s.strip

    # TitleGetter.new(channel.xpath('link').inner_html.to_s.strip)
    title = channel.xpath("title").inner_html.to_s.strip
    if title == ""
      title = @source.website_url
      return nil if img == "none" && desc == "0"
    end

    # generated_url = bucket_name + ".s3." + ENV["AWS_REGION"].to_s + ".amazonaws.com/source_files" + title_to_file_name + ".xml"
    @source.attributes = {
      title: title,
      description: desc,
      img_url: img,
    }
    @source.save!

   
  end
end
