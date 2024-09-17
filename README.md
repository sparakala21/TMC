Here's the Markdown document detailing the steps to set up WSL, Git, clone a repository, set up Node.js, and install project dependencies:

---

# Development Setup Guide (WSL, Git, Node.js)

This guide will walk you through setting up WSL, installing Git, cloning the Thunder Mountain Curry (TMC) repository, setting up Node.js, and installing the project dependencies.

## 1. Setting Up WSL

Windows Subsystem for Linux (WSL) allows you to run a Linux distribution alongside Windows. Here’s how to install and configure WSL with Ubuntu.

### Step 1: Enable WSL

Open **PowerShell** as Administrator and run the following command to enable WSL:

```bash
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

### Step 2: Enable Virtual Machine Platform

Run the following command to enable the Virtual Machine Platform, which is required for WSL2:

```bash
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

### Step 3: Restart Your Machine

Restart your computer to apply the changes.

### Step 4: Set WSL2 as the Default Version

Once your machine restarts, open **PowerShell** and run this command to set WSL2 as the default:

```bash
wsl --set-default-version 2
```

### Step 5: Install Ubuntu from the Microsoft Store

1. Open the **Microsoft Store**.
2. Search for "Ubuntu" and install the latest version.
3. After installation, open Ubuntu from the Start menu. Set up a username and password when prompted.

---

## 2. Setting Up Git in WSL

Once WSL and Ubuntu are installed, you can set up Git to manage your repositories.

### Step 1: Install Git

Open your Ubuntu terminal and run the following command to install Git:

```bash
sudo apt update
sudo apt install git
```

### Step 2: Configure Git

After installing Git, set up your Git username and email:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Verify that Git is configured correctly by checking the settings:

```bash
git config --list
```

---

## 3. Cloning the TMC Repository

Now that Git is installed, you can clone the TMC repository from GitHub.

### Step 1: Navigate to the Directory Where You Want to Clone

In your Ubuntu terminal, navigate to the directory where you want to clone the project:

```bash
cd /path/to/your/directory
```

### Step 2: Clone the Repository

Run the following command to clone the TMC repository:

```bash
git clone https://github.com/sparakala21/TMC.git
```

After cloning, navigate into the project directory:

```bash
cd TMC
```

---

## 4. Setting Up Node.js in WSL

You’ll need Node.js to run the TMC project. Use **Node Version Manager (NVM)** to install and manage Node.js versions.

### Step 1: Install NVM

In your Ubuntu terminal, install NVM by running:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
```

Activate NVM in your terminal:

```bash
source ~/.bashrc
```

Verify that NVM is installed:

```bash
nvm --version
```

### Step 2: Install Node.js

Use NVM to install the latest stable version of Node.js:

```bash
nvm install --lts
```

Verify the Node.js installation:

```bash
node -v
npm -v
```

---

## 5. Installing the Project Dependencies

Once Node.js is installed, you need to install the dependencies required for the TMC project.

### Step 1: Navigate to the Project Directory

Ensure you’re inside the TMC project directory:

```bash
cd /path/to/TMC
```

### Step 2: Install the Dependencies

Run the following command to install all project dependencies listed in `package.json`:

```bash
npm install
```

### Step 3: Start the Application

Once the dependencies are installed, start the application:

```bash
npm start
```

This will start the Thunder Mountain Curry (TMC) application locally.

---

### Step 4: set up Open JDK for React
Installation instructions below uses `Open JDK` version. If you want the Official Oracle version see [how to install Official JDK 11](https://www.linuxuprising.com/2019/06/new-oracle-java-11-installer-for-ubuntu.html)

* Install java-8-openjdk in WSL2 (*sudo apt-get install openjdk-11-jre* or use java11 *openjdk-11-jre*)
* Install Android SDK cmdline tools in WSL2, see [here](https://gist.github.com/piouson/c14448ef7ab550b9002163cb97b86676)
* Install nodejs in WSL2, see [here](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl)

### Step 5: Enable access to adb server from WSL2

Set environment variable to access adb server, **WSL_HOST** is ip of **vEthernet (WSL)** interface in windows

```
export WSL_HOST=$(tail -1 /etc/resolv.conf | cut -d' ' -f2)
export ADB_SERVER_SOCKET=tcp:$WSL_HOST:5037
```

### Step 6: Create react native app in WSL2

```
npx react-native init testapp
```

### Step 7: Debug app in Visual Studio Code from WSL2 

Start vs code in WSL2

```
code .
```

and install extensions for VS Code

* Remote - WSL
* React Native Tools

VS Code UI runs in windows and the VS Code Server runs in WSL2, see [here](https://code.visualstudio.com/docs/remote/wsl)

Add a launch configuration in file launch.json with specified `type` and `target`, see [this StackOverFlow Answer](https://stackoverflow.com/questions/51666188/how-to-debug-react-native-apps-in-visual-studio-code#answer-56233781)

### Step 8: Build app in WSL2

Add parameter in file proguard-rules<span>.</span>pro to ignore okhttp3 warnings

```
-dontwarn okhttp3.internal.platform.*
```

Edit npm scripts in `package.json`

- Run `adb devices` to get `<device-name>`

```json
"scripts": {
  "android": "react-native run-android --variant=debug --deviceId <device-name>",
  "start": "react-native start --host 127.0.0.1",
}
```

First, start metro JavaScript bundler (`--host 127.0.0.1` binds bundler to localhost which is forwarded to windows)

```
yarn start
```

Then, build and deploy app to device (`--deviceId <device-name>` specifies target device to deploy to)

```
yarn android
```


You're all set to start developing!

---
