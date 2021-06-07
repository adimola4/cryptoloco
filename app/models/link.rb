# frozen_string_literal: true

class Link < ApplicationRecord
  belongs_to :currency
  validates :kind, presence: { base: "Kind can't be blank!" }
  validates :url, presence: { base: "Url can't be blank!" }
  validates :kind, length: { maximum: 50 }
  validates :url, length: { maximum: 255 }
end
