const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

const questions = [
  {
    type: "input",
    name: "username",
    message: "Enter your GitHub username:",
  },
  {
    type: "input",
    name: "title",
    message: "What is your project's title?",
    validate: function (value) {
      var pass = value !== "";
      if (pass) {
        return true;
      }

      return "Please enter a title";
    },
  },
  {
    type: "input",
    name: "description",
    message: "What would you like to call the Description section?",
    default: "Description",
  },
  {
    type: "input",
    name: "tableOfContents",
    message: "What would you like to call the Table of Contents?",
    default: "Table of Contents",
  },
  {
    type: "input",
    name: "installation",
    message: "What would you like to call the Installation section?",
    default: "Installation",
  },
  {
    type: "input",
    name: "usage",
    message: "What would you like to call the Usage section?",
    default: "Usage",
  },
  {
    type: "input",
    name: "license",
    message: "What license would you like to use?",
    default: "MIT",
  },
  {
    type: "input",
    name: "contributing",
    message: "What would you like to call the contributing section?",
    default: "Contributing",
  },
  {
    type: "input",
    name: "tests",
    message: "What would you like to call the Tests section?",
    default: "Tests",
  },
  {
    type: "input",
    name: "email",
    message: "What is your email address?",
  },
];

inquirer.prompt(questions).then((answers) => {
  const newReadme = `# ${answers.title}
    
# ${answers.tableOfContents}
#### [${answers.description}](#${answers.description})    
#### [${answers.installation}](#${answers.installation})    
#### [${answers.usage}](#${answers.usage})    
#### [License](#license)
#### [${answers.contributing}](#${answers.contributing})    
#### [${answers.tests}](#${answers.tests})    

# ${answers.description}
    
# ${answers.installation}
    
# ${answers.usage}

# License
![badge](https://img.shields.io/badge/license-${answers.license}-brightgreen)
    
# ${answers.contributing}
    
# ${answers.tests}

`;
  fs.mkdir("output", { recursive: true }, (err) => {
    if (err) throw err;
  });
  const newUserFile = "output/README.md";

  fs.writeFile(newUserFile, newReadme, function (err) {
    if (err) {
      throw err;
    }
  });

  const queryUrl = `https://api.github.com/users/${answers.username}?`;

  axios.get(queryUrl).then(function (res) {
    const avatar = res.data.avatar_url;
    let email = res.data.email ? res.data.email : answers.email;
    const picAndEmail = `![Avatar](${avatar})

##### Email: 
${email}

`;
    fs.appendFile(newUserFile, picAndEmail, function (err) {
      if (err) {
        throw err;
      }
      console.log("README ready to go!");
    });
  });
});
