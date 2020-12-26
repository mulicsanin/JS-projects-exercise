let input=document.getElementById("input");
let output=document.getElementById("converted");
const Kilograms=document.getElementById("kg");
const grams=document.getElementById("g");
const pounds=document.getElementById("lbs");
let option=document.getElementsByTagName("option");
let kg, g, lbs;
document.getElementById("convOpt").addEventListener('change', () =>{
    let convert=document.getElementById("convOpt").selectedIndex;
    myFunction(convert);
});
function myFunction(opt)
{
    input.addEventListener('input', (e) =>{
        if(opt==1)
        {
            kg="converting kg";
            g = e.target.value * 1000;
            lbs = e.target.value / 0.45359237;
        } else if(opt==2)
        {
            kg = e.target.value / 1000;
            g = 'converting grams';
            lbs = e.target.value / 453.59237;
        } else if(opt==3){
            kg = e.target.value * 0.45359237;
            g = e.target.value * 453.59237;
            lbs = 'converting pounds';
        }
        else{ kg=0; g=0; lbs=0;}
    })
};
Kilograms.addEventListener('click', () =>{
    output.innerHTML=kg;
});
grams.addEventListener('click', () =>{
    output.innerHTML=g;
});
pounds.addEventListener('click', () =>{
    output.innerHTML=lbs;
});

let refresh=document.getElementById('refresh');
refresh.addEventListener('click', ()=>{
    location.reload();
    return false;
})