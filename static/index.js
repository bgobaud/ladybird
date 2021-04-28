var allJson = []

fetch('data.json').then(function(res) {
    return res.json().then(function (json) {
        allJson = json
    })
})

function updateArray(document) {
    const dataTable = document.getElementById("dataTable")
    const agerangeSelectValue = document.getElementById('agerange').value
    const eyecolorSelectValue = document.getElementById('eyecolor').value
    let ageMin = undefined
    let ageMax = undefined
    if (agerangeSelectValue === "20_25") {
        ageMin = 20
        ageMin = 25
    }
    if (agerangeSelectValue === "26_30") {
        ageMin = 26
        ageMax = 30
    }
    if (agerangeSelectValue === "31_35") {
        ageMin = 31
        ageMax = 35
    }
    if (agerangeSelectValue === "36_41") {
        ageMin = 36
        ageMax = 41
    }

    const filteredData = filterData(allJson, {ageMin, ageMax, eyeColor: eyecolorSelectValue})

    const new_tbody = document.createElement('tbody');
    new_tbody.id='dataTable'
    
    filteredData.forEach(item => {
        let row = new_tbody.insertRow()
        let firstname = row.insertCell(0)
        firstname.innerHTML = item.name.first
        
        let lastname = row.insertCell(1)
        lastname.innerHTML = item.name.last

        let eyecolor = row.insertCell(2)
        eyecolor.innerHTML = item.eyeColor

        let age = row.insertCell(3)
        age.innerHTML = item.age

        let company = row.insertCell(4)
        company.innerHTML = item.company

        let email = row.insertCell(5)
        email.innerHTML = item.email

        let phone = row.insertCell(6)
        phone.innerHTML = item.phone

    })
    dataTable.parentNode.replaceChild(new_tbody, dataTable)
}
