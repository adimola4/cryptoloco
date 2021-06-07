class AddSourceRefToArticles < ActiveRecord::Migration[6.0]
  def change
    add_reference :articles, :source, null: false, foreign_key: true
    # add_column :articles, :content, :text
  end
end
