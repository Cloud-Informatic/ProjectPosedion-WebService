const inputElements = [...document.querySelectorAll('input.code-input')]
const hiddenCode = document.getElementById("code");

inputElements.forEach((ele,index)=>{
    ele.addEventListener('keyup', (e) => {
    Submits();
    if(e.keyCode === 8 && e.target.value==='') inputElements[Math.max(0,index-1)].focus()
  })
  ele.addEventListener('input',(e)=>{
    const [first,...rest] = e.target.value
    e.target.value = first ?? ''
    if(index!==inputElements.length-1 && first!==undefined) {
      inputElements[index+1].focus()
      inputElements[index+1].value = rest.join('')
      inputElements[index + 1].dispatchEvent(new Event('input'))
    }
  })
})

function ControlInputs() {
    const inputValue = [...document.querySelectorAll('input.code-input')].filter(({ name }) => name).map(({ value }) => value).join('')
    var parsValue = String(parseInt(inputValue));
    console.log(parsValue);
    if (parsValue.length == 6) {
        
        hiddenCode.value = parsValue;
        return true;
    } 
}

function Submits() {
    const ControllValue = ControlInputs();
    if (ControllValue == true) {
        document.getElementById("Form2").submit();
    }
}