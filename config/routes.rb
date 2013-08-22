Otjru::Application.routes.draw do

  root to: redirect("/en")
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  match '/data' => 'data#index'
  match '/:locale/page/:page' => 'page#home'
  match '/:locale/:page' => 'home#index'
  match '/:locale' => redirect("/%{locale}/step1")


end
