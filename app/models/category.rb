# frozen_string_literal: true

class Category < ApplicationRecord
  has_and_belongs_to_many :sources, dependent: :destroy, class_name: 'Source'

  validates :title, presence: { base: "Title can't be blank!" }
  validates :title, :uniqueness => true
  validates :slug, presence: { base: "slug can't be blank!" }
  validates :title, length: { maximum: 100 }
  validates :slug, length: { maximum: 100 }
end
