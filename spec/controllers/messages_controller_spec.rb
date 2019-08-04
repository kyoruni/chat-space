require 'rails_helper'

describe MessagesController do
  # テスト中何度も使うインスタンスを定義
  let(:group) { create(:group) }
  let(:user)  { create(:user) }

  describe '#index' do
    context 'ログインしている場合' do
      # 毎回やる処理はbeforeにまとめておく
      before do
        login user
        get :index, params: { group_id: group.id }
      end

      it '@messageがあるか' do
        expect(assigns(:message)).to be_a_new(Message)
      end

      it '@groupがあるか' do 
        expect(assigns(:group)).to eq group
      end

      it '正しいビューが表示されるか' do
        expect(response).to render_template :index
      end
    end

    context 'ログインしていない場合' do
      before do
        get :index, params: { group_id: group.id }
      end

      it '正しくリダイレクトしているか' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe '#create' do
    # attributes_for オブジェクト作らないで、ハッシュの状態にしておく
    let(:params) { { group_id: group.id,
                     user_id: user.id,
                     message: attributes_for(:message) } }
    context 'ログインしているとき' do
      before do
        login user
      end
      context 'メッセージの登録に成功した場合' do
        # expectの記述が長くなってしまうので、別出しにする
        subject {
          post :create,
          params: params
        }

        it 'データの登録ができたかどうか' do
          # change(Message, :count).by(1) メッセージモデルのデータが1件増えたかどうか
          expect{ subject }.to change(Message, :count).by(1)
        end

        it '登録後リダイレクトできたかどうか' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context 'メッセージの登録に失敗した場合' do
        let(:invalid_params) { { group_id: group.id,
                                 user_id: user.id,
                                 message: attributes_for(:message, body: nil, image: nil) } }
        subject {
          post :create,
          params: invalid_params
        }

        it 'データの登録ができていないかどうか' do
          expect{ subject }.not_to change(Message, :count)
        end

        it '登録後リダイレクトできたかどうか' do
          subject
          expect(response).to render_template :index
        end
      end
    end

    context 'ログインしていないとき' do
      it 'ログインページにリダイレクトされたかどうか' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end