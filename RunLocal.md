Hi, Unfortunately Vercel does not support websockets because of its serverless functionality and I have tried many other deployment options and all were paid and hence I could not use them
<br>
I request you to kindly run this project locally to examine and test the service
<br>
<h1>How to run the project Locally</h1>
<br>
• Go to /backend and run npm install<br>
• Got to /frontend and run npm install<br>
• Go to /frontend/src/Student/QuestionsDisplay.tsx and uncomment line number 69 and comment line number 68<br>
• Go to /frontend/src/Teacher/AddQuestion/WriteQuestion.tsx and uncomment line number 85 and comment line number 84 <br>
• Go to /frontend/src/socket.ts and uncomment line number 5 and comment line number 6
<br>
• Open terminal for frontend and one for backend folder run npm run dev on both