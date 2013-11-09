ActiveAdmin.register Outreach do

  index do
    column :org_name
    column :url
    column :dial_code, sortable: false
    column :sms, sortable: false
    column("Logo") {|o| link_to o.logo_file_name, o.logo.url}
    column("Single Locale") {|o| if o.english_only? then status_tag("Yes") else status_tag("No") end}
    column("Primary Locale") {|o| o.primary_locale.upcase unless o.primary_locale.nil?}
    column("Secondary Locale") {|o| if o.english_only? then "N/A" else (o.secondary_locale.upcase unless o.secondary_locale.nil?) end}
    default_actions
  end

  form do |f|                         
    f.inputs "Details" do       
      f.input :url          
      f.input :dial_code           
      f.input :sms          
      f.input :org_name   
      f.input :link_url   
      f.input :link_text               
      f.input :logo, as: :file
    end
    f.inputs "Languages" do  
      f.input :primary_locale, as: :select, collection: Dir.glob("#{Rails.root}/config/locales/*").map{ |o| o.gsub("#{Rails.root}/config/locales/", "").gsub(".yml", "") }
      f.input :secondary_locale, as: :select, collection: Dir.glob("#{Rails.root}/config/locales/*").map{ |o| o.gsub("#{Rails.root}/config/locales/", "").gsub(".yml", "") }
      f.input :english_only, label: "Primary Locale Only"
    end       
    f.inputs "Location" do  
      f.input :lat, label: "Latitude"
      f.input :lng, label: "Longitude"
    end                               
    f.actions                         
  end

  action_item :only => :index do
    link_to 'Pull Translations', action: :pull_translations
  end

  collection_action :pull_translations do
    heroku = Heroku::API.new
    heroku.post_ps('otjru', 'bundle exec localeapp pull')
    flash[:notice] = "Successfully pulled translations from localeapp"
    redirect_to :action => :index
  end
end
