# frozen_string_literal: true

class Api::V1::FeedController < ActionController::API
    def index
        @articles = Article.order("created_at DESC")

        @res = []
        @articles.each do |article|
            p "aaaa", article.keywords.to_a[1..3]
            p "dddd", article.keywords
          @res << { 
            'articleID': article.id,
            'title': article.title,
            'original_url': article.original_url,
            'description': article.description,
            'type': article.type,
            'content': article.content ,
            'published_date': TimeDiff.new(article.created_at).run,
            'type_of_content': article.type_of_content,
            'keywords': article.keywords.to_a[1..3] ,
            'image_url': article.image_url,
            'source': {
                'sourceID': article.source.id,
                'domain': article.source.Domain,
                'title': article.source.title,
                'website_url': article.source.website_url,
                'type': article.source.type,
                'keyword': article.source.keyword ,
                'img_url': article.source.img_url,
                'category': article.source.categories
            } 
                      }
        end
        # puts "@res ",@res
        render json: @res
    end

end
