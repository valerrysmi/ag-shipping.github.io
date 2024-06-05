let tg = window.Telegram.WebApp;
tg.expand();

function myOnClick(openedForm, closedForm) {
    if (!(closedForm === '')) {
        document.getElementById(closedForm).style.display = "none";
    }
    if (!(openedForm === '')) {
        document.getElementById(openedForm).style.display = "block";
    }
}

function notCheckRadio(inputName, formID) {
    var askChecked =  document.querySelector('input[name=' + inputName + ']:checked');
    var askFields = document.getElementById(formID).querySelectorAll('div');
    if (askChecked) {
        askFields.forEach(radioButton  => {
            if (radioButton.classList.contains('invalid-style-radio')) {
                radioButton.classList.remove('invalid-style-radio')
            }
        });
    } else {
        askFields.forEach(radioButton  => {
            radioButton.classList.add('invalid-style-radio')
        });
        return true;
    }
    return false;
}

function finishForm() {
    if (notCheckRadio('ask_category', 'form_category'))  {
        return;
    }
    if (notCheckRadio('ask_driver', 'form_ask_driver')) {
        return;
    }
    const forms = document.querySelectorAll('form');
    console.log(forms)
    for (var i = 0; i < forms.length; i++) {
        var form = forms[i];
        if (form.style.display === "none")  {
            continue;
        }
        var inputFields = form.querySelectorAll('input');
        for (var i = 0; i < inputFields.length; i++) {
            var field = inputFields[i];
            if (!field.checkValidity()) {
                field.classList.add('invalid-style')
                return;           
            } else {
                if (field.classList.contains('invalid-style')) {
                    field.classList.remove('invalid-style')
                }
            }
        }
    }
    
    const inputs = document.querySelectorAll('input')
    const arr = []
    for (let i = 0; i < inputs.length; ++i) {
        if ((inputs[i].name === 'ask_category') || (inputs[i].name  ===  'ask_driver'))  {
            continue;
        }
        arr.push([inputs[i].name, inputs[i].value])
    }

    var askCategory = document.querySelector('input[name="ask_category"]').value;
    var askDriver  = document.querySelector('input[name="ask_driver"]').value;
    arr.push(["ask_category", askCategory])
    arr.push(["ask_driver", askDriver])

    const data = Object.fromEntries(arr)
    Telegram.WebApp.sendData(JSON.stringify(data))
    Telegram.WebApp.close();
}