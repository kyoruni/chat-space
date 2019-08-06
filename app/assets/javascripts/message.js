$(function() {
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
    });
  });
});
