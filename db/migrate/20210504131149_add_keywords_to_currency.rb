class AddKeywordsToCurrency < ActiveRecord::Migration[6.0]
  def change
    add_column :currencies, :keywords, :string, array:true, default: []
  end
end
