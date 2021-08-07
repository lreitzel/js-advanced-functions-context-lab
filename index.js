/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let createEmployeeRecord = function(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
};

let createEmployeeRecords = function(employeeData) {
    return employeeData.map(function(arr) {
        return createEmployeeRecord(arr)
    })
};

let createTimeInEvent = function(timeStamp) {
    let [date, hour] = timeStamp.split(" ")
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    });
    return this
};

let createTimeOutEvent = function(timeStamp) {
    let [date, hour] = timeStamp.split(" ")
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    });
    return this
};

let hoursWorkedOnDate = function(desiredDate) {
    let timeIn = this.timeInEvents.find(function(person) {
        return person.date === desiredDate
    });
    let timeOut = this.timeOutEvents.find(function(person) {
        return person.date === desiredDate
    });
    return (timeOut.hour - timeIn.hour) / 100
};

let wagesEarnedOnDate = function(desiredDate) {
    let wages = hoursWorkedOnDate.call(this, desiredDate)
    let pay = wages * this.payPerHour
    return parseFloat(pay.toString())
};

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
};

let findEmployeeByFirstName = function(employeeRecords, name) {
    return employeeRecords.find(function(name){
        return name.firstName
    })
};

let calculatePayroll = function(employeeRecords) {
    return employeeRecords.reduce(function(memo, record) {
        return memo + allWagesFor.call(record)
    }, 0)
};