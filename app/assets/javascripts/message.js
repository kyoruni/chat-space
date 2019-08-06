$(function() {
  $("#new_message").submit(function(e) {
    e.preventDefault(); // デフォルトのイベント(送信)を止める
    var formData = new FormData(this);
  });
});
