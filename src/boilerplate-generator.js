#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { input, select, Separator } = require("@inquirer/prompts");

const prompt = async () => {
    const projectName = await input({
        message: "Project name:",
        validate: function (input) {
            if (/^([A-Za-z\-\_\d\.])+$/.test(input)) return true;
            else
                return "Project name may only include letters, numbers, underscores and hashes.";
        },
        default: "my-vite-project",
    });
    const projectStyle = await select({
        message: "Select a package manager",
        choices: [
            {
                name: "React-Shadcn UI",
                value: "defaultStructure.js",
                description: "React, Vite, Shadcn UI, Tailwind CSS, TypeScript",
            },
            {
                name: "Coming soon",
                value: "comingSoon",
                description: "Coming soon",
            },
            new Separator(),
        ],
        default: "defaultStructure",
    });

    if (projectStyle === "comingSoon") {
        console.log("Coming soon, thank you for your patience!");
        return;
    }

    const structurePath = `${__dirname}/structures/${projectStyle}`;

    generateProject(projectName, require(structurePath));

    console.log(`🥳 generate project into ${projectName} 💻`);
};

prompt().catch((error) => {
    console.error("An unexpected error occurred:", error.message);
    process.exit(1);
});

const createProject = (name) => {
    // Function to generate a random 4-character string
    const generateRandomString = () => {
        return Math.random().toString(36).substring(2, 6);
    };

    // Function to check if a directory exists
    const directoryExists = (directoryPath) => {
        return (
            fs.existsSync(directoryPath) &&
            fs.lstatSync(directoryPath).isDirectory()
        );
    };

    // Get the project name from command line arguments or default to 'my-vite-project'
    let projectName = name;

    // If the project directory already exists, generate a new name with a 4-character suffix
    while (directoryExists(path.join(process.cwd(), projectName))) {
        projectName = `${projectName}-${generateRandomString()}`;
    }

    // Create Vite project using Yarn with React and TypeScript template
    runCommand(`npm create vite@latest ${projectName} -- --template react-swc-ts`);

    // Navigate into the project directory
    process.chdir(projectName);
};

