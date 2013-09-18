class Outreach < ActiveRecord::Base
  validates_presence_of :url
  attr_accessible :url, :dial_code, :sms, :org_name, :english_only, :logo, :link_url, :link_text
  has_attached_file :logo
  validates_attachment :logo, :presence => true,
  :content_type => { :content_type => /image/ },
  :size => { :in => 0..50.kilobytes }
end
