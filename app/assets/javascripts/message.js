$(function() {
  function buildHTML(message) {
    var image = message.image ? `<img src= ${message.image}>` : "";
    var html = `<div class="chat_message">
                  <div class="chat_message__header">
                    <p class="chat_message__header__name">
                      ${message.user_name}
                    </p>
                    <p class="chat_message__header__date">
                    ${message.date}
                    </p>
                  </div>
                  <div class="chat_message__text">
                    <p>
                      ${message.body}
                    </p>
                    ${image}
                  </div>
                </div>`;
    return html;
  }

  $("#new_message").submit(function(e) {
    e.preventDefault(); // デフォルトのイベント(送信)を止める

    var formData = new FormData(this);
    var url = $(this).attr("action"); // リクエスト送信先のURLを取得

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
      .done(function(data) {
        var html = buildHTML(data);
        $(".chat_messages").append(html);
      })
      .fail(function(data) {
        alert("エラーが発生したためメッセージは送信できませんでした。");
      });
  });
});
