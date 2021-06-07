class AddTrendingCurrency < ActiveRecord::Migration[6.0]
  def change
    add_column :currencies, :trending, :boolean

  end
end
