// setup onReady
$(document).ready(onReady);

function onReady(){
    console.log('onReady');

    // target form submission click event
    $('#employeeForm').on('submit', onSubmit);

    // add delete click event
    $(document).on('click', '#deleteBtn', deleteButton)
}

let employees = [];
let maximumMonthlyCost = 20000;

function onSubmit(event){
    // stop form from executing default behavior
    event.preventDefault();

    console.log('onSubmit');
    console.log($('#fname').val());
    // add logic to determine if all input fields have been entered
    if (readyToSubmit()){
        //Grab values from form and cast to object
        let employee = {
            firstName: $('#fname').val(),
            lastName: $('#lname').val(),
            id: $('#id').val(),
            title: $('#title').val(),
            annualSalary: Number($('#annualSalary').val())
        }
        console.log('employee', employee);
        // add employee to global array
        employees.push(employee);
        console.log('employees', employees);

    
        // clear input fields
        $('input').val('');

        // empty table
        $('#employeeTable').empty();

        // loop through employee array and append to table
        for (let employee of employees) {
            $('#employeeTable').append(`
                <tr>
                    <td>${employee.firstName}</td>
                    <td>${employee.lastName}</td>
                    <td>${employee.id}</td>
                    <td>${employee.title}</td>
                    <td id="salary">${employee.annualSalary.toFixed(2)}</td>
                    <td>
                        <button id="deleteBtn">Delete</button>
                    </td>
                </tr>
            `);
        };

        //calculate monthly cost of employee
        let monthlyCost = 0;
        for (let employee of employees) {
            monthlyCost += employee.annualSalary / 12;
        }
        console.log('monthly cost', monthlyCost);
        $('#monthlyCost').text(`${monthlyCost.toFixed(2)}`)

        // check to see if monthly cost exceeds $20,000
        if (monthlyCost > maximumMonthlyCost){
            $('#monthlyCost').css('background-color', 'red');
            $('#monthlyCost').css('color', 'black');
            alert(`WARNING: Monthly cost of employees has exceeded the maximum allowed amount of $${maximumMonthlyCost.toFixed(2)}`);
        } else {
            $('#monthlyCost').css('color', 'green');
        }
    } else {
        alert('Please complete all fields before submitting');
    }
}

//create input validation for missing inputs
function readyToSubmit(){
    // if any inputs are null return false
    switch (true) {
        case !$('#fname').val():
        case !$('#lname').val():
        case !$('#id').val():
        case !$('#title').val():
        case !$('#annualSalary').val():
            return false;
            break;
        default:
            return true;
    }
}

// deleteBtn handler
function deleteButton() {
    // get salary
    let salary = Number($(this)
                    .parent()
                    .siblings('#salary').html()).toFixed(2);
    console.log('salary',salary);
    console.log(salary / 12);

    // target monthly cost
    let monthlyCost = Number($('#monthlyCost').text()).toFixed(2);
    console.log('monthly cost', monthlyCost);

    //calculate new monthly cost
    monthlyCost = (monthlyCost - (salary / 12).toFixed(2));
    console.log('new monthly cost', monthlyCost);

    //cast new monthlyCost
    $('#monthlyCost').text(`${monthlyCost.toFixed(2)}`);

    //target row that button is in and remove that row
    $(this)
        .parent()
        .parent()
        .remove();
}
