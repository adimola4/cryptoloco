# frozen_string_literal: true

class SourceFetcher
  require "httparty"

  def initialize(source)
    puts "SourceFetcher------", source.Domain
    @source = source
    @doc = ""
  end

  def run
    @doc = PageParser.new(@source.website_url).run
    if @source.type == "Media"
      @feed = create_youtube_feed

      return @feed
    end
    path = ["item link", "item guid", "entry link[rel=alternate]", "entry link"].detect do |tpath|
      @doc.at(tpath)
    end

    return nil unless path

    node = @doc.at(path)
    article_url = (node.inner_html.presence || node["href"]).to_s.strip
    @feed = []
    i = 1

    @doc.css("item").each do |item|
      url = ""
      if item.xpath("guid").to_s["isPermaLink"] == "isPermaLink" || !item.xpath("guid").nil?

        url = item.xpath("guid").inner_html.to_s.strip
        url = item.xpath("link").inner_html.to_s.strip unless url.include?("http")
      else

        url = item.xpath("link").inner_html.to_s.strip || item.xpath("url").inner_html.to_s.strip
      end
      title = item.xpath("title").inner_html.to_s.strip

      title = get_title_from_url(url) if title == "" && url != ""

      keywords = get_keywords_of_article(item)

      article_data = ArticleFetcher.new(url).run

      @feed << {
        "title" => article_data["title"] || item.xpath("title").inner_html.to_s.strip,
        "description" => article_data["description"] || item.xpath("description").inner_html.to_s.strip,
        "content" => article_data["content"] || "coming soon...",
        "type_of_content" => "Article",
        "original_url" => url,
        "keywords" => keywords,
        "image_url" => article_data["image_url"],
        "published_date" => item.xpath("pubDate", "published_date", "pubdate").inner_html
      }
    end
    @feed
   end

  def get_title_from_url(url)
    @doco = PageParser.new(url).run
    title = ""
    @doco.search("meta").css("meta").each do |item|
      if item.to_s["twitter:title"] == "twitter:title" || item.to_s["og:title"] == "og:title"
        title = item["content"]
      end
    end
    title
  end

  def get_keywords_of_article(item)
    keywords = []
    item.xpath("category").each do |word|
      keywords << word.text.strip
    end
    keywords
  end

  def create_youtube_feed
    feed = []
    @doc.css("entry").each do |item|
      original_url = "https://www.youtube.com/watch?v=#{item.xpath('yt:videoId').inner_html.to_s.strip}"
      title = item.xpath("media:group/media:title").inner_html.to_s.strip
      published = item.css("published").inner_html.to_s.strip
      description = item.xpath("media:group/media:description").inner_html.to_s.strip
      type_of_content = "Video"
      img = item.xpath("media:group/media:thumbnail/@url").text
      content = "https://www.youtube.com/embed/#{item.xpath('yt:videoId').inner_html.to_s.strip}"
      feed << {
        "title" => title,
        "description" => description,
        "content" => content,
        "original_url" => original_url,
        "type_of_content" => type_of_content,
        "image_url" => img,
        "published_date" => published
      }
      return feed
    end
  end
  end
