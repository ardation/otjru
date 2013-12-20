class Outreach < ActiveRecord::Base
  validates_presence_of :url
  attr_accessible :url, :dial_code, :sms, :org_name, :english_only, :logo, :link_url, :link_text, :primary_locale, :secondary_locale, :lat, :lng
  has_attached_file :logo
  validates_attachment :logo, :presence => true,
  :content_type => { :content_type => /image/ },
  :size => { :in => 0..50.kilobytes }

  after_save :update_url

  private

  def update_url
    if self.url_changed?
      heroku = Heroku::API.new
      unless self.url_was.blank?
        begin
          heroku.delete_domain 'otjru', self.url_was
        rescue
          #ignore
        end

        begin
          heroku.post_domain 'otjru', self.url
        rescue
          raise "Domain Already Exists"
        end
      end
    end
  end
end
