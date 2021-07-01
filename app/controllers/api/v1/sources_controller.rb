# frozen_string_literal: true

class Api::V1::SourcesController < ActionController::API
  require_relative("../../../services/source_initializer")

  def index
    @sources = Source.all

    @res = []
    @sources.each do |source|
      @res << {
        'sourceID': source.id,
        'domain': source.Domain,
        'title': source.title,
        'website_url': source.website_url,
        'description': source.description,
        'type': source.type,
        'keyword': source.keyword,
        'img_url': source.img_url,
        'articles': source.articles,
        'category': source.categories
      }
    end
    puts "@res ", @res
    render json: @res
  end

  def show
    @source = Source.find(params[:id])
    render json: @source
  end

  def create
    if source_params[:website_url].nil?
      render json: [{ "msg": "Url is required!" }], status: :not_acceptable
      return
    end

    @found_source = Source.where(website_url: source_params[:website_url])

    if @found_source.empty?
      @source = Source.new(source_params)
      # !!! add generated url in the first user response.
      response = SourceInitializer.new(@source).run
      if response.nil?
        render json: [{ "msg": "The url is not avalid source" }], status: :not_acceptable
        return
      end
      if @source.save
        render json: @source, status: :created
      else
        render json: [{ "msg": @source.errors }], status: :unprocessable_entity
      end
    else
      render json: [{ "msg": "exsits source" }, @found_source[0]]
      return
    end
  end

  def update
    @source = Source.find(params[:id])
    if @source.update(source_params)
      render json: @source
    else
      render json: @source.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @source = Source.find(params[:id])
    @source.destroy
  end

  private

  def source_params
    params
      .require(:source)
      .permit(:website_url, :title, :description, :img_url, :Domain, :type, :type_of_content)
  end
end
