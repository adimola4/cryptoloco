class CreateCurrencies < ActiveRecord::Migration[6.0]
  def change
    create_table :currencies do |t|
      t.string :title
      t.string :code
      t.string :kind
      t.integer :rank
      t.string :market_cap_usd
      t.string :price_usd
      t.string :v24
      t.integer :p24
      t.integer :p1h
      t.string :p7d
      t.string :integer
      t.string :slug

      t.timestamps
    end
  end
end
