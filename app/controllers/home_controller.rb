class HomeController < ApplicationController
  def index
  	@outreach = Outreach.find_by_url(request.host)
  	render 'blank' if @outreach.nil?
  end
end
