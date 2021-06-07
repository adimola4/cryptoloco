class AddTypeOfContentToArticle < ActiveRecord::Migration[6.0]
  def change
    add_column :articles, :type_of_content, :string
    remove_column :sources, :type_of_content

  end
end
