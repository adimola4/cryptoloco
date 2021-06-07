class RemoveKindFromCurrency < ActiveRecord::Migration[6.0]
  def change
    remove_column :currencies, :kind, :string
     add_column :currencies, :api_id, :string
  end
end
