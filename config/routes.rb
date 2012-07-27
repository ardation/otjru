Otjru::Application.routes.draw do
  match '/:locale/page/step1' => 'page#step1'
  match '/:locale/page/step2' => 'page#step2'
  match '/:locale/page/step3' => 'page#step3'
  match '/:locale/page/step4' => 'page#step4'
  match '/:locale/page/step5' => 'page#step5'
  match '/:locale/page/step6' => 'page#step6'
  match '/:locale/page/step7' => 'page#step7'
  match '/:locale/page/step8' => 'page#step8'
  match '/:locale/page/kennedy' => 'page#kennedy'
  #get "page/step1"

  #get "page/step2"

  #get "page/step3"

  #get "page/step4"

  #get "page/step5"

  #get "page/step6"

  #get "page/step7"

  #get "page/step8"

  #get "page/data"

  #get "page/kennedy"

  #get "home/index"

match '/:locale/step1' => 'home#index'
match '/:locale/step2' => 'home#index'
match '/:locale/step3' => 'home#index'
match '/:locale/step4' => 'home#index'
match '/:locale/step5' => 'home#index'
match '/:locale/step6' => 'home#index'
match '/:locale/step7' => 'home#index'
match '/:locale/step8' => 'home#index'
match '/:locale/kennedy' => 'home#index'
match '/:locale' => 'home#index'
match '' => redirect("/#{I18n.locale}")

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
