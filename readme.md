<div align="center">
  <h1>Zendesk Ticket Exporter</h1>
  
  <p>
    A simple Node.js script to export Zendesk tickets, comments, and attachments via the Zendesk API.
  </p>
  

</div>

<br />

<!-- Table of Contents -->
# :notebook_with_decorative_cover: Table of Contents

- [About the Project](#star2-about-the-project)
  * [Approach](#spiral-notepad-approach)
  * [zendesk APIs](#calling-zendesk-apis)
  * [Environment Variables](#key-environment-variables)
- [Getting Started](#toolbox-getting-started)
  * [Prerequisites](#bangbang-prerequisites)
  * [Run Locally](#running-run-locally)
- [License](#warning-license)
- [Acknowledgements](#gem-acknowledgements)

  

<!-- About the Project -->
## :star2: About the Project

### :spiral_notepad: Approach

The script exports tickets from zendesk incrementally by ticket ID. A basic outline of the operation goes like this:

Starting with the first ticket ID provided perform these steps for each ID incrementing by 1 until the end ticket ID is reached:
1. Export the ticket metadata to `[id].json`
    - If the ticket was not found, move on to the next ticket ID
2. Export the ticket comments to `[id]-comments.json`
    - If there are not attachments in the comments, move on to the next ticket ID
3. Download all attachments to a folder named for the ticket ID
4. Move on to the next ticket ID


<!-- zendesk APIs -->
### :calling: zendesk APIs

#### Authentication

This script uses basic authentication to execute requests to the zendesk API. See the [basic authentication](https://developer.zendesk.com/api-reference/ticketing/introduction/#basic-authentication) or [API token](https://developer.zendesk.com/api-reference/ticketing/introduction/#api-token) documentation for more information.

#### API endpoints

Here are the endpoints used to export the tickets, comments, and attachments:

[Show ticket](https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#show-ticket)  
Loads the information for an individual ticket.  
Options used:
- `include=users`: used to fully identify the participants in the ticket

[List comments](https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_comments/#list-comments)  
Loads the comments for an individual ticket  
Options used:
- `include=users`: used to fully identify the participants in the ticket
- `include_inline_images=true`: used to add the inline images from the ticket comments to the attachments list of each ticket comment.


<!-- Env Variables -->
### :key: Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`ZENDESK_SUBDOMAIN`

`ZENDESK_EMAIL`

`ZENDESK_PASSWORD`

<!-- Getting Started -->
## 	:toolbox: Getting Started

<!-- Prerequisites -->
### :bangbang: Prerequisites

This project uses Node.js (v14+) and the NPM package manager.

<!-- Run Locally -->
### :running: Run Locally

Clone the project

```bash
  git clone https://github.com/brentkeller/zendesk-exporter.git
```

Go to the project directory

```bash
  cd zendesk-exporter
```

Install dependencies

```bash
  npm install
```

Add your settings to a `.env` file

```
ZENDESK_SUBDOMAIN=<zendesk subdomain>
ZENDESK_EMAIL=<agent email>/token
ZENDESK_PASSWORD=<agent api token>
```

Run the script with the start and end ticket IDs

```bash
  node index.js 1 100
```


<!-- License -->
## :warning: License

Distributed under the MIT License. See [LICENSE](/LICENSE) for more information.

<!-- Acknowledgments -->
## :gem: Acknowledgements

 - [Awesome Readme Template](https://github.com/Louis3797/awesome-readme-template)
