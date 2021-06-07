class CreateArticles < ActiveRecord::Migration[6.0]
  def change
    create_table :articles do |t|
      # t.references :source, index: true, foreign_key: true

      t.string :title
      t.string :original_url
      t.string :description
      t.string :type

      

      t.timestamps
    end
  end
end
