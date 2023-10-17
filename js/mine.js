// global variables 
var loginEmail =  document.getElementById('loginEmail');
var loginPassword =  document.getElementById('loginPassword');
var loginBtn =  document.getElementById('loginBtn');
var loginHome =  document.getElementById('loginHome');
var loginEmailAlert =  document.getElementById('loginEmailAlert');
var loginPassAlert =  document.getElementById('loginPassAlert');
var loginAlert =  document.getElementById('loginAlert');
var signUpName =  document.getElementById('signUpName');
var signUpEmail =  document.getElementById('signUpEmail');
var signUpPassword=  document.getElementById('signUpPassword');
var signUpBtn=  document.getElementById('signUpBtn');
var signUpNameAlert=  document.getElementById('signUpNameAlert');
var signUpEmailAlert=  document.getElementById('signUpEmailAlert');
var signUpPassAlert=  document.getElementById('signUpPassAlert');
var signUpAlert=  document.getElementById('signUpAlert');
var homeUserName=  document.getElementById('homeUserName');
var logOut = document.getElementById('logOut');
// addEventListener
// button signUp
if(signUpBtn)
{
    signUpBtn.addEventListener('click',function()
    {
        // alert('signUp'); //test
        newUser();
        
    });
}
// input signUp
if(signUpName)
{
    signUpName.addEventListener('keyup',validtionUserName);
}
if(signUpEmail)
{
    signUpEmail.addEventListener('keyup',validtionUserEmail);
}
if(signUpPassword)
{
    signUpPassword.addEventListener('keyup',validtionUserPassword);
}
//button login
if (loginBtn)
{
    loginBtn.addEventListener('click',function()
{
    // alert('login'); //test
    loginUser();
    // location.href = 'home.html' // to not use a tag
   // window.location.href = 'home.html' // to not use a tag
});
}
// input login
if (loginEmail)
{
    loginEmail.addEventListener('keyup',validLoginEmail);
}
if (loginPassword)
{
    loginPassword.addEventListener('keyup',validLoginPassword);
}
//button logout
if (logOut)
{
    logOut.addEventListener('click',logout);
} 
// to make or display data in array
if(localStorage.getItem('userData') != null)
{
    var userList=JSON.parse(localStorage.getItem('userData'));//string to array of object
    // console.log(userList);//test
    
}
else
{
    var userList=[]; //new array for new client
}
var namelogincurent = JSON.parse(localStorage.getItem('currentUser'));
if(localStorage.getItem('currentUser') != null){
    if (homeUserName)
{
    homeUserName.innerHTML = "Welcome " + namelogincurent ;
}
    else
     {
        homeUserName.innerHTML = "" ;
    }
}


/***********login***********/
function loginUser()
{
    //console.log("loginUser"); //test
    if (loginEmail.value !="" & loginPassword.value !="")
    {
        if(validLoginEmail() == true & validLoginPassword() == true)
        {
            if (checkLoginEmail() == true & checkLoginPassword() == true)
            {
                 userLogin =
            {
                userLoginEmail :loginEmail.value , 
                userLoginPass :loginPassword.value ,
            };
           // console.log(userLogin);
            home(loginEmail.value);
            cleanLogin();
            window.location.href = 'home.html' // to not use a tag 
            }
            else 
            {
               // alert("not found"); //test
               loginAlert.classList.add('text-danger');
               loginAlert.innerHTML = `<strong>Email or password not exists</strong>`;
            }
        }
        else 
        {
          //  alert("not valid"); //test
          loginAlert.classList.add('text-danger');
          loginAlert.innerHTML = `<strong>Email or password is invalid</strong>`;
        }
    }
    else 
    {
        //alert("all input required");//test
        loginAlert.classList.add('text-danger');
        loginAlert.innerHTML = `<strong>All inputs is required</strong>`;
    }
}
// set name in localStorage currentUser
function home(emailValue)
{
    for(var i = 0 ; i<userList.length ; i++)
    {
        if (userList[i].userEmail == emailValue)
        { 
            localStorage.setItem('currentUser',JSON.stringify(userList[i].userName));
        }
    }
}
//clean login input
function cleanLogin()
{
    loginEmail.value = "" ;
    loginPassword.value = "" ;
}
//validation login email
function validLoginEmail()
{
    var regxLoginEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var regxLoginEmailRes = regxLoginEmail.test(loginEmail.value);
    if (regxLoginEmailRes == true)
    {
        //console.log("match"); //test
        loginEmailAlert.classList.add('d-none');
        loginEmail.classList.remove('is-invalid');
        loginEmail.classList.add('is-valid');
        return true ;
    }
    else
    {
       // console.log("not match"); //test
        loginEmailAlert.classList.remove('d-none');
        loginEmailAlert.classList.remove('text-success');
        loginEmailAlert.classList.add('text-danger');
        loginEmailAlert.innerHTML = `<strong>Email is not valid</strong>`;
        loginEmail.classList.add('is-invalid');
        return false ;
    }

}
//validation login password
function validLoginPassword()
{
    //console.log('valid'); //test
    var regxLoginPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/ ;
    var regxLoginPassRes = regxLoginPass.test(loginPassword.value);
    if (regxLoginPassRes == true)
    {
       //console.log('match'); //test 
       loginPassAlert.classList.add('d-none');
       loginPassword.classList.remove('is-invalid');
       loginPassword.classList.add('is-valid');
       return true ;
    }
    else
    {
       // console.log('not match'); //test
       loginPassAlert.classList.remove('d-none');
       loginPassAlert.classList.remove('text-success');
       loginPassAlert.classList.add('text-danger');
       loginPassAlert.innerHTML = `<strong>Password is not valid</strong>`;
       loginPassword.classList.add('is-invalid');
        return false ;
    }
}
// check login email
function checkLoginEmail()
{
    for(var i = 0 ; i<userList.length ; i++)
    {
        if (loginEmail.value == userList[i].userEmail)
        {
            return true ;
        }
    }
}
// check login password
function checkLoginPassword()
{
    for(var i = 0 ; i<userList.length ; i++)
    {
        if(loginPassword.value == userList[i].userPassword)
        {
            return true ;
        }
    }
}
/***********logOut***********/
function logout()
{
    logOut.setAttribute('href','index.html');
    homeUserName.innerHTML = "" ; 
    localStorage.removeItem('currentUser');
    
}
/***********signUp***********/
//add new user
function newUser()

