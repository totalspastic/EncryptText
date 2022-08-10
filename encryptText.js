const   outputSection = document.querySelector('#output-section'),
        infoEshaanBtn = document.querySelector('#info-eshaan-btn'),
        infoParthBtn = document.querySelector('#info-parth-btn'),
        infoAsmiBtn = document.querySelector('#info-asmi-btn'),
        infoNabihaBtn = document.querySelector('#info-nabiha-btn'),
        infoAyushiBtn = document.querySelector('#info-ayushi-btn'),
        cancelBtn = document.getElementsByClassName('cancel-btn'),
        cancelDownloadSectionBtn = document.querySelector('#download-section .cancel-btn'),
        submitBtn = document.querySelector("input[type='submit']"),
        resetBtn = document.querySelector("input[type='reset']");
        formBtn = document.querySelector("#user-form input[type='submit']"),
        downloadBtn = document.getElementsByClassName('download-btn'),
        downloadButton = document.querySelector('#download-button'),
        downloadSection = document.querySelector('#download-section'),
        chooseOptionMenu = document.querySelector('#choose-option'),
        copyOutput = document.querySelector('#copy-output');
let output = 'The Encrypted Text will be shown here';
let optionSelected = document.querySelector('input[type="radio"]:checked').value;
let languageSelected;
const codes = [
    {title: "Random Substitution Cipher", value: 1}, 
    {title: "Random Ceaser Cipher", value: 2}, 
    {title: "Substitution Cipher", value: 3}, 
    {title: "Ceaser Cipher", value: 4}, 
    {title: "Vigenere Cipher", value: 5}, 
    {title: "Autokey Cipher", value: 6}
];
const language = [
    {title: 'C++', value: 1}, 
    {title: 'Javascript', value: 2}, 
    {title: 'PHP', value: 3}
];
// To load all events at once
loadEvents();
outputSection.innerText = output;

