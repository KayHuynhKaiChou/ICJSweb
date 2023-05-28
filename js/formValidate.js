function Validator(option){

    var formSelector = {}; 

    function resetValue(){
        option.rules.forEach((rule) => {
            var inputElement = formElement.querySelector(rule.selector);
            inputElement.value = '';
        })
    }

    function validate(inputEle,rule){
        var spanError = inputEle.parentElement.querySelector('.form-message');
        var errorMessage;

        var rules = formSelector[rule.selector];

        for (let ele of rules) {
            errorMessage = ele(inputEle.value);
            if(errorMessage) break;
        }

        if(errorMessage){
            spanError.innerText = errorMessage
            inputEle.parentElement.classList.add('invalid');
        }

        return !errorMessage;

    }

    var formElement = document.querySelector(option.form);

    if(formElement){

        formElement.onsubmit = (e) => {
            e.preventDefault();
            var isValidForm = true;
            option.rules.forEach((rule) =>{
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement,rule);
                if(!isValid){ isValidForm = false;}
            });

            if(isValidForm){
                // alert('Register Successfully!');
                if(typeof option.onSubmit === 'function'){
                    var enableInputs = formElement.querySelectorAll('input:not([disabled])');
                    var formValues = Array.from(enableInputs).reduce((valuesObj,input) => {
                        return (valuesObj[input.name] = input.value) && valuesObj;
                    },{});
                    option.onSubmit(formValues);
                }
                resetValue();                   
            }
        }

        option.rules.forEach((rule) => {

            if(Array.isArray(formSelector[rule.selector])){
                formSelector[rule.selector].push(rule.checkValid);
            }else{
                formSelector[rule.selector] = [rule.checkValid];
            }

            var inputElement = formElement.querySelector(rule.selector)
            
            inputElement.onblur = function(e){
                validate(e.target,rule);               
            }
    
            inputElement.oninput = function(e){
                var spanError = e.target.parentElement.querySelector('.form-message');
                spanError.innerText = '';
                inputElement.parentElement.classList.remove('invalid');
            }
        });
    }

}

Validator.isRequired = (selector,messageError) =>{
    return {
        selector : selector,
        checkValid : (valueInput) => {
            return valueInput ? undefined : messageError
        } 
    }
}

Validator.isEmail = (selector,messageError) =>{
    return {
        selector : selector,
        checkValid : (valueInput) => {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            // Cách 1: return regex.test(value) ? undefined : "Trường này phải là email";
            return valueInput.match(regex) ? undefined : messageError;

        } 
    }
}

Validator.isPassword = (selector,min,messageError) =>{
    return {
        selector : selector,
        checkValid : (valueInput) => {
            return valueInput.length >=min ? undefined : messageError
        } 
    }
}

Validator.isConfirmed = (selector,passwordAgain,messageError) =>{
    return {
        selector : selector,
        checkValid : (valueInput) => {
            return valueInput == passwordAgain() ? undefined : messageError
        } 
    }
}

//////////////////////////////////////////////////////////////////////////////////
var signUp = document.getElementById('form-signup');
var signIn = document.getElementById('form-signin');

function showFormSignUp(){
    signUp.style.display = 'block';
    signIn.style.display = 'none';
}

function closeForm(){
    var cover = document.querySelector('.cover');
    var swing_form = document.querySelector('.swing-form');
    cover.style.display = 'none';
    swing_form.style.display = 'none';

    signIn.style.display = 'block';
    signUp.style.display = 'none';
}