{
    if (signUpName.value !="" & signUpEmail.value !="" & signUpPassword !="")
    {
        if ( validtionUserName() == true &validtionUserEmail() == true &validtionUserPassword() == true)
        {
            if(checkEmail() != false & checkName() != false) // the best until now       
            {
                users = 
                    {
                        userName : signUpName.value ,
                        userEmail : signUpEmail.value ,
                        userPassword : signUpPassword.value ,
                    } ;
                console.log(users);
                userList.push(users);
                console.log(userList);
                localStorage.setItem('userData',JSON.stringify(userList)); //make localStorage 
                cleanSignUp();
                signUpAlert.classList.remove('text-danger');  
                signUpAlert.classList.add('text-success');
                signUpAlert.innerHTML = `<strong>Success</strong>`;
                signUpName.classList.remove('is-valid');
                signUpEmail.classList.remove('is-valid');
                signUpPassword.classList.remove('is-valid');
            }
            else
            {
                signUpAlert.classList.remove('text-success');  
                signUpAlert.classList.add('text-danger');
                signUpAlert.innerHTML = `<strong>Name or email already exists</strong>`;
            
            }         
        }
        else 
        {
            signUpAlert.classList.remove('text-success');  
            signUpAlert.classList.add('text-danger');
            signUpAlert.innerHTML = `<strong>Email or name or password is invalid</strong>`; 
        }      
    }
    else
    {    
        signUpAlert.classList.remove('text-success');  
        signUpAlert.classList.add('text-danger');
        signUpAlert.innerHTML = `<strong>All inputs is required</strong>`;
    }      
}
// clean signUp input
function cleanSignUp()
{
     signUpName.value = "" ;
    signUpEmail.value = "" ;
    signUpPassword.value = "" ;
}
// check name 
function checkName()
{
    for (var i = 0 ; i<userList.length ; i++)
    {
        if (signUpName.value == userList[i].userName)
        {
            
            return false ;
        }
    } 
}
// check email
function checkEmail()
{
    for (var i = 0 ; i<userList.length ; i++)
    {
        if (signUpEmail.value == userList[i].userEmail)
        {
            return false ;
        }
    }
}
// validation user name
function validtionUserName()
{
    //  console.log("hello"); //test
    var regxUserName = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;
    var regxUserNameRes = regxUserName.test(signUpName.value);
    if (regxUserNameRes == true)
    {
        // console.log("match"); //test
        signUpNameAlert.classList.add('d-none');
        signUpName.classList.remove('is-invalid');
        signUpName.classList.add('is-valid');
        return true ;
    }
    else //not match
    {
        signUpNameAlert.classList.remove('d-none');
        signUpNameAlert.classList.remove('text-success');
        signUpNameAlert.classList.add('text-danger');
        signUpNameAlert.innerHTML = `<strong>Name is not valid</strong>`;
        signUpName.classList.add('is-invalid');
        return false ;
    }
}
// validation user email
function validtionUserEmail()
{
    //console.log("hello"); //test
    var regxUserEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    var regxUserEmailRes = regxUserEmail.test(signUpEmail.value);
    if (regxUserEmailRes == true)
    {
        //console.log("match"); //test
        signUpEmailAlert.classList.add('d-none');
        signUpEmail.classList.remove('is-invalid');
        signUpEmail.classList.add('is-valid');
        return true ;
    }
    else
    {
        //console.log("not match"); //test
        signUpEmailAlert.classList.remove('d-none');
        signUpEmailAlert.classList.remove('text-success');
        signUpEmailAlert.classList.add('text-danger');
        signUpEmailAlert.innerHTML = `<strong>Email is not valid</strong>`;
        signUpEmail.classList.add('is-invalid');
        return false ;
    }
}
// validation user password
function validtionUserPassword()
{
    //console.log("hello"); //test
    //signUpPassAlert
    var regxUserPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/ ;
    var regxUserPassRes = regxUserPass.test(signUpPassword.value);
    if (regxUserPassRes == true)
    {
        //console.log("match"); //test
        signUpPassAlert.classList.add('d-none');
        signUpPassword.classList.remove('is-invalid');
        signUpPassword.classList.add('is-valid');
        return true ;
    }
    else
    {
     // console.log("not match"); //test  
     signUpPassAlert.classList.remove('d-none');
     signUpPassAlert.classList.remove('text-success');
     signUpPassAlert.classList.add('text-danger');
     signUpPassAlert.innerHTML = `<strong>Password is not valid</strong>`;
     signUpPassword.classList.add('is-invalid');
     return false ;
    }

}