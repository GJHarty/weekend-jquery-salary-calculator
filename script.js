// setup onReady
$(document).ready(onReady);

function onReady(){
    console.log('onReady');

    // target form submission click event
    $('#employeeForm').on('submit', onSubmit);
}

let employees = [];

function onSubmit(event){
    // stop form from executing default behavior
    event.preventDefault();

    console.log('onSubmit');

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
                <td>${employee.annualSalary}</td>
            </tr>
        `);
    };
}