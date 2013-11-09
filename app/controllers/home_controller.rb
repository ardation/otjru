class HomeController < ApplicationController
  def index
  	@outreach = Outreach.find_by_url(request.host)
  	if @outreach.nil?
  		render 'blank'
  	else
  		if I18n.locale.to_s != @outreach.primary_locale and I18n.locale.to_s != @outreach.secondary_locale or @outreach.english_only and I18n.locale.to_s != @outreach.primary_locale
  			redirect_to "/#{@outreach.primary_locale}/step1"
  		else
  			@lang = (if I18n.locale.to_s == @outreach.primary_locale then @outreach.secondary_locale else @outreach.primary_locale end).to_sym
  		end
  	end
  end
end
