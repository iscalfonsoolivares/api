$('.btn-login').click(function() {
    $.ajax({
      type: 'POST',
      url: '/api/auth/login',
      data: {
        login: document.querySelector('#login').value,
        password: document.querySelector('#password').value
      },
      success: function(data) {  
        getJwtCookie(data.token);
      },
      error: function(error) {
        console.log('There was an error: ' + error)
      }
  
    });
  });
  
  function getJwtCookie(token) {
    $.ajax({
      type: 'POST',
      url: '/api/auth/authorize-cookie',
      data: {
        token: token
      },
      headers: {
        'Authorization' : 'Bearer ' + token
      },
      success: function() {
        console.log('Cookie received!');
      },
      error: function() {
        console.log('Problem with cookie');
      }
    });
  }