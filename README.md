# ChatGPT Prompt Enhancer

A browser extension that helps improve your ChatGPT prompts with the click of a button.

## What This Tool Does

The ChatGPT Prompt Enhancer adds an "Enhance" button directly to the ChatGPT interface. When you click this button, your prompt is sent to an AI that specializes in improving prompts, and then the enhanced version replaces your original text. This helps you get better, more detailed responses from ChatGPT.

## Benefits

- Makes your ChatGPT prompts clearer and more effective
- Adds helpful details that get better results
- Works right inside the ChatGPT interface
- Simple one-click operation

## Installation Guide

### Step 1: Get the Code

1. Click the green "Code" button at the top of this page
2. Select "Download ZIP"
3. Once downloaded, unzip the file to a folder on your computer

### Step 2: Get an OpenAI API Key

You need an API key from OpenAI to use this extension:

1. Go to [OpenAI's website](https://platform.openai.com/signup)
2. Create an account or sign in if you already have one
3. Go to the [API Keys page](https://platform.openai.com/api-keys)
4. Click "Create new secret key"
5. Give your key a name (like "Prompt Enhancer") and click "Create"
6. **Important**: Copy your key and save it somewhere safe. You won't be able to see it again!

### Step 3: Set Up the Project

1. Open Terminal (Mac) or Command Prompt (Windows)
2. Navigate to the folder where you unzipped the files:
   ```
   cd path/to/your/folder
   ```
3. Install the required packages:
   ```
   npm install
   ```
4. Create a file named `.env.local` in the main folder with your API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
   (Replace "your_api_key_here" with the API key you copied earlier)

### Step 4: Test Locally

1. Start the development server:
   ```
   npm run dev
   ```
2. The server should start and be available at http://localhost:3000

### Step 5: Install the Chrome Extension

1. Open the Chrome browser
2. Go to chrome://extensions/
3. Turn on "Developer mode" (toggle in the top-right corner)
4. Click "Load unpacked"
5. Navigate to the folder where you unzipped the files, then select the "extension" folder
6. The extension should now appear in your list of extensions

### Step 6: Update the Extension API Endpoint (For Deployment)

The extension is currently set to use your local server (http://localhost:3000). If you deploy to Vercel (see below), you'll need to update the endpoint:

1. Open the file `extension/contentScript.js` in a text editor
2. Find this line: `const res = await fetch('http://localhost:3000/api/enhance', {`
3. Replace the URL with your Vercel deployment URL, like: `const res = await fetch('https://your-project.vercel.app/api/enhance', {`
4. Save the file
5. Go back to chrome://extensions/ and click the refresh icon on your extension

### Step 7: Use the Extension

1. Go to [ChatGPT](https://chat.openai.com/)
2. Type a prompt in the chat box
3. Look for the "Enhance" button that appears near the send button
4. Click "Enhance" to improve your prompt
5. The enhanced prompt will replace your original text
6. Send the improved prompt to ChatGPT

## Deploying to Vercel

To make your enhancer accessible from anywhere (not just your computer):

1. Create a [Vercel account](https://vercel.com/signup) if you don't have one
2. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```
3. Log in to Vercel from the command line:
   ```
   vercel login
   ```
4. Deploy your project:
   ```
   vercel
   ```
5. When prompted, answer the questions. Make sure to add your OpenAI API key as an environment variable.
6. Once deployed, Vercel will give you a URL for your project
7. Remember to update your extension with this URL as explained in Step 6 above

## Troubleshooting

**The Enhance button doesn't appear:**
- Make sure you're on the ChatGPT website
- Try refreshing the page
- Check if the extension is enabled in chrome://extensions/

**The button appears but doesn't work:**
- Check your API key in the `.env.local` file
- Make sure your local server is running (if testing locally)
- Check if your Vercel deployment is working (if using Vercel)
- Make sure you've updated the API endpoint in the extension (if using Vercel)

**Error messages:**
- If you see "Failed to enhance prompt", check your API key and internet connection

## Privacy Note

This extension sends your prompts to OpenAI's API. Please don't include sensitive personal information in your prompts.

## About the Creator

This ChatGPT Prompt Enhancer was created by [Preyash Shah](https://www.preyash.com/), a product manager and builder based in Lyon, France. Originally from Mumbai, Preyash specializes in launching and scaling SaaS and API products, currently focused on building the next generation of biopharma partnering tools at Inpart.io.

Passionate about turning insights into real solutions, Preyash enjoys blending business strategy, design, and engineering to create products that matter. When not building products professionally, he explores product design and development through side projects like this one.

## Support This Project

If this tool has helped improve your ChatGPT experience, consider supporting its development:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/preyash)

Your support helps maintain and improve this tool for everyone!


