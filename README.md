# Email Writer

This project is an AI-powered email reply generator, consisting of three main components:

- **email-writer-sb**: Spring Boot backend service that generates email replies using the Gemini API.
- **email-writer-react**: React frontend for users to input emails and receive AI-generated replies.
- **email-writer-ext**: Chrome extension that integrates the AI reply feature directly into Gmail.

---

## Project Structure

```
email-writer/
│
├── email-writer-sb/      # Spring Boot backend (Java)
├── email-writer-react/   # React frontend (JavaScript)
└── email-writer-ext/     # Chrome extension (JavaScript)
```

---

## Getting Started

### 1. Backend (Spring Boot)

- Navigate to `email-writer-sb`
- Set your Gemini API credentials in `src/main/resources/application.properties`:
  ```
  gemini.api.url=YOUR_GEMINI_API_URL
  gemini.api.key=YOUR_GEMINI_API_KEY
  ```
- Build and run:
  ```sh
  ./mvnw spring-boot:run
  ```
- The backend will start on `http://localhost:8080`

### 2. Frontend (React)

- Navigate to `email-writer-react`
- Install dependencies:
  ```sh
  npm install
  ```
- Start the development server:
  ```sh
  npm run dev
  ```
- Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Chrome Extension

- Navigate to `email-writer-ext`
- Load the extension in Chrome:
  1. Go to `chrome://extensions/`
  2. Enable "Developer mode"
  3. Click "Load unpacked" and select the `email-writer-ext` folder
- The extension will add an "AI Reply" button to Gmail compose windows.

---

## Usage

- Use the React frontend to generate AI-powered email replies.
- Or, use the Chrome extension to generate replies directly in Gmail.

---

## License

This project is for demonstration purposes.
