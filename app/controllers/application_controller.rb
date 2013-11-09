class ApplicationController < ActionController::Base
	before_filter :set_locale

	private
	def set_locale
		I18n.locale = params[:locale] if params[:locale]
	end
	protect_from_forgery
end