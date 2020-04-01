const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

const questions = [
    {
        type: 'input',
        name: 'username',
        message: 'Enter your GitHub username:'
    },
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please enter a description of you project:',
        default: 'My project is the best project of all projects'
    },
    {
        type: 'input',
        name: 'tableOfContents',
        message: 'What would you like in the Table of Contents?',
        default: 'Table of Contents'
    },
    {
        type: 'input',
        name: 'installation',
        message: 'What are the installation instructions?'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Please enter any usage limits:',
        default: 'Free to use'
    },
    {
        type: 'input',
        name: 'license',
        message: 'Would you like to add a license?',
        default: 'MIT'
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Please list any contributors to the project:',
        default: "None"
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Would you like to add any tests to the Readme?',
        default: "None"
    }

]


inquirer.prompt(questions).then(answers => {
        
        console.log(answers);
        const answersformat = answers.map(function(answer) {
            return answer.name;
          });
        const queryUrl = `https://api.github.com/users/${answers.username}?`;

        axios.get(queryUrl).then(function (res) {
            console.log(res.data)
            const avatar = res.data.avatar_url;
            console.log(avatar)
            const avatarImg = `![Avatar](${avatar})`


            fs.writeFile("newreadme.md", avatarImg, function (err) {
                if (err) {
                    throw err;
                }


            })
            console.log("newreadme.md");
        })
    })
