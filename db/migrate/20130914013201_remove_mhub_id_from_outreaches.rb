class RemoveMhubIdFromOutreaches < ActiveRecord::Migration
 	def change
    	remove_column :outreaches, :mhubid
	end
end
