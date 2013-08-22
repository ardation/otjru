class AddAttachmentLogoToOutreaches < ActiveRecord::Migration
  def self.up
    change_table :outreaches do |t|
      t.attachment :logo
    end
  end

  def self.down
    drop_attached_file :outreaches, :logo
  end
end
