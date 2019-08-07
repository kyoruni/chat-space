$(function() {
  var userList = $("#user-search-result");

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
      });
  });
});
