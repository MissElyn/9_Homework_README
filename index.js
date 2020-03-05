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
      name: "table",
      message: "Do you have a Table of Contents?"
    },
    {
      type: "input",
      name: "installation",
      message: "How do I install necessary dependencies?"
    },
    {
      type: "input",
      name: "usage",
      message: "What is your project's specific use?"
    },
    {
      type: "input",
      name: "license",
      message: "Is there a license number?"
    },
    {
      type: "input",
      name: "contributing",
      message: "Please list any contributors?"
    },
    {
      type: "input",
      name: "test",
      message: "How do you test the program?"
    }
  ]);
}

function generater(answers) {
  return `
  [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/nelio/some)
  ​
  ​
  As a developer, I am trying to create a project that ${answers.description}.
  ​
  To install necessary dependencies run ${answers.installation}.
  
  The Table of Contents is ​${answers.table}.

  This program will be used to ${answers.usage}.

  License # ${answers.license}.

  The contributers on this project were ${answers.contributing}.

  To test the program ${answers.test}.

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
      //console.log(response)


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
