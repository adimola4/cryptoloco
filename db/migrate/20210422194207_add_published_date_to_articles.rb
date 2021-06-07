class AddPublishedDateToArticles < ActiveRecord::Migration[6.0]
  def change
    add_column :articles, :published_date, :date
  end
end
