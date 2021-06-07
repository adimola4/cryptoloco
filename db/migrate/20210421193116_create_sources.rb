class CreateSources < ActiveRecord::Migration[6.0]
  def change
    create_table :sources do |t|
      t.string :Domain
      t.string :title
      t.string :website_url
      t.text :description
      t.string :type
      t.string :keyword, array:true, default: []
      t.string :type_of_content
      t.string :img_url

      t.timestamps
    end

  end
end
