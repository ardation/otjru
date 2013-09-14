class AddEnglishOnlyToOutreaches < ActiveRecord::Migration
  def change
    add_column :outreaches, :english_only, :boolean
    remove_column :outreaches, :prize_message_long
    remove_column :outreaches, :prize_message
  end
end
