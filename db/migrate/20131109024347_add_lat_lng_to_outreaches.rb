class AddLatLngToOutreaches < ActiveRecord::Migration
  def change
    add_column :outreaches, :lat, :string
    add_column :outreaches, :lng, :string
  end
end
