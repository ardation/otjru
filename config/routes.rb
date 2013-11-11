Otjru::Application.routes.draw do

  root to: 'home#index'

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  get '/:locale' => 'home#index'
  get '/:locale/:page' => 'home#index'
  get '/:locale/page/:page' => 'page#home'
  post '/data' => 'data#index'
end
