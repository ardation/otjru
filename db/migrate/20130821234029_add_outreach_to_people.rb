class AddOutreachToPeople < ActiveRecord::Migration
  def change
    add_column :people, :outreach, :string

    add_index :people, :outreach
  end
end
