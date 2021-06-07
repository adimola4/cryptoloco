class CreateLinks < ActiveRecord::Migration[6.0]
  def change
    create_table :links do |t|
      t.string :kind
      t.string :url
      t.references :currency, null: false, foreign_key: true

      t.timestamps
    end
  end
end
