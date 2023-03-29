const form_validate=()=>{
const name=document.getElementById("name").value;
const email=document.getElementById("email").value;
const password=document.getElementById("password").value;
const dob=document.getElementById("dob").value;
const acceptterms=document.getElementById("acceptterm").checked;
var Entries;
if(localStorage.getItem('user-entries')===null)
Entries=[];
else
Entries=JSON.parse(localStorage.getItem('user-entries'))
Entries.unshift({
name:name,
email:email,
password:password,
dob:dob,
acceptterms:acceptterms
})
localStorage.setItem('user-entries',JSON.stringify(Entries));
showdata()
document.getElementById('name').value="";
document.getElementById('email').value="";
document.getElementById('password').value="";
document.getElementById('dob').value="";
document.getElementById('acceptterm').value="true";
}
const showdata=()=>{
var Entries;
if(localStorage.getItem('user-entries')===null)
Entries=[];
else
Entries=JSON.parse(localStorage.getItem('user-entries'))

var html="";

Entries.forEach((element,intex)=>{
html += "<tr>";
html += '<td class="border border-slate-700 p-4">' + element.name+"</td>";
html += '<td class="border border-slate-700 p-4">' + element.email+"</td>";
html += '<td class="border border-slate-700 p-4">' + element.password+"</td>";
html += '<td class="border border-slate-700 p-4">' + element.dob+"</td>";
html += '<td class="border border-slate-700 p-4">' + element.acceptterms+"</td>";
html += "</tr>";
});
document.querySelector("#regTable tbody").innerHTML=html;

}
document.onload=showdata();
