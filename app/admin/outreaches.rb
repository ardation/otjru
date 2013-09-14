ActiveAdmin.register Outreach do
  form do |f|                         
    f.inputs "Details" do       
      f.input :url          
      f.input :dial_code           
      f.input :sms          
      f.input :org_name   
      f.input :link_url   
      f.input :link_text               
      f.input :logo, as: :file   
      f.input :english_only  
    end                               
    f.actions                         
  end  
end
