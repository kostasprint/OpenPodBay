//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//---------------------------------------------------------------------------- init

$(document).ready(function() {
    $('#nav-sidebar-userlist').addClass('active');
    fillUsers();
});

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//---------------------------------------------------------------------------- dom manipulation

function fillUsers() {
    $('#userList > tbody').empty();
    var users_path = DATA_URL+'/users';
    $.getJSON(users_path, function(users) {
        users.forEach(function(user){
            var controlOption = 
                '<a class="user_control delete" data-toggle="modal" data-target="#confirm-delete" >delete</a>'+
                '/'+
                '<a class="user_control modify">modify</a>';
            var tr = '<tr class="'+(user.active?'':'inactive')+'">'+ 
                '<th class="id">'+user.id+'</th>'+
                '<th class="name">'+user.name+'</th>'+
                '<th>'+controlOption+'</th>'+
                '</tr>';
            $('#userList > tbody:last').append(tr);
        });
        addControlToUsersTable();
    });
}

function addControlToUsersTable() {

    $('.user_control.delete').css('cursor', 'pointer');

    // click on modify redirect on the single user page
    // i.e. http://localhost:3000/view/users/user-1
    $('.user_control.modify').attr('href', function() {
        var userTr = this.parentNode.parentNode
          , userName = userTr.getElementsByClassName('name')[0].innerHTML
          , userId = userTr.getElementsByClassName('id')[0].innerHTML;
        return VIEW_URL+'/users/user-'+userId;
    });

    // click on delete open the twitter bootstrap modal
    $('.user_control.delete').click(function() {
        var userTr = this.parentNode.parentNode
          , userName = userTr.getElementsByClassName('name')[0].innerHTML
          , userId = userTr.getElementsByClassName('id')[0].innerHTML;

        $('#confirm-delete').on('show.bs.modal', function(e) {
            $('.user-to-delete').html(
                'Delete user: #<strong>' + 
                userId + ' ' + 
                userName +
                '</strong>'
            );
    
            var btnDelete = $('#confirm-delete').find('.btn.danger');
            btnDelete.unbind("click");
            btnDelete.click(function(e) {
                $('#confirm-delete').modal('hide');
                deleteUserAjax(userId, userName);
                e.preventDefault();
            });

        });
    });
}

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//---------------------------------------------------------------------------- delete user

function deleteUserAjax(userId, userName) {
    $.ajax({
        type: 'DELETE',
        url: DATA_URL+'/users/user-' + userId,
        success: deleteUserSuccess(userId, userName),
    }).done(function( response ) {
        if (response.msg === '') {
        }
    });
}

function deleteUserSuccess(userId, userName) {
    var id = 'alert-delete-user-success'+Math.floor((Math.random() * 100) + 1);

    $('#alerttt-placeholder').append(
        '<div id="'+id+'" '+
        '     class="alert alert-success" '+
        '     data-alert="alert" style="display:none;"> User #'+userId+' '+userName+' correctly deleted</div>');
    $('#'+id).slideDown().fadeIn();

    // deve essere dentro un timer altrimenti non è aggiornato perchè l'animazione non è finita
    setTimeout(function() {
        fillUsers();
    }, 500);

    setTimeout(function() {
        $('#'+id).fadeTo('slow', 0.00, function(){ //fade
             $(this).slideUp('slow', function() { //slide up
                 $(this).remove(); //then remove from the DOM
             });
         });
    }, 3000);
}