function loadEvents(){
    infoEshaanBtn.addEventListener('click', onInfoEshaan);
    infoAsmiBtn.addEventListener('click', onInfoAsmi);
    infoParthBtn.addEventListener('click', onInfoParth);
    infoAyushiBtn.addEventListener('click', onInfoAyushi);
    infoNabihaBtn.addEventListener('click', onInfoNabiha);
    for(let i = 0; i < 4; i++){
        cancelBtn[i].addEventListener('click', onCancelBtn);
    }
    cancelDownloadSectionBtn.addEventListener('click', onDownloadSectionCancelBtn);
    submitBtn.addEventListener('click', onSubmit);
    resetBtn.addEventListener('click', onReset);
    copyOutput.addEventListener('click', onCopy);
    formBtn.addEventListener('click', onFormSubmit);
    chooseOptionMenu.addEventListener('click', getSelectedCipher);
    downloadSection.addEventListener('click', getSelectedLanguage);
    for(let i = 0; i < 6; i++){
        downloadBtn[i].addEventListener('click', onDownloadBtn);
    }
    // downloadButton.addEventListener('click', onDownloadCodeButton);
}
function getSelectedLanguage(e){
    if(!isNaN(e.target.value) && e.target.value != 0){
        languageSelected = e.target.value;
    } 
    downloadButton.setAttribute('href', `./download files/${codes[optionSelected-1].title}/${codes[optionSelected-1].title} (${language[languageSelected-1].title}).txt`);
    downloadButton.setAttribute('download',  `${codes[optionSelected-1].title} (${language[languageSelected-1].title})`);
}
function getSelectedCipher(e){
    if(!isNaN(e.target.value) && e.target.value != 0){
        optionSelected = e.target.value;
    }
}
function onDownloadBtn(e){
    downloadSection.style.display = 'block';
    e.preventDefault();
}
const displayInfo = function(name){
    name.style.display = 'grid';
    name.style.gridTemplateColumns = '1fr 2fr';
    name.style.gridGap = '20px';
}
function onInfoEshaan(){ 
    const infoEshaan = document.querySelector('#info-eshaan');
    displayInfo(infoEshaan);
}
function onInfoAsmi(){
    const infoAsmi = document.querySelector('#info-ankit');
    displayInfo(infoAsmi);
}
function onInfoParth(){
    const infoParth = document.querySelector('#info-parth');
    displayInfo(infoParth);
}
function onInfoAyushi(){
    const infoAyushi = document.querySelector('#info-sapratibh');
    displayInfo(infoAyushi);
}
function onInfoNabiha(){
    const infoNabiha = document.querySelector('#info-sapratibh');
    displayInfo(infoNabiha);
}
function onCancelBtn(event){
    event.target.parentElement.parentElement.parentElement.style.display = 'none';
    event.preventDefault();
}
function onDownloadSectionCancelBtn(event){
    downloadSection.style.display = 'none';
    document.querySelector('form > div').style.display = 'grid';
    event.preventDefault();
}
function onReset(){
    outputSection.innerText = 'The Encrypted Text will be shown here';
}
function onCopy(e){
    const cb = navigator.clipboard;
    cb.writeText(outputSection.innerText).then(()=> console.log('Text copied'));
    e.preventDefault();
}
function onSubmit(event){
    const   xhr = new XMLHttpRequest();
            input = document.querySelector('#plain-text').value;  
            option = document.querySelector("#choose-option input[type='radio']:checked").value;
    xhr.open('POST', 'encryption.php');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    const url = 'plainText='+input+'&option='+option;
    xhr.onload = function(){
        if(this.status === 200){
            outputSection.innerText = this.responseText;
        }
    }
    xhr.send(url);
    event.preventDefault();
}
function onFormSubmit(event){
    const   output = document.querySelector('#user-form form h3'),
            userEmail = document.querySelector("#user-form form input[type='text']"),
            userFeedback = document.querySelector('#user-form textarea'),
            xhr = new XMLHttpRequest();
        
    // Client side form validation
    let error;
    if(userEmail.value.length > 0 && userFeedback.value.length > 0){
        console.log('the 1st part of form validation works');
        let mail = userEmail.value;
        console.log(mail);
        if(mail.indexOf('@') != -1 && mail.indexOf('.') != -1){
            let posdot = [], 
                pos;
            // console.log(posdot.value)
            for(let i = 0; i < mail.length; i++){
                if(mail[i] == '@')
                    pos = i;
                if(mail[i] == '.')
                    posdot.push(i);
            }
            if(posdot[posdot.length-1] > pos && posdot[posdot.length-1] - pos >= 2 && mail[mail.length-1] != '.')
                error = false;
            else{
                error = true; 
                output.innerText = 'The entered email is not correct';  
            }
        }
        else{
            error = true; 
            output.innerText = 'The entered email is not correct';
        }
    }
    else{
        if(userFeedback.value == '' && userEmail.value == '')
            output.innerText = 'Form fields not filled';
        else if(userEmail.value == '')
            output.innerText = 'Email field not filled';
        else if(userFeedback.value == '')
            output.innerText = 'No feedback provided';

        error = true;
        console.log('This 2nd part of validation also works');
    }
    console.log('value of error:'+ error);
    
    // Displaying the output
    if(error == false){
        xhr.open('POST', 'formSubmit.php');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function(){
            if(this.status == 200){
                console.log('the response is ready');
                if(this.responseText == '1'){
                    output.innerText = 'Your response has been submitted!';
                    console.log('response from server:'+ this.responseText);
                }
                else
                    console.log('response from server:'+ this.responseText);
            }
        }
        const url = 'mail='+ userEmail.value+'&userFeedback='+ userFeedback.value;
        output.style.display = 'block';
        userEmail.value = userFeedback.value = '';
        xhr.send(url);
    }
    else if(error == true){
        output.style.display = 'block';
    }
    setTimeout(function(){
        output.style.display = 'none';
    }, 2500);
    event.preventDefault();
}
