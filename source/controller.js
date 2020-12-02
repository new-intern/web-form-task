function timestamp() { 
  var response = document.getElementById("g-recaptcha-response"); 

  if (response == null || response.value.trim() == "") {
    var elems = JSON.parse(document.getElementsByName("captcha_settings")[0].value);
    elems["ts"] = JSON.stringify(new Date().getTime());
    document.getElementsByName("captcha_settings")[0].value = JSON.stringify(elems);
  } 
}

setInterval(timestamp, 500); 

function checkRecaptcha() {
  document.getElementById("qwerty").addEventListener("submit", function(evt) {
   
    var response = grecaptcha.getResponse();
    
    if(response.length == 0) {
      alert("Please, complete captcha validation!"); 
      evt.preventDefault();
      return false;
    }
     
  });
}

setTimeout(checkRecaptcha, 0);

function checkvalidity(elem) {
  if (elem.id === '00N5g000000iJhE') {
    if (elem.value.trim()) {
      if (!isValidDate(elem.value)) {
        elem.classList.add('has-error');
      } else {
        elem.classList.remove('has-error');
      }
    } else {
      elem.classList.remove('has-error');
    }
  } else if (elem.id === 'url') {
      if (elem.value.trim()) {
        if (!isValidUrl(elem.value)) {
          elem.classList.add('has-error');
        } else {
          elem.classList.remove('has-error');
        }
      } else {
        elem.classList.remove('has-error');
      }
  } else if (!elem.value.trim()) {
    elem.classList.add('has-error');
  } else if (elem.id === 'email' && !isValidEmail(elem.value)) {
    elem.classList.add('has-error');
  } else {
    elem.classList.remove('has-error');
  }
}

function isValidEmail(email) {
  return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email);
}

function isValidDate(date) {
  var a = String(new Date().getFullYear() - 18).slice(-1);
  var regExpDate = new RegExp("(0[1-9]|1[012])\\/(0[1-9]|1[0-9]|2[0-9]|3[01])\\/(19\\d\\d|200[0-" + a + "])");
  return regExpDate.test(date);
}

function isValidUrl(url) {
  return /^((https?|ftp)\:\/\/)?([a-z0-9]{1})((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z]{2,6})(\/?)$/.test(url);
}