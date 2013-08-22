class AddDialCodeToOutreaches < ActiveRecord::Migration
  def change
    add_column :outreaches, :dial_code, :string
    add_column :outreaches, :sms, :string
  end
end
