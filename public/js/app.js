const renderUsers = function() {
    $.get('/api/user').then(function(users) {
        users.forEach(function(user) {
            $('.list').append(`<option value='${user._id}'>${user.username}</option`);
        });
    });
}

renderUsers();

const renderKudos = function() {
    $.get('/api/kudo').then(function(kudos) {
        kudos.forEach(function(kudo) {
            $('#kudoList').append(`
            <div class="col-12 col-lg-6 mt-1 kudo">
                <h4 class="border-bottom border-dark">${kudo.title}</h4>
                <h6 class="border-bottom border-dark">To: ${kudo.toUser.username}<br>From: ${kudo.fromUser.username}</h6>
                <p>${kudo.body}</p>
            </div>
            `);
        });
    });
};

renderKudos();

const createKudo = function(e) {
    e.preventDefault();
    const toId = $('#kudoTo').val();
    const fromId = $('#kudoFrom').val();
    const title = $('#kudoTitle').val();
    const body = $('#kudoBody').val();
    const newKudo = {
        toId: toId,
        fromId: fromId,
        title: title,
        body: body
    };
    $.post('/api/kudo', newKudo).then(function(res) {
        $('#kudoList').empty();
        renderKudos();
        $('#kudoTo').val('');
        $('#kudoFrom').val('');
        $('#kudoTitle').val('');
        $('#kudoBody').val('');
    });
};

$('#sendKudo').on('click', createKudo);