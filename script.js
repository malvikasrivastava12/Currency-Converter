let BASE_URL="https://api.frankfurter.app/latest?"

const dropdowns=document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");
const fromCurrency=document.querySelector(".from select");
const toCurrency=document.querySelector(".to select");
let msg=document.querySelector(".msg");
let amount = document.querySelector(".amount input");
for(let select of dropdowns){
    for (cuurencycode in countryList){
       let currencyoption = document.createElement("option");
       currencyoption.innerText=cuurencycode;
       currencyoption.value=cuurencycode;
       if(select.name=="from" && cuurencycode=="USD"){
        currencyoption.selected=true;
       }
        else if(select.name=="to" && cuurencycode=="INR"){
            currencyoption.selected=true;
           }
            
       select.append(currencyoption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });  
}



const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
  };

  
   let updateExchangeRate=async() =>{

    let amountValue=amount.value;
    console.log(amountValue);
     if(amountValue=="" || amountValue<1){
        amountValue=1;
     }
     console.log(fromCurrency.value,toCurrency.value)
     const URL=`${BASE_URL}amount=${amountValue}&from=${fromCurrency.value}&to=${toCurrency.value}`;
     console.log(URL);
     let response=await fetch(URL);
     let data=await response.json();
     let rate=data.rates[toCurrency.value.toUpperCase()];

  
     console.log("Rate",rate);

   msg.innerText=`${amountValue} ${fromCurrency.value} = ${rate} ${toCurrency.value}`;
   }

   
  btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
  });

  window.addEventListener("load", () => {
    updateExchangeRate();
  });