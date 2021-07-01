# frozen_string_literal: true

class Api::V1::CategoriesController < ActionController::API
  def index
    @categories = Category.all
    render json: @categories
  end
end
