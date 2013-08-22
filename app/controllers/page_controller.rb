class PageController < ApplicationController
  layout "page"
  def home
    if params[:page] == "step1"
      @outreach = Outreach.find_by_url(request.host)
    end
    render params[:page]
  end
end
