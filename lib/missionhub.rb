require_relative 'Missionhub/Person/Address'
require_relative 'Missionhub/API'
require_relative 'Missionhub/Person'

module Missionhub
  extend self

  attr_accessor :client_id, :client_secret, :base_uri, :org_id

  base_uri = 'http://www.missionhub.com/'
  client_id = 6
  client_secret = '05fbcedcf2b2ea3958b359b51796b14b1c04c19a'
  org_id = 6775

  def config(&block)
    instance_eval(&block)
  end
end
