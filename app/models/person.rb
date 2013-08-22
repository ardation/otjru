class Person < ActiveRecord::Base
  has_many :answers, dependent: :destroy
  accepts_nested_attributes_for :answers
  attr_accessible :email, :first_name, :foreign_id, :gender, :last_name, :mobile, :outreach, :answers_attributes
  after_create :sync
  validates_uniqueness_of :mobile, :scope => :outreach

  def sync
    MissionHubCrm.sync(self)
  end

  def mobile=(number)
    unless number.blank? and number.length < 3
      number = number.gsub(/[^0-9]/i, '')
      number = number[1..-1] if number[0] == "0"
      super(number.to_i)
    end
  end
end
