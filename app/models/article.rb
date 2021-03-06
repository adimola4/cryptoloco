# frozen_string_literal: true

class Article < ApplicationRecord
  require 'net/http'

  belongs_to :source

  validates :title, presence: { base: "Title can't be blank!" }
  validates :original_url, presence: { base: "Url can't be blank!" }
  validates :title, length: { maximum: 255 }
  validates :original_url, length: { maximum: 255 }
  validates :source_id, presence: true
  validates :original_url, uniqueness: true
  validates :title, uniqueness: true


  def get_full_html_content
    ArticleFetcher.new(self).run if full_html_content.blank? || full_html_content == "moved here"
  end
end
