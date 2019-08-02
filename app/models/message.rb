class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  # 画像がないとき、本文は必須入力
  validates :body, presence: true, unless: :image?

  # 第一引数 画像用に作ったカラム名、第二引数 carrierwaveの設定ファイルのクラス
  mount_uploader :image, ImageUploader
end
