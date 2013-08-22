ActiveAdmin.register Outreach do
  form do |f|                         
    f.inputs "Details" do       
      f.input :url             
      f.input :mhubid               
      f.input :dial_code           
      f.input :sms          
      f.input :org_name          
      f.input :prize_message     
      f.input :prize_message_long          
      f.input :logo, as: :file
    end                               
    f.actions                         
  end  
end
