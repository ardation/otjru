class AddPrizeMessageToOutreaches < ActiveRecord::Migration
  def change
    add_column :outreaches, :prize_message, :string
  end
end
