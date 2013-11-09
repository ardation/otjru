ActiveAdmin.register Outreach do
  index do
    column :org_name
    column :url
    column :dial_code, sortable: false
    column :sms, sortable: false
    column("Logo") {|o| link_to o.logo_file_name, o.logo.url}
    column("Single Locale") {|o| if o.english_only? then status_tag("Yes") else status_tag("No") end}
    column("Primary Locale") {|o| o.primary_locale.upcase}
    column("Secondary Locale") {|o| if o.english_only? then "N/A" else o.secondary_locale.upcase end}
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
      f.input :primary_locale
      f.input :secondary_locale 
      f.input :english_only, label: "Primary Locale Only"
    end       
    f.inputs "Location" do  
      f.input :lat, label: "Latitude"
      f.input :lng, label: "Longitude"
    end                               
    f.actions                         
  end  
end
