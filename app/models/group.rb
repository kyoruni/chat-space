class Group < ApplicationRecord
  has_many :messages
  has_many :users, through: :members
  has_many :members
  validates :name, presence: true, uniqueness: true

  def last_message
    if messages.present?
      messages.last.body
    else
      'まだメッセージはありません。'
    end
  end
end
