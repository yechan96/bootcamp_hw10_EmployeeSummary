const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve("./", "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];


const managerQuestions = [
    {
        type:'input',
        name:'managerName',
        message: 'Enter the manager\'s name:'

    },
    {
        type:'input',
        name:'managerID',
        message: 'Enter the manager\'s ID number:'

    },
    {
        type:'input',
        name:'managerEmail',
        message: 'Enter the manager\'s email:'

    },
    {
        type:'input',
        name:'managerOffice',
        message: 'Enter the manager\'s office number:'

    }
];

const engineerQuestions = [
    {
        type:'input',
        name:'engineerName',
        message: 'Enter the engineer\'s name:'

    },
    {
        type:'input',
        name:'engineerID',
        message: 'Enter the engineer\'s ID number:'

    },
    {
        type:'input',
        name:'engineerEmail',
        message: 'Enter the engineer\'s email:'

    },
    {
        type:'input',
        name:'engineerGithub',
        message: 'Enter the engineer\'s Github username:'

    }
];

const internQuestions = [
    {
        type:'input',
        name:'internName',
        message: 'Enter the intern\'s name:'

    },
    {
        type:'input',
        name:'internID',
        message: 'Enter the intern\'s ID number:'

    },
    {
        type:'input',
        name:'internEmail',
        message: 'Enter the intern\'s email:'

    },
    {
        type:'input',
        name:'internSchool',
        message: 'Entern the intern\'s school:'

    }
];

async function main(){
    const manager = await inquirer.prompt(managerQuestions);
    employees.push(new Manager(manager.managerName,manager.managerID,manager.managerEmail,manager.managerOffice));
    let moreEmployee = true;
    while(moreEmployee){
        let isMore = await inquirer.prompt({
            type:'list',
            name:'choice',
            message: 'Do you have more team members?',
            choices: ["Yes","No"]
        });
        if(isMore.choice =="No"){
            moreEmployee=false;
        }
        else{
            let typeOfEmployee = await inquirer.prompt({
                type:'list',
                name:'choice',
                message: 'What is their role?',
                choices: ["Engineer","Intern"]
            });
            if(typeOfEmployee.choice == "Engineer"){
                let engineer = await inquirer.prompt(engineerQuestions);
                employees.push(new Engineer(engineer.engineerName,engineer.engineerID,engineer.engineerEmail,engineer.engineerGithub));

            }
            else{
                let intern = await inquirer.prompt(internQuestions);
                employees.push(new Intern(intern.internName,intern.internID,intern.internEmail,intern.internSchool));
            }
        }
    }
    
    fs.mkdir(OUTPUT_DIR,{recursive:true},(err)=>{
        if(err) throw err;
    });
    fs.writeFileSync(outputPath,render(employees));
    
};

main();