// Function to edit tsconfig.node.json
const editTsConfig = (configFile) => {
    const tsConfigPath = path.join(process.cwd(), configFile);
    try {
        let tsConfig = fs.readFileSync(tsConfigPath, "utf-8");

        // Remove comments (single-line and multi-line)
        tsConfig = tsConfig.replace(/\/\/.*?\n/g, ""); // Remove single-line comments
        tsConfig = tsConfig.replace(/\/\*[\s\S]*?\*\//g, ""); // Remove multi-line comments

        // Remove BOM if present
        tsConfig = tsConfig.replace(/^\uFEFF/, "");

        tsConfig = JSON.parse(tsConfig); // Parse JSON content

        if (!tsConfig.compilerOptions) {
            tsConfig.compilerOptions = {};
        }

        tsConfig.compilerOptions.baseUrl = ".";
        tsConfig.compilerOptions.paths = {
            "@/*": ["./src/*"],
            "src/*": ["./src/*"],
        };

        if (configFile === "tsconfig.app.json") {
            tsConfig.compilerOptions.noUnusedLocals = false;
            tsConfig.compilerOptions.noUnusedParameters = false;
        }

        updateContent(tsConfigPath, JSON.stringify(tsConfig, null, 2));
        console.log(`${configFile} updated successfully!`);
    } catch (error) {
        console.error(`Error editing ${configFile}:`, error.message);
        process.exit(1);
    }
};

// Function to edit vite.config.ts file
const editViteConfig = () => {
    const viteConfigPath = path.join(process.cwd(), "vite.config.ts");
    try {
        let viteConfig = fs.readFileSync(viteConfigPath, "utf-8");

        // Add import statement for 'path' at the top
        const importPath = 'import path from "path"';
        if (!viteConfig.includes(importPath)) {
            viteConfig = importPath + "\n" + viteConfig;
        }

        // Define the resolve alias configuration
        const resolveConfig = `resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
                src: path.resolve(__dirname, './src'),
            },
        },
  build: {
    sourcemap: true, // Enable source map generation
  },`;

        // Find the position to insert the resolve config inside defineConfig
        const defineConfigIndex = viteConfig.indexOf("defineConfig({");
        if (defineConfigIndex !== -1) {
            const insertPosition = viteConfig.indexOf(
                "plugins: [react()],",
                defineConfigIndex
            );
            if (insertPosition !== -1) {
                const endPosition = viteConfig.indexOf("}", insertPosition);
                viteConfig =
                    viteConfig.slice(0, endPosition) +
                    resolveConfig +
                    viteConfig.slice(endPosition);
            }
        }

        updateContent(viteConfigPath, viteConfig);
        console.log("vite.config.ts updated successfully!");
    } catch (error) {
        console.error("Error editing vite.config.ts:", error.message);
        process.exit(1);
    }
};

// add more rules to .eslintrc.cjs
const addMoreRulesToEslint = () => {
    const eslintConfigPath = path.join(process.cwd(), ".eslintrc.cjs");
    try {
        let eslintConfig = fs.readFileSync(eslintConfigPath, "utf-8");
        eslintConfig = eslintConfig.replace(/^\uFEFF/, ""); // Remove BOM if present

        let configModule = {};
        eval("configModule = " + eslintConfig); // Unsafe in general, but necessary for CommonJS config

        if (!configModule.rules) {
            configModule.rules = {};
        }

        // Add or update ESLint rules
        configModule.rules["no-unused-vars"] = "warn";
        configModule.rules["@typescript-eslint/no-unused-vars"] = "warn";

        const updatedConfig =
            "module.exports = " + JSON.stringify(configModule, null, 2);
        updateContent(eslintConfigPath, updatedConfig);
        console.log(".eslintrc.cjs updated successfully!");
    } catch (error) {
        console.error(`Error editing .eslintrc.cjs:`, error.message);
        process.exit(1);
    }
};

// Function to execute a shell command and handle errors
const runCommand = (command) => {
    try {
        execSync(command, { stdio: "inherit" });
    } catch (error) {
        console.error(`Error executing command: ${command}`, error.message);
        process.exit(1);
    }
};

const updateContent = (pathFile, data) => {
    try {
        fs.writeFileSync(pathFile, data);
        console.log(`${pathFile} updated successfully!`);
    } catch (error) {
        console.error(`Error updating ${pathFile}:`, error.message);
        process.exit(1);
    }
};

const createFolder = (folderPath) => {
    try {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
    } catch (error) {
        console.error(`Error creating ${folderPath}:`, error.message);
        process.exit(1);
    }
};

const createStructure = (basePath, structure) => {
    for (const [key, value] of Object.entries(structure)) {
        const fullPath = path.join(basePath, key);

        if (typeof value === "string") {
            // Create file with specified content
            updateContent(fullPath, value);
        } else {
            // Create directory
            createFolder(fullPath);
            // Recursively create sub-structure
            createStructure(fullPath, value);
        }
    }
};

const removeUnnecessaryFiles = (basePath, filesToRemove) => {
    filesToRemove.forEach((file) => {
        const filePath = path.join(basePath, file);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`${file} removed successfully!`);
        }
    });
};

const installDependencies = () => {
    runCommand("yarn install");
    runCommand(
        "yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest prettier@latest @types/node react-icons@latest @types/js-cookie@latest @types/lodash@latest"
    );
    runCommand(
        "yarn add react-router-dom@latest react-icons@latest axios@latest lodash@latest js-cookie@latest"
    );
};

const initLibrary = () => {
    runCommand("npx tailwindcss init -p");

    // Install Shadcn UI
    runCommand("npx shadcn-ui@latest init -d");

    // Add button component
    runCommand(
        "npx shadcn-ui@latest add button card input label badge breadcrumb dropdown-menu sheet table tabs tooltip select textarea toggle-group avatar separator chart"
    );
};

const initStructure = (structure) => {
    createStructure(process.cwd(), structure);
    removeUnnecessaryFiles(process.cwd(), [
        "src/App.css",
        "src/index.css",
        "src/assets/react.svg",
    ]);
};

const updateContentFile = () => {
    // add .env* in .gitignore
    fs.appendFileSync(path.join(process.cwd(), ".gitignore"), "\n.env*\n");
};

// Main function to create the Vite project and perform necessary setup
const generateProject = (projectName, structure) => {
    try {
        createProject(projectName);

        editTsConfig("tsconfig.node.json");
        editTsConfig("tsconfig.app.json");
        editViteConfig();
        addMoreRulesToEslint();

        initStructure(structure);

        // Install dependencies
        installDependencies();

        // Init library
        initLibrary();

        updateContentFile();

        console.log("Vite project created successfully!");

        // Optional: Start the development server
        console.log("Starting the development server...");
        runCommand("yarn dev");

        console.log(
            "Development server is running! Access it at http://localhost:5173"
        );
    } catch (error) {
        console.error("An unexpected error occurred:", error.message);
        process.exit(1);
    }
};
