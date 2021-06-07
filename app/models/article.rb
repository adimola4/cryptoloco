# frozen_string_literal: true

class Article < ApplicationRecord
  require 'net/http'
  
  belongs_to :source

  validates :title, presence: { base: "Title can't be blank!" }
  validates :original_url, presence: { base: "Url can't be blank!" }
  validates :title, length: { maximum: 255 }
  validates :original_url, length: { maximum: 255 }
  validates :source_id, presence: true



  def get_full_html_content()
    if full_html_content.blank? || full_html_content == "moved here"
      ArticleFetcher.new(self).run
    else
      p full_html_content
    end
  end

end
