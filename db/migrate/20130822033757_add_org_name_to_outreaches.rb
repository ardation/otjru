class AddOrgNameToOutreaches < ActiveRecord::Migration
  def change
    add_column :outreaches, :org_name, :string
  end
end
