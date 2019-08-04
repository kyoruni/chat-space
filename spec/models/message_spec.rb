require 'rails_helper'
RSpec.describe Message, type: :model do
  describe "#create" do
    context 'can save' do
      # 保存できる場合のテスト
      it '画像あり 文字ありの場合' do
        message = build(:message)
        expect(message).to be_valid
      end

      it '画像あり 文字なしの場合' do
        message = build(:message, body: nil)
        expect(message).to be_valid
      end

      it '画像なし 文字ありの場合' do
        message = build(:message, image: nil)
        expect(message).to be_valid
      end
    end

    context 'can not save' do
      # 保存できない場合のテスト
      it '画像なし 文字なしの場合' do
        message = build(:message, body: nil, image: nil)
        message.valid?
        expect(message.errors[:body]).to include("を入力してください")
      end

      it 'グループidなしの場合' do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      it 'ユーザーidなしの場合' do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end
  end
end