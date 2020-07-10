window.addEventListener('load', init);

function init() {
  document.querySelector("#inSub").addEventListener('click',signIn);
  document.querySelector("#upSub").addEventListener('click',signUp);
}

function signUp(){
  let form = document.querySelector("#signUp");
  let upname = document.querySelector("#upName").value;
  let uppass = document.querySelector("#upPass").value;
  //save for later
  localStorage.setItem('name',upname);
  //submit form
  form.submit();
}
function signIn(){
  let form = document.querySelector("#signIn");
  let inname = document.querySelector("#inName").value;
  let inpass = document.querySelector("#inPass").value;
  //save for later
  console.log(inname);
  localStorage.setItem('name',inname);
  //submit form
  form.submit();
}
