class AddLinkToOutreaches < ActiveRecord::Migration
  def change
    add_column :outreaches, :link_url, :string
    add_column :outreaches, :link_text, :string
  end
end
