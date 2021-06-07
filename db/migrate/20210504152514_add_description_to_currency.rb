class AddDescriptionToCurrency < ActiveRecord::Migration[6.0]
  def change
    add_column :currencies, :description, :string
    rename_column :currencies, :slug, :img_url
  end
end
