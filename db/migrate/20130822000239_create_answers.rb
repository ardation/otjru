class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.integer :content_id
      t.integer :person_id
      t.text :data

      t.timestamps
    end
  end
end
