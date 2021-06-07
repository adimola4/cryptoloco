class SourcesCategories < ActiveRecord::Migration[6.0]
  def change
    create_join_table :sources, :categories do |t|
      t.index [:source_id, :category_id]
      t.index [:category_id, :source_id]
    end
    create_join_table :sources, :currencies do |t|
      t.index [:source_id, :currency_id]
      t.index [:currency_id, :source_id]
    end
  end
end
