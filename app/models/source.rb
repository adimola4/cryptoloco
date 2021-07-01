# frozen_string_literal: true

class Source < ApplicationRecord
  has_many :articles
  has_and_belongs_to_many :categories, dependent: :destroy
  has_and_belongs_to_many :currencies

  validates :title, presence: { base: "Title can't be blank!" }
  validates :Domain, presence: { base: "Domain can't be blank!" }
  validates :website_url, presence: { base: "Website url can't be blank!" }

  validates :title, length: { maximum: 255 }
  validates :Domain, length: { maximum: 255 }
  validates :website_url, length: { maximum: 255 }
  validates :Domain, uniqueness: true
  validates :website_url, uniqueness: true

  after_create :source_fetch

  def source_fetch
    Source::FetchWorker.perform_async(id)
  end

  def self.get_feed(source)
    return nil if source.nil?

    @articles = SourceFetcher.new(source).run
    @articles.each do |article|
      found_article = Article.where("source_id = ? and original_url = ? and published_date = ?", source.id, article["original_url"], article["published_date"].to_time)
      # puts "article", Article.where("source_id = ? and original_url = ? and published_date = ?", source.id, article["original_url"], article["published_date"].to_time)[0].nil?
      if found_article.empty? || found_article.nil?

        new_article = Article.new(title: article["title"],
                                  published_date: article["published_date"].to_time,
                                  original_url: article["original_url"], description: article["description"],
                                  content: article["content"],
                                  type_of_content: article["type_of_content"],
                                  keywords: article["keywords"],
                                  image_url: article["image_url"],
                                  source_id: source.id)
        if new_article.valid?

          new_article.save!
          source.articles << new_article
        end
      else
        if found_article[0].type_of_content == "Article"
          # Article::FetchWorker.perform_async(found_article[0].id)
        end
      end
    end
  end

  def self.get_feed_from_api(source)
    return nil if source.nil?

    @articles = ApiCaller.new(source.website_url)
    @articles.each do |article|
      found_article = Article.where("source_id = ? and original_url = ? and published_date = ?", source.id, article["original_url"], article["published_date"].to_time)
    end
  end
end
