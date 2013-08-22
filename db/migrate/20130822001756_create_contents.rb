class CreateContents < ActiveRecord::Migration
  def change
    create_table :contents do |t|
      t.integer :content_type
      t.integer :foreign_id
      t.string :name

      t.timestamps
    end
  end
end
