Rails.application.routes.draw do
  devise_for :users
  resources  :users,  only: [:edit, :update]
  resources  :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end

  # 仮置き 後で戻す
  root 'messages#index'
end
