class Content < ActiveRecord::Base
  attr_accessible :content_type, :foreign_id, :name
  has_many :answers, dependent: :destroy

  NON_SYNCABLE = 0
  SHORT_ANSWER = 1
  CHECK_BOX = 2
  DROPDOWN = 3
  RADIO_BUTTON = 4
  FACEBOOK_AUTH = 5
  CONTACT = 6
  MULTI_ANSWER = 7
end
