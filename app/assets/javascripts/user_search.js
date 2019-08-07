$(function() {
  var userList = $("#user-search-result"); // 検索結果のユーザーリスト
  var memberList = $("#chat-group-users"); // チャットメンバーのリスト

  // 検索結果のユーザーリストを作成
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">
                    ${user.name}
                  </p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add"
                  data-user-id="${user.id}" data-user-name="${user.name}">
                    追加
                  </div>
                </div>`;
    $(userList).append(html);
  }

  function appendErrUser() {
    var html = `<div id="chat-group-user" class="clearfix">
                  <p class="chat-group-user">
                    一致するユーザーが見つかりません
                  </p>
                </div>`;
    $(userList).append(html);
  }

  // チャットメンバーのリストを作成
  function addMember(user) {
    var user_id = user.attr("data-user-id");
    var user_name = user.attr("data-user-name");
    var html = `<div class='chat-group-user clearfix'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                    <p class='chat-group-user__name'>
                      ${user_name}
                    </p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>
                    削除
                  </div>
              </div>`;
    $(memberList).append(html);
  }

  $("#user-search-field").keyup(function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
      .done(function(users) {
        $(userList).empty(); // 検索前にリストを初期化
        if (users.length !== 0 && input.length !== 0) {
          // 検索結果あり＆入力あり
          users.forEach(function(user) {
            appendUser(user);
          });
        } else {
          appendErrUser();
        }
      })
      .fail(function() {
        appendErrUser();
        alert("ユーザー検索に失敗しました");
      });
  });

  // 追加ボタンを押したユーザーを、メンバーリストに追加＆検索結果リストから削除
  $(userList).on("click", ".user-search-add", function() {
    addMember($(this));
    $(this)
      .parent(".chat-group-user")
      .remove();
  });

  $(memberList).on("click", ".user-search-remove", function() {
    $(this)
      .parent(".chat-group-user")
      .remove();
  });
});
