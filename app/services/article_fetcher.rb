# frozen_string_literal: true

class ArticleFetcher
  require "httparty"

  def initialize(article_url)
    @article_url = article_url
    @article_data = {
      "title" => "",
      "description" => "",
      "content" => "",
      "image_url" => "",
    }
  end

  def run
    return if @article_url == ""

    @response = HTTParty.get(@article_url, follow_redirects: false)
    # puts  @response.message, @response.headers.inspect
    # r = 
    
    
    # p @response.headers["location"]
    if @response.message == "Moved Permanently"
      @response = HTTParty.get(@response.headers["location"], follow_redirects: false)
    end
  #  p @response.to_s
    @doc = Nokogiri::HTML(@response.to_s)
    
    clear_doc
    imgs = @doc.search("img")
    imgparents = []
    imgs.each do |img|
      imgparents.push(img.parent)
    end
    @doc.search("img").remove
    @doc.search("ul").remove
    @doc.search("picture").remove
    meta = @doc.search("meta").remove
    get_data_from_meta(meta)
    @a_tags = @doc.search("a")

    # puts @a_tags
    # @a_tags.each do |a|
    #   puts a.attributes["href"], a.text
    #   puts "parent", a.parent
    # end
    i = 0
    str = ""

    pass = false
    @doc.xpath("//text()[1]").each do |t|
      next if pass == true

      t.content = t.content.lstrip
      if t.to_s != "" && t.to_s.split.size > 1 && notImage(t.to_s)
        

        temp_str = t.to_s.tr("\n", "\n").tr("\r", " ").tr("\t", " ").to_s
        next if @article_data["title"] != "" && temp_str.include?(@article_data["title"])
        next if is_site_instructions?(temp_str)
        next if temp_str.end_with?("...")
        next if str.end_with?(temp_str)
        a = is_a_tag_invalid?(t)
        if a == true
         next if t.parent.name != "p"
        else
          temp_str = a
          
        end

        # puts temp_str, single_word?(temp_str)

        if temp_str.end_with?(".", ". ")
          # p "ddddddd"
          # p temp_str
          # str += " "+t.to_s+t.parent.next.to_s.strip
          str += temp_str + " "
        else # capitalized?(temp_str) == false
          str_hidden = t.parent.next.to_s.strip.gsub(%r{</?[^>]*>}, "")
          str += if str_hidden.strip.end_with?(".")
                   " " + temp_str + " " + str_hidden + " "
                 else
                   if str_hidden.start_with?("\n")
                     " " + temp_str + " "
                   else
                     " " + temp_str + " " + str_hidden + " "
                            end
                 end
            # p temp_str
          end
        #  str += t.to_s.gsub("\n", "\n").gsub("\r", " ").gsub("\t", " ")
        i += 1

      else
        # puts "else", temp_str, single_word?(temp_str)
        if t.to_s != " " && t.to_s.split.size == 1 && t.parent.next.to_s.strip != ""
          if @article_type == "FOX" || @article_type == "CNN"

            str += " " + t.to_s + t.parent.next.to_s.strip
           end
        end
     end
    end
    @doc.xpath("//text()[last()]").each do |t|
      t.content = t.content.rstrip
    end
    @article_data["content"] = str
    @article_data
    # puts str
    # author_name
    # full_html_content
  end

  def clear_doc
    @doc.search("script").remove
    @doc.search("noscript").remove
    @doc.search("header").remove
    @doc.search("footer").remove
    @doc.search("iframe").remove
    @doc.search("figcaption").remove
    @doc.search("nav").remove
    @doc.search("link").remove
    @doc.search("style").remove
    @doc.search("h1").remove
    @doc.search("h2").remove
    @doc.search("h3").remove
    @doc.search("h4").remove
    @doc.search("h5").remove
    @doc.search("h6").remove
  end
  def is_a_tag_invalid?(str)
    
    @a_tags.each do |a|
      if str.text == a.text && a.parent.name == "p"
        # p "text", a.text
        # p a.parent.text
        return a.parent.text
      end
        
    end
    return true
  end

  def get_data_from_meta(meta)
    meta.css("meta").each do |item|
      if @article_data["title"] == "" && (item.to_s["twitter:title"] == "twitter:title" || item.to_s["og:title"] == "og:title")
        @article_data["title"] = item["content"]
      end
      if @article_data["description"] == "" && (item.to_s["twitter:description"] == "twitter:description" || item.to_s["og:description"] == "og:description")
        @article_data["description"] = item["content"]
      end
      if (@article_data["image_url"] == "" || item['content'].to_s.start_with?("http") )  && (item.to_s['twitter:image'] == "twitter:image" || item.to_s['og:image'] == "og:image")
        # if image_exists?(item['content'])  
        
        return if @article_data["image_url"] != ""
        
        @article_data["image_url"] = item['content']
        puts "article data", @article_data["image_url"]
        # end
      end

    end
  end

  def image_exists?(url)
    begin
      response = HTTParty.get(url)
    rescue Exception => e
      return nil
    end
    response.headers["content-type"].start_with? "image"
  end

  def notImage(str)
    !(str.include?("image") || str.include?("Image") || str.include?("Photo"))
  end

  def capitalized?(str)
    str.match?(/\A[A-Z]/)
  end

  def in_a_tag?(str)
    @a_tags.each do |a|
      return a.to_s.include?(str)
    end
  end

  def is_site_instructions?(str)
    str = str.to_s.strip.delete("\n")
    common_words = [
      "Advertisement",
      "Subscribed",
      "Subscribe",
      "close",
      "Video",
      "You've successfully subscribed to this newsletter!",
      "Read More",
      "read more.",
      "... read more",
      "Continue Reading Below",
      "Continue reading the main story",
      "Submit a Press Release",
      "Reading Time:",
      "seconds ago",
      "Price & MarketCap Data from"
    ]

    common_words.include?(str)
  end
  def single_word?(str)
    return true if str == "" || str.nil?
    !str.strip.include? " "
  end
end
