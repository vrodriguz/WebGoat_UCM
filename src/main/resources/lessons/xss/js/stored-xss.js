$(document).ready(function () {
    $("#postComment").on("click", function () {
        var commentInput = $("#commentInput").val();
        $.ajax({
            type: 'POST',
            url: 'CrossSiteScriptingStored/stored-xss',
            data: JSON.stringify({text: commentInput}),
            contentType: "application/json",
            dataType: 'json'
        }).then(
            function () {
                getChallenges();
                $("#commentInput").val('');
            }
        )
    })

    var html = '<li class="comment">' +
        '<div class="pull-left">' +
        '<img class="avatar" src="images/avatar1.png" alt="avatar"/>' +
        '</div>' +
        '<div class="comment-body">' +
        '<div class="comment-heading">' +
        '<h4 class="user">USER</h4>' +
        '<h5 class="time">DATETIME</h5>' +
        '</div>' +
        '<p>COMMENT</p>' +
        '</div>' +
        '</li>';

    getChallenges();

    function getChallenges() {
        $("#list").empty();
        $.get('CrossSiteScriptingStored/stored-xss', function (result, status) {
            for (var i = 0; i < result.length; i++) {
                var $comment = $('<li class="comment"></li>');
                var $pullLeft = $('<div class="pull-left"></div>');
                $pullLeft.append('<img class="avatar" src="images/avatar1.png" alt="avatar"/>');
                var $commentBody = $('<div class="comment-body"></div>');
                var $commentHeading = $('<div class="comment-heading"></div>');
                var $user = $('<h4 class="user"></h4>').text(result[i].user);
                var $time = $('<h5 class="time"></h5>').text(result[i].dateTime);
                $commentHeading.append($user).append($time);
                var $text = $('<p></p>').text(result[i].text);
                $commentBody.append($commentHeading).append($text);
                $comment.append($pullLeft).append($commentBody);
                $("#list").append($comment);
            }

        });
    }
})
