class AddPrizeMessageLongToOutreaches < ActiveRecord::Migration
  def change
    add_column :outreaches, :prize_message_long, :string
  end
end
