Otjru::Application.routes.draw do

  match "/application.manifest" => Rails::Offline
  
  constraints(:host => /www.kirovograd.onthejourney.org.ua/) do
    match "/*path" => redirect {|params, req| "http://kirovohrad.onthejourney.org.ua/#{params[:path]}"}
  end

  root to: redirect("/en")
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  match '/data' => 'data#index'
  match '/:locale/page/:page' => 'page#home'
  match '/:locale/:page' => 'home#index'
  match '/:locale' => redirect("/%{locale}/step1")


end
