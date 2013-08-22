ActiveAdmin.register Content do
  index do                            
    column :id                      
    column :name                     
    column :foreign_id        
    column :content_type            
    default_actions                   
  end    

  form do |f|                         
    f.inputs "Details" do       
      f.input :name             
      f.input :foreign_id               
      f.input :content_type  
    end                               
    f.actions                         
  end                                
end                                   
