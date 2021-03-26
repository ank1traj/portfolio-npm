'use strict'

const boxen = require('boxen');
const chalk = require('chalk');
const inquirer = require('inquirer');
const clear = require('clear');
const open = require('open');
const fs = require('fs');
const request = require('request');
const path = require('path');
const ora = require('ora');
const cliSpinners = require('cli-spinner');

clear();

const prompt  = inquirer.createPromptModule();

const questions = [
	{
		type: "list",
		name: "action",
		mesaage: "What you want to do?",
		choices: [
			{
				name: `Send me an ${chalk.green.bold("email")}?`,
				value: () => {
					open("mailto: ankit.raj928@gmail.com");
					console.log("\n Done, see you soon at inbox. \n");
				}
			},
			{
                name: `Download my ${chalk.magentaBright.bold("Resume")}?`,
                value: () => {
                    // cliSpinners.dots;
                    const loader = ora({
                        text: ' Downloading Resume',
                        spinner: cliSpinners.material,
                    }).start();
                    let pipe = request('https://drive.google.com/file/d/18-aLcdC_Mar0YGE8NZunKQ5WPESOXyQD/view?usp=sharing').pipe(fs.createWriteStream('./ankit-resume.html'));
                    pipe.on("finish", function () {
                        let downloadPath = path.join(process.cwd(), 'ankit-resume.html')
                        console.log(`\nResume Downloaded at ${downloadPath} \n`);
                        open(downloadPath)
                        loader.stop();
                    });
                }
            },
			{
				name: "Just Quit.",
				value: () => {
					console.log("Auf Wiedersehen; bis später. \n");
				}
			}
		]
	}
];


const data = {
	name: chalk.bold.green("Ankit Raj"),
	handle: chalk.white("@ank1traj"),
	work: `${chalk.white("ex-CTO at")} ${chalk.hex("#2b82b2").bold("MKB")}`,
	hackerrank: chalk.gray("https://www.hackerrank.com/coderboy_/") + chalk.keyword('green')("coderboy_"),
	codechef: chalk.gray("https://codechef.com/users/") + chalk.keyword('red')("honesthacker"),
	github: chalk.gray("https://github.com/") + chalk.green("ank1traj"),
	linkedin: chalk.gray("https://linkedin.com/in/") + chalk.blue("ank1traj"),
	Instagram: chalk.white("https://instagram.com/") + chalk.keyword('pink')("ank1tshrivastava"),
	npx: chalk.red("npx") + " " + chalk.white("ank1t"),

    labelWork: chalk.white.bold("Work:"),
    labelHackerRank: chalk.white.bold("HackerRank:"),
    labelCodeChef: chalk.white.bold("CodeChef:"),
    labelGitHub: chalk.white.bold("GitHub:"),
    labelLinkedIn: chalk.white.bold("LinkedIn:"),
    labelInsta: chalk.white.bold("Instagram:"),
    labelCard: chalk.white.bold("Card:") 
};

const me = boxen(
    [
        `${data.name}`,
        ``,
        `${data.labelWork}  ${data.work}`,
        ``,
        `${data.labelHackerRank}  ${data.hackerrank}`,
 		`${data.labelCodeChef}  ${data.codechef}`,       
        `${data.labelGitHub}  ${data.github}`,
        `${data.labelLinkedIn}  ${data.linkedin}`,
        `${data.labelInsta}  ${data.Instagram}`,
        ``,
        `${data.labelCard}  ${data.npx}`,
        ``,
        `${chalk.italic(
            "Enginner, Programmer, Developer, Writer"
        )}`,
        ``,
        `${chalk.italic(
            "Seeking internship in a fast-growing organization so as to hone my skills"
        )}`,
        `${chalk.italic(
            "and attaining excellent standards while meeting organizational needs."
        )}`,
        ``,
        `${chalk.italic(
            "I am currently looking for new opportunities,"
        )}`,
        `${chalk.italic("my inbox is always open. Whether you have a")}`,
        `${chalk.italic(
            "question or just want to say hi, I will try "
        )}`,
        `${chalk.italic(
            "my best to get back to you!"
        )}`
    ].join("\n"),
    {
        margin: 1,
        float: 'center',
        padding: 1,
        borderStyle: 'classic',
        borderColor: "green"
    }
);

console.log(me);
const tip = [
    `Tip: Try ${chalk.cyanBright.bold(
        "cmd/ctrl + click"
    )} on the links above`,
    '',
].join("\n");
console.log(tip);

prompt(questions).then(answer => answer.action());
