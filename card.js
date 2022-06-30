#!/usr/bin/env node
'use strict'
const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");
const fs = require('fs');
const request = require('request');
const path = require('path');
const ora = require('ora');
const cliSpinners = require('cli-spinners');
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
                    let pipe = request('https://ankit.cuchapter.tech/resume.pdf').pipe(fs.createWriteStream('./resume.pdf'));
                    pipe.on("finish", function () {
                        let downloadPath = path.join(process.cwd(), 'resume.pdf')
                        console.log(`\nResume Downloaded at ${downloadPath} \n`);
                        open(downloadPath)
                        loader.stop();
                    });
                }
            },
            {
                name: `Schedule a ${chalk.redBright.bold("Meeting")}?`,
                value: () => {
                    open('https://booking.setmore.com/scheduleappointment/3648dafa-a45e-45f7-aeb9-b6862481b7b0');
                    console.log("\n See you at the meeting \n");
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
	work: `${chalk.white("SDET at")} ${chalk.hex("#2b82b2").bold("HackerEarth")}`,
	hackerrank: chalk.gray("https://www.hackerrank.com/coderboy_/") + chalk.keyword('green')("coderboy_"),
	codechef: chalk.gray("https://codechef.com/users/") + chalk.keyword('red')("honesthacker"),
	github: chalk.gray("https://github.com/") + chalk.green("ank1traj"),
	linkedin: chalk.gray("https://linkedin.com/in/") + chalk.blue("ank1traj"),
	Instagram: chalk.white("https://instagram.com/") + chalk.keyword('pink')("silent___notes"),
	npx: chalk.red("npx") + " " + chalk.white("coderboy"),

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
            "A 22 Y/O Software🌈 and Web developer🎯 from India who loves to build, "
        )}`,
        `${chalk.italic(
            "deploy & maintain things for the ☁️ and specializes in building"
        )}`,
        `${chalk.italic(
            "(and occasionally designing) exceptional digital experiences."
        )}`,
        `${chalk.italic(
            " Meticulous and motivated graduate student indulged in competitive programming."
        )}`,
        
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
