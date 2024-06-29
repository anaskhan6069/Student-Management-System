#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import clear from "clear";
console.log(chalk.rgb(255, 255, 0)(`\n\t===>>  WELCOME TO STUDENT MANAGEMENT PROGRAM  <<===`)); // \t, \n -->> known as escape sequence
console.log(chalk.rgb(255, 255, 0)(`____________________________________________________________________\n`));
let id = 10000;
let continueProgramRun = true;
let clearScreen = false;
let students = [];
class Student {
    name;
    id;
    courseEnrolled;
    balance;
    constructor(name) {
        this.name = name;
        this.id = id++;
        this.courseEnrolled = [];
        this.balance = 1000; //Default balance we gave to student
    }
    enrollInCourse(course) {
        this.courseEnrolled.push(course);
    }
    payTuition(amount) {
        this.balance -= amount;
    }
    studentStatus() {
        console.log(chalk.rgb(255, 255, 0)(`\n==============  STUDENT STATUS  ===============\n`));
        console.log(chalk.rgb(255, 255, 0)(`ID: \t\t\t${this.id}\nName: \t\t\t${this.name}\nEnrolled in Courses: \t${this.courseEnrolled.length > 0 ? this.courseEnrolled.join(", ") : "No Course"}\nBalance: \t\t${this.balance}`));
        console.log(chalk.rgb(255, 255, 0)(`\n===============================================\n`));
    }
}
do {
    if (clearScreen == true) {
        clear();
    }
    const userChoice = await inquirer.prompt([
        {
            type: "list",
            name: "userChoice",
            message: "\nWhat do you want to do?",
            choices: ["Add student", "Enroll student in courses", "View student status", "View all students details", "View balance", "Withdraw Balance", "Deposit balance", "Exit"],
            prefix: ""
        }
    ]);
    //..............Adding students...............
    if (userChoice.userChoice === "Add student") {
        clearScreen = false; //Resetting variable to false again just not to clear screen here
        const { studentName } = await inquirer.prompt([
            {
                type: "input",
                name: "studentName",
                message: "Enter student name: ",
                prefix: ""
            }
        ]);
        let foundNumber = false;
        for (let letter of studentName) {
            if (letter >= "0" && letter <= "9") { //isNaN -> is Not a Number, method returns false if there is a number
                foundNumber = true;
                break;
            }
        }
        if (!foundNumber) {
            const student = new Student(studentName);
            students.push(student);
            console.log(chalk.rgb(0, 255, 0)(`\n===============================================\n`));
            console.log(chalk.rgb(0, 255, 0)("Student added successfully."));
            console.log(chalk.rgb(0, 255, 0)("Your unique ID: ", chalk.rgb(255, 255, 0)(student.id)));
            console.log(chalk.rgb(0, 255, 0)(`\n===============================================\n`));
        }
        else {
            console.log(chalk.rgb(255, 0, 0)(`\n===========================================================\n`));
            console.log(chalk.rgb(255, 0, 0)("WARNING! Your name should be contain only alphabets. Not numbers!"));
            console.log(chalk.rgb(255, 0, 0)(`\n===========================================================\n`));
        }
    }
    //.............Enrolling students in course............... 
    else if (userChoice.userChoice === "Enroll student in courses") {
        clearScreen = false; //Resetting variable to false again just not to clear screen here
        //{ studentId, course } -> this is destructuring, simply directly assign values of objects in respective variables. 
        const { studentId } = await inquirer.prompt([
            {
                type: "input",
                name: "studentId",
                message: "Enter student ID: ",
                prefix: ""
            }
        ]);
        const student = students.find(s => s.id == parseInt(studentId));
        if (student) {
            console.log(`\nWelcome ${chalk.rgb(255, 255, 0)(student.name + ",")}`);
            const { courseName } = await inquirer.prompt([
                {
                    type: "list",
                    name: "courseName",
                    message: "Please choose a course from the list below along with its respective fee: ",
                    choices: ["Web Development\t1000", "Javascript\t\t600", "Typescript\t\t600", "Python\t\t400", "Java\t\t\t300", "C++\t\t\t200"],
                    prefix: ""
                }
            ]);
            // substring method is commonly used to extract parts of a string by specifying the start and end indices
            // It returns given index letters like "hello world".substring(0, 3); it will return hel.
            const index = courseName.lastIndexOf('\t'); // Find the index of the last tab character
            const course = courseName.substring(0, index).trim(); // Extract course name and trim whitespace
            const fees = parseInt(courseName.substring(index + 1)); // Extract fee and parse to integer
            switch (course) {
                case "Web Development":
                    if (student.courseEnrolled.includes(course)) {
                        console.log(chalk.rgb(255, 255, 0)(`\n===============================================\n`));
                        console.log(chalk.rgb(255, 255, 0)(`You are already enrolled in ${course}.`));
                        console.log(chalk.rgb(255, 255, 0)(`\n===============================================\n`));
                    }
                    else {
                        if (1000 <= student.balance) {
                            student.enrollInCourse(course);
                            student.balance -= 1000;
                            console.log(chalk.rgb(0, 255, 0)(`\n===============================================\n`));
                            console.log(chalk.rgb(0, 255, 0)(`Dear ${chalk.rgb(255, 255, 0)(student.name)}, you have successfully enrolled in ${chalk.rgb(255, 255, 0)(course)}.`));
                            console.log(chalk.rgb(0, 255, 0)(`${chalk.rgb(255, 255, 0)(`${fees}${chalk.rgb(255, 255, 0)('rs')}`)} fees has been deducted from your account.`));
                            console.log(chalk.rgb(0, 255, 0)(`\n===============================================\n`));
                        }
                        else {
                            console.log(chalk.rgb(255, 0, 0)(`\n====================================================\n`));
                            console.log(chalk.rgb(255, 0, 0)(`Not enough balance to enroll in ${chalk.rgb(255, 255, 0)(course)}. Please deposit sufficient funds to proceed!`));
                            console.log(chalk.rgb(255, 0, 0)(`\n====================================================\n`));
                        }
                    }
                    break;
                case "Javascript":
                    if (student.courseEnrolled.includes(course)) {
                        console.log(chalk.rgb(255, 255, 0)(`\n===============================================\n`));
                        console.log(chalk.rgb(255, 255, 0)(`You are already enrolled in ${course}.`));
                        console.log(chalk.rgb(255, 255, 0)(`\n===============================================\n`));
                    }
                    else {
                        if (600 <= student.balance) {
                            student.enrollInCourse(course);
                            student.balance -= 600;
                            console.log(chalk.rgb(0, 255, 0)(`\n===============================================\n`));
                            console.log(chalk.rgb(0, 255, 0)(`Dear ${chalk.rgb(255, 255, 0)(student.name)}, you have successfully enrolled in ${chalk.rgb(255, 255, 0)(course)}.`));
                            console.log(chalk.rgb(0, 255, 0)(`${chalk.rgb(255, 255, 0)(`${fees}${chalk.rgb(255, 255, 0)('rs')}`)} fees has been deducted from your account.`));
                            console.log(chalk.rgb(0, 255, 0)(`\n===============================================\n`));
                        }
                        else {
                            console.log(chalk.rgb(255, 0, 0)(`\n====================================================\n`));
                            console.log(chalk.rgb(255, 0, 0)(`Not enough balance to enroll in ${chalk.rgb(255, 255, 0)(course)}. Please deposit sufficient funds to proceed!`));
                            console.log(chalk.rgb(255, 0, 0)(`\n====================================================\n`));
                        }
                    }
                    break;
                case "Typescript":
                    if (student.courseEnrolled.includes(course)) {
                        console.log(chalk.rgb(255, 255, 0)(`\n===============================================\n`));
                        console.log(chalk.rgb(255, 255, 0)(`You are already enrolled in ${course}.`));
                        console.log(chalk.rgb(255, 255, 0)(`\n===============================================\n`));
                    }
                    else {
                        if (600 <= student.balance) {
                            student.enrollInCourse(course);
                            student.balance -= 600;
                            console.log(chalk.rgb(0, 255, 0)(`\n===============================================\n`));
                            console.log(chalk.rgb(0, 255, 0)(`Dear ${chalk.rgb(255, 255, 0)(student.name)}, you have successfully enrolled in ${chalk.rgb(255, 255, 0)(course)}.`));
                            console.log(chalk.rgb(0, 255, 0)(`${chalk.rgb(255, 255, 0)(`${fees}${chalk.rgb(255, 255, 0)('rs')}`)} fees has been deducted from your account.`));
                            console.log(chalk.rgb(0, 255, 0)(`\n===============================================\n`));
                        }
                        else {
                            console.log(chalk.rgb(255, 0, 0)(`\n====================================================\n`));
                            console.log(chalk.rgb(255, 0, 0)(`Not enough balance to enroll in ${chalk.rgb(255, 255, 0)(course)}. Please deposit sufficient funds to proceed!`));
                            console.log(chalk.rgb(255, 0, 0)(`\n====================================================\n`));
                        }
                    }
                    break;
                case "Python":
                    if (student.courseEnrolled.includes(course)) {
                        console.log(chalk.rgb(255, 255, 0)(`\n===============================================\n`));
                        console.log(chalk.rgb(255, 255, 0)(`You are already enrolled in Python.`));
                        console.log(chalk.rgb(255, 255, 0)(`\n===============================================\n`));
                    }
                    else {
                        if (400 <= student.balance) {
                            student.enrollInCourse(course);
                            student.balance -= 400;
                            console.log(chalk.rgb(0, 255, 0)(`\n===============================================\n`));
                            console.log(chalk.rgb(0, 255, 0)(`Dear ${chalk.rgb(255, 255, 0)(student.name)}, you have successfully enrolled in ${chalk.rgb(255, 255, 0)(course)}.`));
                            console.log(chalk.rgb(0, 255, 0)(`${chalk.rgb(255, 255, 0)(`${fees}${chalk.rgb(255, 255, 0)('rs')}`)} fees has been deducted from your account.`));
                            console.log(chalk.rgb(0, 255, 0)(`\n===============================================\n`));
                        }
                        else {
                            console.log(chalk.rgb(255, 0, 0)(`\n====================================================\n`));
                            console.log(chalk.rgb(255, 0, 0)(`Not enough balance to enroll in ${chalk.rgb(255, 255, 0)(course)}. Please deposit sufficient funds to proceed!`));
                            console.log(chalk.rgb(255, 0, 0)(`\n====================================================\n`));
                        }
                    }
                    break;
                case "Java":
                    if (student.courseEnrolled.includes(course)) {
                        console.log(chalk.rgb(255, 255, 0)(`\n===============================================\n`));
                        console.log(chalk.rgb(255, 255, 0)(`You are already enrolled in ${course}.`));
                        console.log(chalk.rgb(255, 255, 0)(`\n===============================================\n`));
                    }
                    else {
                        if (300 <= student.balance) {
                            student.enrollInCourse(course);
                            student.balance -= 300;
                            console.log(chalk.rgb(0, 255, 0)(`\n===============================================\n`));
                            console.log(chalk.rgb(0, 255, 0)(`Dear ${chalk.rgb(255, 255, 0)(student.name)}, you have successfully enrolled in ${chalk.rgb(255, 255, 0)(course)}.`));
                            console.log(chalk.rgb(0, 255, 0)(`${chalk.rgb(255, 255, 0)(`${fees}${chalk.rgb(255, 255, 0)('rs')}`)} fees has been deducted from your account.`));
                            console.log(chalk.rgb(0, 255, 0)(`\n===============================================\n`));
                        }
                        else {
                            console.log(chalk.rgb(255, 0, 0)(`\n====================================================\n`));
                            console.log(chalk.rgb(255, 0, 0)(`Not enough balance to enroll in ${chalk.rgb(255, 255, 0)(course)}. Please deposit sufficient funds to proceed!`));
                            console.log(chalk.rgb(255, 0, 0)(`\n====================================================\n`));
                        }
                    }
                    break;
                case "C++":
                    if (student.courseEnrolled.includes(course)) {
                        console.log(chalk.rgb(255, 255, 0)(`\n===============================================\n`));
                        console.log(chalk.rgb(255, 255, 0)(`You are already enrolled in ${course}.`));
                        console.log(chalk.rgb(255, 255, 0)(`\n===============================================\n`));
                    }
                    else {
                        if (200 <= student.balance) {
                            student.enrollInCourse(course);
                            student.balance -= 200;
                            console.log(chalk.rgb(0, 255, 0)(`\n===============================================\n`));
                            console.log(chalk.rgb(0, 255, 0)(`Dear ${chalk.rgb(255, 255, 0)(student.name)}, you have successfully enrolled in ${chalk.rgb(255, 255, 0)(course)}.`));
                            console.log(chalk.rgb(0, 255, 0)(`${chalk.rgb(255, 255, 0)(`${fees}${chalk.rgb(255, 255, 0)('rs')}`)} fees has been deducted from your account.`));
                            console.log(chalk.rgb(0, 255, 0)(`\n===============================================\n`));
                        }
                        else {
                            console.log(chalk.rgb(255, 0, 0)(`\n====================================================\n`));
                            console.log(chalk.rgb(255, 0, 0)(`Not enough balance to enroll in ${chalk.rgb(255, 255, 0)(course)}. Please deposit sufficient funds to proceed!`));
                            console.log(chalk.rgb(255, 0, 0)(`\n====================================================\n`));
                        }
                    }
                    break;
                default:
                    console.log("INAVLID");
            }
        }
        else {
            console.log(chalk.rgb(255, 0, 0)(`\n===============================================\n`));
            console.log(chalk.rgb(255, 0, 0)("No student found with that ID!"));
            console.log(chalk.rgb(255, 0, 0)(`\n===============================================\n`));
        }
    }
    //.............VIEW STUDENT STATUS...............
    else if (userChoice.userChoice === "View student status") {
        clearScreen = false; //Resetting variable to false again just not to clear screen here
        const { studentId } = await inquirer.prompt([
            {
                type: "input",
                name: "studentId",
                message: "Enter student ID: ",
                prefix: ""
            }
        ]);
        const student = students.find(s => s.id == parseInt(studentId));
        if (student) {
            student.studentStatus();
        }
        else {
            console.log(chalk.rgb(255, 0, 0)(`\n===============================================\n`));
            console.log(chalk.rgb(255, 0, 0)("No student found with that ID!"));
            console.log(chalk.rgb(255, 0, 0)(`\n===============================================\n`));
        }
    }
    //.............View all students details.....................
    else if (userChoice.userChoice === "View all students details") {
        clearScreen = false; //Resetting variable to false again just not to clear screen here
        let pinID = 1234;
        const { enteredPin } = await inquirer.prompt([
            {
                type: "input",
                name: "enteredPin",
                message: "\nAdministrator access required: Enter the 4-digit PIN to see all student details. ",
                prefix: ""
            }
        ]);
        if (enteredPin == pinID) {
            let goBack = false;
            if (students.length == 0) {
                console.log(chalk.rgb(255, 0, 0)(`\n===============================================\n`));
                console.log(chalk.rgb(255, 0, 0)("No students records found"));
                console.log(chalk.rgb(255, 0, 0)("Please add students to the list"));
                console.log(chalk.rgb(255, 0, 0)(`\n===============================================\n`));
            }
            else {
                let goBack = false;
                do {
                    clear();
                    console.log(chalk.rgb(255, 255, 0)(`\n==========================  ALL STUDENTS DETAILS  ===========================\n`));
                    for (let i = 0; i < students.length; i++) {
                        console.log(chalk.rgb(255, 255, 0)(`\t\t\tID: \t\t\t${students[i].id}\n\t\t\tName: \t\t\t${students[i].name}\n\t\t\tEnrolled in Courses: \t${students[i].courseEnrolled.length > 0 ? students[i].courseEnrolled.join(", ") : "No Course"}\n\t\t\tBalance: \t\t${students[i].balance}`));
                        if (i < students.length - 1) {
                            console.log(chalk.rgb(255, 255, 0)("\n\t\t___________________________________________________\n"));
                        }
                    }
                    console.log(chalk.rgb(255, 255, 0)(`\n===========================================================================\n`));
                    const { userInput } = await inquirer.prompt([
                        {
                            type: "input",
                            name: "userInput",
                            message: "--> Press enter to go back: ",
                            prefix: ""
                        }
                    ]);
                    if (userInput === "") {
                        goBack = true;
                        clearScreen = true;
                    }
                } while (!goBack);
            } //students.length == 0 else block
        } //enteredPin == pinID if block
        else {
            console.log(chalk.rgb(255, 0, 0)(`\n===============================================\n`));
            console.log(chalk.rgb(255, 0, 0)("Incorrect PIN. Please try again."));
            console.log(chalk.rgb(255, 0, 0)(`\n===============================================\n`));
        }
    }
    //..................VIEW STUDENT BALANCE....................
    else if (userChoice.userChoice === "View balance") {
        clearScreen = false; //Resetting variable to false again just not to clear screen here  
        const studentID = await inquirer.prompt([
            {
                type: "input",
                name: "studentID",
                message: "Enter student ID: ",
                prefix: ""
            }
        ]);
        let student = students.find(s => s.id == studentID.studentID);
        if (student) {
            console.log(chalk.rgb(0, 255, 0)(`\n==============================================  =\n`));
            console.log(chalk.rgb(0, 255, 0)(`Dear ${chalk.rgb(255, 255, 0)(student.name)}, your current balance is: ${chalk.rgb(255, 255, 0)(`${student.balance}${chalk.rgb(255, 255, 0)('rs')}`)}`));
            console.log(chalk.rgb(0, 255, 0)(`\n===============================================\n`));
        }
        else {
            console.log(chalk.rgb(255, 0, 0)(`\n===============================================\n`));
            console.log(chalk.rgb(255, 0, 0)("No student found with that ID!"));
            console.log(chalk.rgb(255, 0, 0)(`\n===============================================\n`));
        }
    }
    //.............Withdraw Balance.....................
    else if (userChoice.userChoice === "Withdraw Balance") {
        clearScreen = false; //Resetting variable to false again just not to clear screen here
        const { studentId } = await inquirer.prompt([
            {
                type: "input",
                name: "studentId",
                message: "Enter student ID: ",
                prefix: ""
            }
        ]);
        const student = students.find(s => s.id == parseInt(studentId));
        if (student) {
            console.log(`\nWelcome ${chalk.rgb(255, 255, 0)(student.name + ",")}`);
            let againShowWithdraw = false;
            do {
                againShowWithdraw = false; //reseting variable to again false
                const { withdrawAmount } = await inquirer.prompt([
                    {
                        type: "input",
                        name: "withdrawAmount",
                        message: `Please enter amount to withdraw: `,
                        prefix: ""
                    }
                ]);
                if (parseInt(withdrawAmount) > 0) {
                    if (parseInt(withdrawAmount) <= student.balance) {
                        student.balance -= parseInt(withdrawAmount);
                        console.log(chalk.rgb(0, 255, 0)(`\n===============================================\n`));
                        console.log(chalk.rgb(0, 255, 0)(`Dear ${chalk.rgb(255, 255, 0)(student.name)},`));
                        console.log(chalk.rgb(0, 255, 0)(`You have successfully withdrawn ${withdrawAmount}Rs.`));
                        console.log(chalk.rgb(0, 255, 0)(`Now your new balance is: ${student.balance}`));
                        console.log(chalk.rgb(0, 255, 0)(`\n===============================================\n`));
                    }
                    else {
                        console.log(chalk.rgb(255, 0, 0)(`\n===============================================\n`));
                        console.log(chalk.rgb(255, 0, 0)("Insufficient balance to complete this withdrawal."));
                        console.log(chalk.rgb(255, 0, 0)(`Your current balance is ${chalk.rgb(255, 255, 0)(student.balance)}${chalk.rgb(255, 255, 0)('Rs.')}`));
                        console.log(chalk.rgb(255, 0, 0)(`\n===============================================\n`));
                    }
                }
                else {
                    console.log(chalk.rgb(255, 0, 0)(`\n===============================================\n`));
                    console.log(chalk.rgb(255, 0, 0)("Please enter positive amount!"));
                    console.log(chalk.rgb(255, 0, 0)(`\n===============================================\n`));
                    againShowWithdraw = true;
                }
            } while (againShowWithdraw);
        }
        else {
            console.log(chalk.rgb(255, 0, 0)(`\n===============================================\n`));
            console.log(chalk.rgb(255, 0, 0)("No student found with that ID!"));
            console.log(chalk.rgb(255, 0, 0)(`\n===============================================\n`));
        }
    }
    //................DEPOSIT AMOUNT...........................
    else if (userChoice.userChoice === "Deposit balance") {
        clearScreen = false; //Resetting variable to false again just not to clear screen here
        const { studentId } = await inquirer.prompt([
            {
                type: "input",
                name: "studentId",
                message: "Enter student ID: ",
                prefix: ""
            }
        ]);
        const student = students.find(s => s.id == parseInt(studentId));
        if (student) {
            console.log(`\nWelcome ${chalk.rgb(255, 255, 0)(student.name + ",")}`);
            let againShowDeposit = false;
            do {
                againShowDeposit = false; //resetting variable to again false
                const { depositAmount } = await inquirer.prompt([
                    {
                        type: "input",
                        name: "depositAmount",
                        message: "Enter amount to deposit: ",
                        prefix: ""
                    }
                ]);
                if (parseInt(depositAmount) > 0) {
                    student.balance += parseInt(depositAmount);
                    console.log(chalk.rgb(0, 255, 0)(`\n===============================================\n`));
                    console.log(chalk.rgb(0, 255, 0)(`Dear ${chalk.rgb(255, 255, 0)(student.name)},`));
                    console.log(chalk.rgb(0, 255, 0)(`${depositAmount}Rs deposit in your account successfully.`));
                    console.log(chalk.rgb(0, 255, 0)(`Now your new balance is: ${student.balance}Rs.`));
                    console.log(chalk.rgb(0, 255, 0)(`\n===============================================\n`));
                }
                else {
                    console.log(chalk.rgb(255, 0, 0)(`\n===============================================\n`));
                    console.log(chalk.rgb(255, 0, 0)("Please enter positive amount!"));
                    console.log(chalk.rgb(255, 0, 0)(`\n===============================================\n`));
                    againShowDeposit = true;
                }
            } while (againShowDeposit);
        }
        else {
            console.log(chalk.rgb(255, 0, 0)(`\n===============================================\n`));
            console.log(chalk.rgb(255, 0, 0)("No student found with that ID!"));
            console.log(chalk.rgb(255, 0, 0)(`\n===============================================\n`));
        }
    }
    else {
        clear();
        console.log(chalk.rgb(0, 255, 0)(`\n\t===>>   Thank You For Using My App :)   <<===`)); // \t, \n -->> known as escape sequence
        console.log(chalk.rgb(0, 255, 0)(`\n\t===>>      </> Code by ANAS KHAN        <<===`)); // \t, \n -->> known as escape sequence
        console.log(chalk.rgb(0, 255, 0)(`___________________________________________________________________\n`));
        continueProgramRun = false;
    }
} while (continueProgramRun);
