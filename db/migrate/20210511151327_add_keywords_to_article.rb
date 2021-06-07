class AddKeywordsToArticle < ActiveRecord::Migration[6.0]
  def change
    add_column :articles, :keywords, :string, array:true, default: []
  end
end
