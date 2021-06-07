# frozen_string_literal: true

class Currency < ApplicationRecord
  has_and_belongs_to_many :sources
  has_many :links

  validates :title, presence: { base: "Title can't be blank!" }
  validates :title, :uniqueness => true
  validates :code, presence: { base: "Code can't be blank!" }
  validates :code, :uniqueness => true
  validates :code, :uniqueness => true
  validates :title, length: { maximum: 255 }

  scope :sort_by_rank, ->(column = :rank) { order(column => :asc) }



  def self.getCurrencies

  end

  
end
