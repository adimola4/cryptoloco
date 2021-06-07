# frozen_string_literal: true

class ArticleApiFetcher
    require "httparty"
  
    def initialize(article_url)
      @article_url = article_url
      @article_data = {
        "title" => "",
        "description" => "",
        "content" => "",
      }
    end
    def run


    end
end