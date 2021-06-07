# frozen_string_literal: true

class Api::V1::ArticlesController < ActionController::API
    
    def show
      
        @article = Article.where(title: params[:title])
        p "=======================" ,@article
         return null if @article.length == 0
        @res = {
          'articleID': @article[0].id,
          'title': @article[0].title,
          'original_url': @article[0].original_url,
          'description': @article[0].description,
          'type': @article[0].type,
          'content': @article[0].content,
          'published_date': TimeDiff.new(@article[0].created_at).run,
          'type_of_content': @article[0].type_of_content,
          'keywords': @article[0].keywords ,
          'image_url': @article[0].image_url,

          'source': {
            'sourceID': @article[0].source.id,
            'domain': @article[0].source.Domain,
            'title': @article[0].source.title,
            'website_url': @article[0].source.website_url,
            'description': @article[0].source.description,
            'type': @article[0].source.type,
            'keyword': @article[0].source.keyword ,
            'img_url': @article[0].source.img_url,
            'articles': @article[0].source.articles,
            'category': @article[0].source.categories
          }
          
        }
        render json: @res
    end

    private

   
end
