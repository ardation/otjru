class HomeController < ApplicationController
  def index
  	@outreach = Outreach.find_by_url(request.host)
  	if @outreach.nil?
  		render 'blank'
  	else
  		if params[:locale] != @outreach.primary_locale and params[:locale] != @outreach.secondary_locale or @outreach.english_only and params[:locale] != @outreach.primary_locale
  			redirect_to "/#{@outreach.primary_locale}/step1"
  		else
  			@lang = (if params[:locale] == @outreach.primary_locale then @outreach.primary_locale else @outreach.secondary_locale end).to_sym
  		end
  	end
  end
end
