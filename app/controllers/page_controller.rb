class PageController < ApplicationController
  layout "page"
  def home
    if params[:page] == "step1" || params[:page] == "step8"
      @outreach = Outreach.find_by_url(request.host)
    end
    render params[:page]
  end
end
