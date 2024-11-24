import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const extensionName = "Console Remover";
  vscode.window.showInformationMessage(
    `Congratulations, your extension ${extensionName} is now active!`
  );

  // creating a button
  const statusBarButton = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    10
  );

  statusBarButton.text = `$(zap) ${extensionName}`;
  statusBarButton.tooltip = "Click to remove console logs";
  statusBarButton.command = "console-remover.removeLogs";
  statusBarButton.backgroundColor = new vscode.ThemeColor(
    "consoleRemover.statusBarBackground"
  );
  statusBarButton.color = new vscode.ThemeColor(
    "consoleRemover.statusBarForeground"
  );

  statusBarButton.show();

  // functions
  const removeConsoleLogs = async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return vscode.window.showInformationMessage(
        "Please open an editor to proceed"
      );
    }
    const document = editor.document;
    const documentText = document.getText();
    let cleanedCode = documentText.replace(
      /console\.(log|table|dir|error|warn|info|debug)\(.*?\);?/g,
      "// Console method removed"
    );

    const edit = new vscode.WorkspaceEdit();
    const range = new vscode.Range(0, 0, document.lineCount, 0);
    edit.replace(document.uri, range, cleanedCode);
    try {
      await vscode.workspace.applyEdit(edit); // Attempt to apply the edit
      document.save();
      vscode.window.showInformationMessage("Console Removed Successfully!");
    } catch (error) {
      vscode.window.showErrorMessage("Error In Removing Console Statements");
    }
  };

  const aboutDeveloper = () => {
    const profile = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sahil Sharma - Full Stack Developer</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #1E1E1E;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      letter-spacing:1px;
      font-family: Arial, Helvetica, sans-serif;
    }

    .container {
      display: flex;
      align-items: center; /* Vertically align the image and content */
      justify-content: center;
      max-width: 1200px;
      padding: 20px;
      gap: 4rem;
    }

    .profile-image {
      border-radius: 50%; /* Circular image */
      width: 300px;
      height: 300px;
      object-fit: cover;
      border: 4px solid #FF007F;
    }

    .content {
      flex: 1;
    }

    h1 {
      font-size: 2.5rem;
      color: #FF007F;
      margin-bottom: 10px;
    }

    h2 {
      font-size: 1.8rem;
      color: #FF007F;
      margin-bottom: 15px;
    }

    p {
      font-size: 1.3rem;
      color: #ccc;
      margin-bottom: 20px;
      letter-spacing:1px;
      
    }

    ul {
      font-size: 1.2rem;
      list-style: none;
      padding: 0;
    }

    ul li {
      margin-bottom: 10px;
      color: #ddd;
      font-size: 1.2rem;

    }

    a {
      text-decoration: none;
      color: #FF007F;
      font-size: 1.2rem;
    }

    a:hover {
      color: #fff;
    }

    footer {
      margin-top: 20px;
    }

    .social-links {
      display: flex;
      gap: 15px; /* Spacing between icons */
      margin-top: 20px;
    }

    .social-links a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: #FF007F;
      font-size: 1.2rem;
      border: 2px solid transparent;
      padding: 5px 10px;
      border-radius: 5px;
      transition: border-color 0.3s ease, color 0.3s ease;
    }

    .social-links a:hover {
      border-color: #FF007F;
      color: #fff;
    }
  </style>
</head>
<body>
  <div class="container">

    <div class="content">
      <h1>Sahil Sharma</h1>
     
      <p>
     I’m a software developer with experience in delivering high-quality solutions and consistently exceeding client expectations. With expertise in multiple programming languages and frameworks, I’m dedicated to continuous learning and staying updated with the latest technologies. I have a proven track record of delivering complex projects on time. My focus is on delivering exceptional results through scalable and efficient solutions, ensuring that projects are completed on time and meet business goals.
      </p>
      <h2>Tech Skills</h2>
      <ul>
        <li><strong>Programming Languages:</strong> JavaScript, Python, Kotlin, HTML, CSS, SASS, Tailwind</li>
        <li><strong>Frameworks and Libraries:</strong> Next.js, ReactJS, ExpressJS, NodeJS, Shadcn UI, Mantine UI</li>
        <li><strong>Development Tools:</strong> Docker, Postman API, Mongoose, Prisma, Git, GitHub, Playwright, BeautifulSoup</li>
        <li><strong>Databases:</strong> MongoDB, PostgreSQL</li>
        <li><strong>Other Skills:</strong> Chrome Extension Development, Web Automation, Web Scraping</li>
      </ul>
      <h2>Connect with Me</h2>
      <div class="social-links">
        <a href="https://www.github.com/sahil75831" target="_blank">GitHub</a>
        <a href="https://www.linkedin.com/in/sahil-sharma-ss9043283" target="_blank">LinkedIn</a>
        <a href="https://medium.com/@sahilsharma_SoftwareDeveloper" target="_blank">Medium</a>
      </div>
    </div>
  </div>
</body>
</html>
`;
    console.log(profile);

    return profile;
  };

  const disposable = vscode.commands.registerCommand(
    `console-remover.removeLogs`,
    async () => {
      const items: vscode.QuickPickItem[] = [
        {
          label: "Sweep",
          description: "Remove Console From The Active Editor",
        },
        {
          label: "About Developer",
          description: "Get To Know About The Developer",
        },
      ];

      vscode.window
        .showQuickPick(items, {
          placeHolder: "Select an option",
        })
        .then((selectedOption) => {
          if (selectedOption) {
            vscode.window.showInformationMessage(
              `Selected Option : ${selectedOption.label}`
            );
            switch (selectedOption.label) {
              case "Sweep":
                removeConsoleLogs();
                break;

              case "About Developer":
                const profilePanel = vscode.window.createWebviewPanel(
                  "aboutDeveloper",
                  "About Developer",
                  vscode.ViewColumn.One,
                  {}
                );
                profilePanel.webview.html = aboutDeveloper();
                break;

              default:
                vscode.window.showInformationMessage("No option selected");
                break;
            }
          }
        });
    }
  );
  // Add to subscriptions for cleanup
  context.subscriptions.push(disposable);
}

export function deactivate() {}
