class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  # 画像がないとき、本文は必須入力
  validates :body, presence: true, unless: :image?
end
