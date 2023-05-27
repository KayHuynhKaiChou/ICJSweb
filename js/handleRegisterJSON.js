var accountsAPI = "http://localhost:3000/accounts";

function pushRegisterIntoJSON(aRegister){
    var register = handleDefaultValueRest(aRegister);
    var options = {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(register)
    }
    fetch(accountsAPI,options)
        .then(response => response.json())
}

// vì lấy object accRegister chỉ có 4 thuộc tính từ form sign up , do đó add thêm vài thuộc tính cho same account.json
function handleDefaultValueRest(aRegister){
    delete aRegister.password_confirmation;
    aRegister.job = 'Student';
    aRegister.avatar = 'img/defaultImage.png';
    aRegister.role = 1;
    aRegister.list_WrongQ = [];
    aRegister.numberQuiz = 0;
    aRegister.bio = '';
    return aRegister;
}