Rails.application.routes.draw do
  devise_for :users
  # 仮置き 後で戻す
  root 'messages#index'
end
