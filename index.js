const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require('axios');

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username"
    },
    {
      type: "input",
      name: "title",
      message: "What is your project titled?"
    },
    {
      type: "input",
      name: "description",
      message: "Please write a short description of your project. (No more than 3 lines)"
    },
    {
      type: "input",
      name: "table of contents",
      message: ""
    },
    {
      type: "input",
      name: "installation",
      message: ""
    },
    {
      type: "input",
      name: "usage",
      message: "Does your project have a specific use?"
    },
    {
      type: "input",
      name: "license",
      message: ""
    },
    {
      type: "input",
      name: "contributing",
      message: "Please list any contributors?"
    },
    {
      type: "input",
      name: "test",
      message: ""
    }
  ]);
}

function generater(answers) {
  return `# Some
  [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/nelio/some)
  ​
  ## Description
  ​
  As a developer, I am trying to create a project that ${answers.description}
  ​
  ## Table of Contents 
  ​
  * [Installation](#installation)

  To install necessary dependencies

  \`\`\`
  ${answers.installation}
  \`\`\`
  ​
  * [Usage](#usage)
  ​\`\`\`
  ${answers.usage}
  \`\`\`
  * [License](#license)
  ​\`\`\`
  ${answers.license}
  \`\`\`
  * [Contributing](#contributing)
  ​\`\`\`
  ${answers.contributing}
  \`\`\`
  * [Tests](#tests)
  ​\`\`\`
  ${answers.test}
  \`\`\`
  * [Questions](#questions)
  ​
  <img src="${answers.data.avatar_url}" alt="avatar" style="border-radius: 16px" width="30" />
  ​
  If you have any questions about the repo, open an issue or contact [${answers.github}](${answers.data.url}) directly at ${answers.data.email}.
  `;
}

promptUser()
  .then(function(answers) {
    // MAKE API CALL TO GITHUB, username: answers.github

    const queryUrl = `https://api.github.com/users/${answers.github}`;
    axios.get(queryUrl)
    .then(function(response){
      console.log(response)


      const readme = generater({...answers, ...response});
      return writeFileAsync("README.MD", readme);
      })
  })
  .then(function() {
    console.log("Successfully wrote to README.MD");
  })
  .catch(function(err) {
    console.log(err);
  });
