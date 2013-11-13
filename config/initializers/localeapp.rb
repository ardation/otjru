require 'localeapp/rails'

Localeapp.configure do |config|
  config.api_key = ENV['LOCALE_API_KEY']
end

Localeapp::CLI::Pull.new.execute if Rails.env.production?