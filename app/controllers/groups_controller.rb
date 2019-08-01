class GroupsController < ApplicationController
  def new
    @group = Group.new
    @group.users << current_user # ログイン中のユーザーをグループのユーザーに追加
  end

  def create
  end

  def edit
  end

  def update
  end
end
