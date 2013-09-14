class Outreach < ActiveRecord::Base
  validates_presence_of :url, :mhubid
  attr_accessible :mhubid, :url, :dial_code, :sms, :org_name, :english_only, :logo
  has_attached_file :logo
  validates_attachment :logo, :presence => true,
  :content_type => { :content_type => /image/ },
  :size => { :in => 0..50.kilobytes }
end
