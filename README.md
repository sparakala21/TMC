
# TMC Setup Guide

Welcome to Thunder Mountain Curry's development setup guide! Follow these steps to get Node.js and Express up and running on your system.

## Step 1: Install WSL2
WSL2 stands for windows subsystem for linux
- [WSL Documentation](https://learn.microsoft.com/en-us/windows/wsl/install)


## Step 1: Install cURL
cURL is required to download the Node Version Manager (NVM), which helps in managing different Node.js versions.

\`\`\`bash
sudo apt-get install curl
\`\`\`

## Step 2: Install NVM (Node Version Manager)
NVM allows you to easily install and manage multiple versions of Node.js. Run the following command to install NVM:

\`\`\`bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
\`\`\`

After installation, confirm that NVM is installed correctly:

\`\`\`bash
command -v nvm
\`\`\`

You should see \`nvm\` as the output, confirming NVM is ready to use.

## Step 3: Install Node.js
Next, install the latest stable version of Node.js using NVM:

\`\`\`bash
nvm install --lts
\`\`\`

You can check the installed version with:

\`\`\`bash
nvm ls
\`\`\`

If you need a specific version, you can install it like so:

\`\`\`bash
nvm install <version>
\`\`\`

For example, if the TMC app requires a particular version, replace \`<version>\` with the required version number.

## Step 4: Install the Latest Node.js Version
To ensure you have the latest version of Node.js, use:

\`\`\`bash
nvm install node
\`\`\`

This installs the latest available version of Node.js.

## Step 5: Install Project Dependencies
With Node.js installed, navigate to the project directory and install the required dependencies:

\`\`\`bash
cd path/to/tmc-app
npm install
\`\`\`

This will pull all necessary packages defined in \`package.json\`.

## Step 6: Start the Application
Once the dependencies are installed, you can start the app using:

\`\`\`bash
npm start
\`\`\`

This will launch the Thunder Mountain Curry app locally.

---

### Troubleshooting Tips:
- If you encounter permission issues, try running commands with \`sudo\`.
- Verify Node.js installation with \`node -v\` to ensure it's installed correctly.
- Use \`nvm ls\` to check if multiple versions of Node.js are installed.

### Useful Links:
- [NVM Documentation](https://github.com/nvm-sh/nvm)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express Documentation](https://expressjs.com/)

Now you're ready to start working on Thunder Mountain Curry! Happy coding!
