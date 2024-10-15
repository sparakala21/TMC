
# Development Setup Guide (WSL, Git, Node.js, React)

This guide will walk you through setting up WSL, installing Git, cloning the Thunder Mountain Curry (TMC) repository, setting up Node.js, and installing the project dependencies.








## 3. Cloning the TMC Repository

Now that Git is installed, you can clone the TMC repository from GitHub.

### Step 1: Navigate to the Directory Where You Want to Clone

In your Ubuntu terminal, navigate to the directory where you want to clone the project:

```bash
cd ~
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



# Running the Backend tests

## 1. Model Tests

run the command ```node.model_test.js``` from the BackEnd folder

## 2. MongoFunction Tests

Make sure you have the .env file with ```ATLAS_URI``` set and also have ```DATABASE = 'tmc_uat'``` 
Note: the database must be set to 'tmc_uat' in order to run the test

In the BackEnd folder run ```node mongo_functions.js``` to start the server. Then from another terminal run ```node mongo_test_functions.js ```