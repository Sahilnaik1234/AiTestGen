# AI Test Generation Pipeline

## 🚀 How it works
1. **Baseline**: CI runs existing tests in `examples/`.
2. **AI Action**: If coverage is below **75%**, the AI (Groq/Gemini) generates missing tests.
3. **Commit**: The new tests are committed back to your branch (`dev`).
4. **Verification**: CI reruns everything to verify the new coverage score.
5. **Fail/Pass**: If it's still below 75%, it fails the build.

## 📊 Visual Dashboard
The results are visualized in a React dashboard deployed to **GitHub Pages**.

### 🔗 URL
`https://<GITHUB_USERNAME>.github.io/AiTestGen/`

*(Replace `<GITHUB_USERNAME>` with your GitHub username, e.g., `Sahilnaik1234`)*

### 🔍 What you can see:
- Path to covered files.
- Original source code.
- **AI-Generated Test Cases** side-by-side.
- Real-time coverage percentages.

## 🛠️ Local CLI
You can also run the tool locally:
```bash
npm start -- coverage --threshold 75 --model groq
```
