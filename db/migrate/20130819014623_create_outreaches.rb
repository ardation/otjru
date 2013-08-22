class CreateOutreaches < ActiveRecord::Migration
  def change
    create_table :outreaches do |t|
      t.string :url
      t.integer :mhubid

      t.timestamps
    end
  end
end
