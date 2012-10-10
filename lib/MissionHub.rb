Dir[File.dirname(__FILE__) + '/Missionhub/*.rb'].each do |file|
  require file
end

module Missionhub
  extend self

  attr_accessor :client_id, :client_secret, :base_uri, :org_id

  # And we define a wrapper for the configuration block, that we'll use to set up
  # our set of options
  def config(&block)
    instance_eval(&block)
  end
end
