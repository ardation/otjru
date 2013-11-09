class AddLanguagesToOutreaches < ActiveRecord::Migration
  def change
    add_column :outreaches, :primary_locale, :string
    add_column :outreaches, :secondary_locale, :string
  end
end
