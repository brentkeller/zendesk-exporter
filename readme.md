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
  * [Environment Variables](#key-environment-variables)
- [Getting Started](#toolbox-getting-started)
  * [Prerequisites](#bangbang-prerequisites)
  * [Run Locally](#running-run-locally)
- [License](#warning-license)
- [Acknowledgements](#gem-acknowledgements)

  

<!-- About the Project -->
## :star2: About the Project

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
