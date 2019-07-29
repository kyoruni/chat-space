Rails.application.routes.draw do
  # 仮置き 後で戻す
  root 'messages#index'
  resources :messages, only: [:index]
end
