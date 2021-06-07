class CreateTwitterAccounts < ActiveRecord::Migration[6.0]
  def change
    create_table :twitter_accounts do |t|
      t.string :name

      t.timestamps
    end
  end
end
