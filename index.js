import 'dotenv/config';
import fetch from 'node-fetch';
import * as path from 'path';
import fse from 'fs-extra';
import download from 'download';


/*
Set up:
Some settings for your zendesk environment and agent account are needed to access the Zendesk API.
Create a file in this directory called '.env'
Add these lines:

ZENDESK_SUBDOMAIN=<your zendesk subdomain>
ZENDESK_EMAIL=<agent email address>/token
ZENDESK_PASSWORD=<agent api token>

Usage:
node index.js [start ticket ID] [end ticket ID]

The script will try to export each ticket between the start and end IDs.
The ticket will be saved as a JSON file named for the ticket ID.
Another JSON file will be saved with the ticket's comments.
If the comments include any attachments or inline images, those will be saved in a folder with the ticket ID.

*/

// ignore first 2 arguments
// https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
const myArgs = process.argv.slice(2);
let startTicket = parseInt(myArgs[0]);
let endTicket = parseInt(myArgs[1]);

const settings = ['ZENDESK_SUBDOMAIN','ZENDESK_EMAIL','ZENDESK_PASSWORD']; 
let settingMissing = false;

settings.forEach(setting => {
  if (process.env[setting] == null) {
    console.log(`setting '${setting}' is missing, add it to the .env file`);
    settingMissing = true;
  }
});

const urlBase = `https://${process.env.ZENDESK_SUBDOMAIN}.zendesk.com/api/v2`;
// if using a zendesk API token you need to append "/token" to the email (e.g. "user@example.com/token")
const authValue = Buffer.from(`${process.env.ZENDESK_EMAIL}:${process.env.ZENDESK_PASSWORD}`).toString('base64');
const authHeader = `Basic ${authValue}`;

// Add a delay after each ticket to avoid rate limiting
// const delayMs = 0;
const delayMs = 300;

async function getTicket(id) {
  console.log(`Exporting ticket #${id}`);
  let ticket = await downloadJson(`${urlBase}/tickets/${id}.json?include=users`, `${id}.json`);
  // console.log(ticket.ticket.id);
  let comments = await downloadJson(`${urlBase}/tickets/${id}/comments.json?include=users&include_inline_images=true`, `${id}-comments.json`);
  // console.log(comments.comments.length);
  // Get attachments from comments
  const attachments = comments.comments?.flatMap(d => d.attachments.map(a => a.content_url).filter(a => a != null));
  // console.log(JSON.stringify(attachments));
  if (attachments && attachments.length > 0) {
    await fse.ensureDir(path.join('tickets', id.toString()));
    await Promise.all(attachments.map(url => {
      const matches = /.*\/token\/(.*)\/\?name=(.*)/gi.exec(url);
      if (!matches) return Promise.resolve();
      const filename = `${matches[1]}-${matches[2]}`;
      return download(url, path.join('tickets', id.toString()), { filename });
   }));
  }
}

async function downloadJson(url, filename) {
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Authorization': authHeader },
  });
  const data = await response.json();
  await writeJsonToFile(path.join('tickets', filename), data);
  return data;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function start() {
  const startDate = new Date();
  await fse.ensureDir(path.join('tickets'));

  console.log(`Exporting tickets ${startTicket}-${endTicket}...`);
  let currentTicket = startTicket;
  while (currentTicket <= endTicket) {
    await getTicket(currentTicket);
    if (delayMs > 0 && currentTicket != endTicket){
      console.log(`${new Date().toLocaleTimeString()} - waiting ${delayMs}ms `);
      await delay(delayMs);
    }
    currentTicket++;
  }
  console.log(`Done!`)
  console.log(`Started:  ${startDate.toTimeString()}`);
  console.log(`Finished: ${new Date().toTimeString()}`);
}

if (!settingMissing) start();

async function writeJsonToFile(filepath, data) {
  await fse.writeJSON(filepath, data, { spaces: 2 });
};
