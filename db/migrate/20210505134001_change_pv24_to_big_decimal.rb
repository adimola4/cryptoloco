class ChangePv24ToBigDecimal < ActiveRecord::Migration[6.0]
  def change
    change_column :currencies, :v24, "numeric USING CAST(v24 AS numeric)"
    change_column :currencies, :v24, :decimal, precision: 9, scale: 2
    change_column :currencies, :p24, "numeric USING CAST(p24 AS numeric)"
    change_column :currencies, :p24, :decimal, precision: 9, scale: 2
    change_column :currencies, :p1h, "numeric USING CAST(p1h AS numeric)"
    change_column :currencies, :p1h, :decimal, precision: 9, scale: 2
    change_column :currencies, :p7d, "numeric USING CAST(p7d AS numeric)"
    change_column :currencies, :p7d, :decimal, precision: 9, scale: 2
  end
end
