class HomeController < ApplicationController
  def index
    @org_name = Outreach.find_by_url(request.host).org_name
  end
end
