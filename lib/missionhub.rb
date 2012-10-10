require_relative 'missionhub/person/address.rb'
require_relative 'missionhub/api.rb'
require_relative 'missionhub/person.rb'

module Missionhub
  extend self

  def base_uri
    'http://www.missionhub.com/'
  end
  def client_id
    6
  end
  def client_secret
    '05fbcedcf2b2ea3958b359b51796b14b1c04c19a'
  end
  def org_id
    6775
  end
end
