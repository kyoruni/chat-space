$(document).on("turbolinks:load", function() {
  $(function() {
    var memberUser = "";
    var memberUserList = []; // グループに追加されているユーザーidの配列
    var userList = $("#user-search-result"); // 検索結果のユーザーリスト
    var memberList = $("#chat-group-users"); // チャットメンバーのリスト

    // 最初に、グループに追加されているユーザーidの配列を作成する
    memberList.find('input[name="group[user_ids][]"]').each(function(index) {
      memberUser = Number($(this).val()); // 文字列で入っているので、数値にしておく
      memberUserList.push(memberUser); // ユーザーid配列に追加
    });

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

    function addMember(user) {
      var user_id = user.data("user-id");
      var user_name = user.data("user-name");
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

      // グループに追加されているユーザーidの配列にも追加する
      memberUserList.push(user_id);
    }

    function delMember(deleteUserId) {
      // グループに追加されているユーザーidの配列を、削除対象のユーザーidで検索
      var idx = memberUserList.indexOf(Number(deleteUserId));

      // 削除対象のユーザーidから削除
      if (idx >= 0) {
        memberUserList.splice(idx, 1);
      }
    }

    $("#user-search-field").keyup(function() {
      var input = $("#user-search-field").val();
      $.ajax({
        type: "GET",
        url: "/users",
        data: { keyword: input, user_ids: memberUserList },
        dataType: "json"
      })
        .done(function(users) {
          $(userList).empty(); // 検索前にリストを初期化
          if (users.length !== 0 && input.length !== 0) {
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

    $(userList).on("click", ".user-search-add", function() {
      addMember($(this));
      $(this)
        .parent(".chat-group-user")
        .remove();
    });

    $(memberList).on("click", ".user-search-remove", function() {
      // メンバーから削除されるユーザーのidを取得
      var deleteUserId = $(this)
        .siblings('input[name="group[user_ids][]"]')
        .val();
      delMember(deleteUserId);

      $(this)
        .parent(".chat-group-user")
        .remove();
    });
  });
});
