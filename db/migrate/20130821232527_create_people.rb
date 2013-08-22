class CreatePeople < ActiveRecord::Migration
  def change
    create_table :people do |t|
      t.string :first_name
      t.string :last_name
      t.string :mobile
      t.string :email
      t.string :gender
      t.integer :foreign_id

      t.timestamps
    end
  end
end
