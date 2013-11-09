class Outreach < ActiveRecord::Base
  validates_presence_of :url
  attr_accessible :url, :dial_code, :sms, :org_name, :english_only, :logo, :link_url, :link_text, :primary_locale, :secondary_locale, :lat, :lng
  has_attached_file :logo
  validates_attachment :logo, :presence => true,
  :content_type => { :content_type => /image/ },
  :size => { :in => 0..50.kilobytes }

  def url=(target_url)
    if self.url != target_url
    	heroku = Heroku::API.new
      begin
        heroku.delete_domain 'otjru', self.url
      rescue
        #ignore
      end
      begin
        heroku.post_domain 'otjru', target_url
        super target_url
      rescue
        flash[:notice] = "Domain Already Exists"
      end
    end
  end
end
