# AI MYSTERY ROOM
## Product Specification & Technical Blueprint
**Document Type:** Software Requirements Specification (SRS) + Single Source of Truth (SSOT)  
**Project Name:** AI Mystery Room  
**Version:** 1.0  
**Status:** Initial Development Specification  
**Architecture:** MERN Stack + Google Gemini AI

---

# 1. PROJECT OVERVIEW

## 1.1 Project Description

AI Mystery Room is an AI-powered interactive detective investigation platform where users become investigators and solve fictional mystery cases generated dynamically using Artificial Intelligence.

The user begins by providing a short story, scenario, or mystery premise. Based on this input, the AI generates a complete fictional investigation containing:

- A mystery scenario.
- A list of suspects.
- One actual culprit.
- Motives and possible reasons.
- Evidence and investigation records.
- Contradictory statements.
- Hidden clues.
- A final solution and explanation.

The application presents the investigation to the user through an interactive detective interface.

Users investigate the case by examining different pieces of evidence, including fictional WhatsApp conversations, photographs, CCTV recordings, witness statements, and other investigation documents.

After examining the available evidence, the user must identify the culprit and submit their final accusation.

The application then evaluates the user's decision and reveals the actual culprit along with a detailed explanation of how the evidence connects to the solution.

## 1.2 Core Concept

**User provides a story → AI creates a mystery → User investigates evidence → User identifies the culprit → AI reveals the solution.**

The experience should feel like investigating a real fictional crime case rather than interacting with a normal chatbot.

## 1.3 Project Goals

1. Generate unique mystery investigations from user-provided scenarios.
2. Create believable fictional evidence using AI.
3. Provide an interactive investigation experience.
4. Ensure every case has exactly one predetermined culprit.
5. Make evidence logically consistent with the actual solution.
6. Encourage critical thinking and logical reasoning.
7. Provide an engaging detective-themed user interface.
8. Allow users to replay investigations and explore different scenarios.

---

# 2. TARGET USERS

The application is intended for:

- Mystery and detective story enthusiasts.
- Students interested in logical reasoning.
- Puzzle and investigation game players.
- Users looking for interactive AI-generated entertainment.

## 2.1 User Roles

### Guest User
- Access the landing page.
- Create a mystery investigation.
- Play a mystery case.
- View the final result.

### Registered User (Future Feature)
- Save completed investigations.
- Access investigation history.
- Track scores.
- Continue unfinished investigations.
- View achievements.

**MVP Decision:** Authentication is not mandatory. The first version should work without requiring registration.

---

# 3. TECHNOLOGY STACK

## 3.1 Frontend

| Technology | Purpose |
|---|---|
| React.js | Frontend application |
| Vite | Development and build tooling |
| Tailwind CSS | Styling |
| React Router | Navigation |
| Axios | API communication |
| Lucide React | Icons |
| Framer Motion | Animations |
| Context API | Global application state |

## 3.2 Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | REST API |
| MongoDB | Database |
| Mongoose | Database modeling |
| Gemini API | Mystery and evidence generation |
| Multer | File upload handling, if needed |

## 3.3 Artificial Intelligence

**AI Provider:** Google Gemini

Gemini will handle:

1. Scenario interpretation.
2. Mystery generation.
3. Suspect creation.
4. Motive generation.
5. Evidence generation.
6. Witness statements.
7. Logical clue generation.
8. Contradiction generation.
9. Solution explanation.
10. Optional hints.

The AI must generate structured JSON rather than unstructured conversational responses.

The backend must validate all AI-generated output before storing or displaying it.

## 3.4 Development Tools

- Visual Studio Code
- Git and GitHub
- Postman
- MongoDB Atlas or local MongoDB
- Google AI Studio / Gemini API
- Codex for AI-assisted development

---

# 4. APPLICATION WORKFLOW

## 4.1 Complete User Journey

### Step 1: Landing Page

The user enters the AI Mystery Room website.

The landing page should introduce the platform and provide a prominent button:

**ENTER THE MYSTERY ROOM**

Additional sections:
- How It Works
- Features
- Start Investigating

### Step 2: Create Mystery

The user enters a scenario or story.

Example:

"Five friends attended a birthday party at a private mansion. At midnight, the host's expensive diamond necklace disappeared. Everyone claims they were in different rooms. Find out who stole the necklace."

The user clicks:

**GENERATE MYSTERY**

Optional configuration:
- Difficulty: Easy / Medium / Hard
- Number of suspects: 3–6
- Investigation type: Theft / Disappearance / Cyber Mystery / General Mystery

The AI uses these inputs to create the investigation.

### Step 3: AI Mystery Generation

The backend sends the scenario and configuration to Gemini.

Gemini generates:

- Case title.
- Case description.
- Incident timeline.
- Suspect profiles.
- Actual culprit.
- Motives.
- Alibis.
- Evidence.
- Hidden clues.
- Final explanation.

The backend validates the response and saves the case in MongoDB.

The user is redirected to the investigation room.

### Step 4: Investigation Room

This is the primary application experience.

The user sees a detective-themed dashboard containing:

**A. Case Overview**
- Case name.
- Case ID.
- Incident description.
- Location.
- Date and time.
- Investigation status.

**B. Suspects**
- Suspect photographs or AI-generated avatars.
- Name.
- Age (fictional).
- Occupation.
- Relationship to the incident.
- Initial statement.

**C. Evidence Room**

All generated evidence is displayed in separate categories.

1. WhatsApp Messages
2. Photographic Evidence
3. CCTV Recordings
4. Witness Statements
5. Documents and Reports
6. Other Clues

**D. Investigation Timeline**
- Important events.
- Suspect movements.
- Relevant timestamps.
- Conflicting information.

**E. Case Notes**
- Allow users to write their own observations.
- Notes should remain available during the current investigation.

### Step 5: Evidence Examination

The user clicks individual evidence items to inspect them.

Examples:

**WhatsApp Evidence**
- Conversation between fictional characters.
- Sender and receiver.
- Message timestamps.
- Important suspicious messages.

**Image Evidence**
- AI-generated fictional photographs.
- Crime scene or relevant locations.
- Objects containing hidden clues.

**CCTV Evidence**
- Fictional surveillance recordings or generated visual representations.
- Camera location.
- Timestamp.
- Important events.

**Witness Statements**
- Statements from suspects or witnesses.
- Potential inconsistencies.
- Information that can be compared with other evidence.

Evidence must be interconnected. A clue in one evidence item should be capable of helping the user interpret another.

### Step 6: Final Accusation

Once the user has examined the available evidence, they can select a suspect.

The interface should provide:

**WHO IS THE CULPRIT?**

The user selects one suspect and clicks:

**SUBMIT FINAL ACCUSATION**

Before submission, show a confirmation dialog.

The MVP allows one final accusation per investigation.

### Step 7: Result and Solution

The application compares the selected suspect with the actual culprit stored in the investigation.

If correct:
- Display a success message.
- Reveal the culprit.
- Explain the motive.
- Show the decisive evidence.
- Explain the investigation logic.

If incorrect:
- Display an unsuccessful investigation message.
- Reveal the actual culprit.
- Explain the correct reasoning.
- Show which clues should have been noticed.

Display:
- Selected suspect.
- Actual culprit.
- Investigation outcome.
- Number of evidence items examined.
- Investigation completion time.
- Final explanation.

Provide a button:

**SOLVE ANOTHER MYSTERY**

---

# 5. FUNCTIONAL REQUIREMENTS

## FR-01: Scenario Input

The system must allow users to enter a mystery scenario.

Requirements:
- Multiline text input.
- Input validation.
- Minimum and maximum character limits.
- Generate button.
- Optional difficulty selection.
- Optional suspect count selection.

Suggested limits:
- Minimum: 30 characters.
- Maximum: 2,000 characters.

## FR-02: AI Mystery Generation

The system must use Gemini to generate a complete mystery.

The generated mystery must contain:
- A unique case ID.
- A title.
- A scenario summary.
- Suspects.
- One culprit.
- Motives.
- Alibis.
- Evidence.
- Timeline.
- Hidden clues.
- Final solution.

## FR-03: Suspect Management

Every investigation must contain 3–6 suspects.

Each suspect must have:
- Unique suspect ID.
- Name.
- Fictional profile.
- Occupation.
- Relationship with the incident.
- Motive or possible motive.
- Alibi.
- Initial statement.

At least two suspects should appear reasonably suspicious.

## FR-04: Evidence Generation

Each investigation must have multiple evidence items.

Minimum evidence requirements:
- 1 WhatsApp conversation.
- 1 photographic evidence item.
- 1 CCTV evidence item or CCTV-style visual record.
- 2 witness statements.
- 1 additional document or clue.

The system must support additional evidence types.

Every evidence item must contain:
- Evidence ID.
- Evidence title.
- Evidence type.
- Description.
- Timestamp, where applicable.
- Related suspect IDs.
- Investigation relevance.
- Actual clue or information.

## FR-05: Culprit Selection

The user must be able to select one suspect.

The backend must compare the selected suspect ID with the stored culprit ID.

The actual culprit must never be recalculated during submission.

## FR-06: Solution Reveal

The system must reveal:
- Actual culprit.
- Motive.
- Explanation.
- Important clues.
- Evidence connections.
- Why other suspects were not responsible.

## FR-07: Investigation State

The application must maintain investigation state.

Possible states:
- GENERATING
- ACTIVE
- COMPLETED
- FAILED

---

# 6. AI GENERATION ARCHITECTURE

This section is especially important.

The AI must behave like a mystery author and investigation designer, not like a normal chatbot.

## 6.1 Generation Pipeline

The generation process must follow this order:

1. Read the user-provided scenario.
2. Understand the incident.
3. Create the complete fictional backstory.
4. Create all suspects.
5. Secretly determine exactly one culprit.
6. Define the culprit's motive and actions.
7. Create the actual sequence of events.
8. Generate evidence based on the established sequence.
9. Create misleading but fair clues.
10. Generate witness statements.
11. Create contradictions between statements and evidence.
12. Generate the final investigation solution.
13. Validate logical consistency.
14. Return structured JSON.

**Important:** The culprit and the actual sequence of events must be established BEFORE evidence generation.

The evidence must support the predetermined solution. The AI must never create random evidence first and choose a culprit afterward.

## 6.2 AI Consistency Rules

Gemini must follow these rules:

1. Exactly one actual culprit per investigation.
2. Every suspect must have a unique ID.
3. The culprit must be included in the suspect list.
4. Evidence must not contradict the actual solution accidentally.
5. There must be enough evidence to identify the culprit.
6. At least two clues should help establish the culprit's involvement.
7. Red herrings must be plausible but ultimately explainable.
8. The final solution must explain every major contradiction.
9. All timestamps must follow a coherent timeline.
10. Suspect statements must remain consistent with their established knowledge and actions.
11. Evidence must not directly reveal the culprit through an obvious label.
12. The investigation must have one defensible solution.

## 6.3 Suggested Gemini Output Structure

The backend should request JSON in the following logical structure:

{
  "caseTitle": "The Missing Diamond",
  "caseDescription": "A diamond disappeared during a birthday party.",
  "difficulty": "MEDIUM",
  "incident": {
    "type": "THEFT",
    "location": "Private Mansion",
    "date": "2026-11-18",
    "time": "23:45"
  },
  "suspects": [
    {
      "suspectId": "S001",
      "name": "Alex",
      "occupation": "Business Owner",
      "relationship": "Family Friend",
      "motive": "Financial difficulties",
      "alibi": "Claims to have been in the garden",
      "statement": "I never entered the bedroom."
    }
  ],
  "culpritId": "S002",
  "timeline": [
    {
      "time": "22:30",
      "event": "Guests arrived"
    }
  ],
  "evidence": [
    {
      "evidenceId": "E001",
      "type": "WHATSAPP",
      "title": "Suspicious Conversation",
      "description": "A conversation between two guests.",
      "content": {},
      "relatedSuspectIds": ["S001", "S002"],
      "clueLevel": "IMPORTANT"
    }
  ],
  "solution": {
    "culpritId": "S002",
    "motive": "Financial reasons",
    "explanation": "Detailed explanation of the incident.",
    "decisiveEvidenceIds": ["E001"],
    "suspectEliminations": []
  }
}

This is an illustrative structure. The final implementation should define complete JSON schemas and validation rules for every field and evidence type.

**Critical security requirement:** `culpritId`, `solution`, hidden clues, and internal investigation reasoning must never be included in public API responses before the user submits their final accusation.

## 6.4 Gemini Prompt Architecture

Keep AI prompts in separate backend files.

Suggested structure:

- `scenarioAnalyzer.prompt.js`
- `mysteryGenerator.prompt.js`
- `evidenceGenerator.prompt.js`
- `consistencyChecker.prompt.js`
- `solutionExplainer.prompt.js`

The prompts must instruct Gemini to:
- Generate fictional content only.
- Follow the defined JSON schema.
- Avoid changing established suspect identities.
- Maintain a consistent timeline.
- Generate fair and logically solvable mysteries.
- Avoid exposing the culprit in public evidence.
- Return valid structured output.

Use Gemini structured output / JSON response capabilities where supported by the selected model and SDK.

Do not trust model-generated JSON without server-side validation.

---

# 7. AI-GENERATED MEDIA

The application should support different evidence formats.

## 7.1 WhatsApp Messages

Generate fictional chat conversations.

Display them using a WhatsApp-inspired chat interface.

Fields:
- Sender.
- Receiver.
- Message.
- Timestamp.
- Message grouping.
- Relevant clues.

All conversations must be fictional and clearly part of the game.

## 7.2 Photographic Evidence

The system should support AI-generated images such as:
- Crime scene photographs.
- Room photographs.
- Objects.
- Suspicious locations.
- Relevant visual clues.

Gemini text generation and image generation should be treated as separate capabilities.

**MVP:** Support image placeholders and generated image URLs through a dedicated image-generation provider or a controlled media-generation integration.

Do not assume the standard Gemini text-generation endpoint automatically creates images.

## 7.3 CCTV Evidence

The system should support:
- Camera identification.
- Recording timestamps.
- Camera location.
- Recorded event descriptions.
- Video or simulated CCTV playback.

For the MVP, CCTV can be implemented as a CCTV-style evidence viewer with a generated still image, recording metadata, and timestamped event descriptions.

Actual AI-generated video can be added in a later version using a dedicated video-generation provider.

All generated CCTV evidence must be presented as fictional simulated recordings.

## 7.4 Other Evidence

Support:
- Newspaper reports.
- Handwritten notes.
- Emails.
- Call records.
- Security reports.
- Maps.
- Medical or forensic-style fictional reports.

All evidence must be generated from the established mystery storyline.

---

# 8. FRONTEND DESIGN SPECIFICATION

## 8.1 Design Direction

**Theme:** Modern Detective Investigation / Dark Mystery Room.

The website should look like a professional detective investigation platform.

Design characteristics:
- Dark background.
- Charcoal and black surfaces.
- Muted grey text.
- Amber or gold highlights.
- Red for important alerts.
- Subtle borders.
- Cinematic transitions.
- Investigation-board-inspired layouts.

Avoid excessive neon effects, unnecessary animations, and clutter.

## 8.2 Color Palette

| Element | Color |
|---|---|
| Main background | #0B0D10 |
| Secondary background | #14171C |
| Card background | #1B2027 |
| Primary accent | #D6A64F |
| Secondary accent | #A52A2A |
| Primary text | #F5F5F5 |
| Secondary text | #9CA3AF |
| Border | #303640 |
| Success | #4CAF78 |
| Error | #D9534F |

## 8.3 Required Pages

### Page 1: Landing Page

Components:
- Navigation bar.
- Logo: AI MYSTERY ROOM.
- Hero section.
- Short introduction.
- Enter Mystery Room button.
- How It Works section.
- Feature cards.
- Footer.

### Page 2: Create Mystery Page

Components:
- Scenario input area.
- Difficulty selector.
- Suspect count selector.
- Mystery generation button.
- Loading animation.
- Generation error handling.

### Page 3: Investigation Room

Components:
- Case header.
- Case description.
- Suspect sidebar.
- Evidence categories.
- Evidence viewer.
- Investigation timeline.
- Case notes.
- Final accusation button.

This is the most important page and should receive the greatest development attention.

### Page 4: Final Verdict Page

Components:
- Investigation result.
- Selected suspect.
- Actual culprit.
- Correct solution.
- Evidence explanation.
- Score or completion information.
- Play Again button.

### Page 5: Error / Not Found Page

Components:
- Friendly error message.
- Return to home button.

---

# 9. BACKEND ARCHITECTURE

## 9.1 Architecture

Use a modular backend architecture.

Frontend communicates with the Express backend through REST APIs.

Express handles:
- Request validation.
- AI service communication.
- Mystery creation.
- Database operations.
- Evidence retrieval.
- Accusation processing.
- Solution reveal.

Gemini must only be called from the backend.

Never expose the Gemini API key to the frontend.

## 9.2 Recommended Folder Structure

backend/

  src/

    config/
      db.js
      gemini.js

    controllers/
      mystery.controller.js
      evidence.controller.js
      accusation.controller.js

    models/
      Mystery.js

    routes/
      mystery.routes.js
      evidence.routes.js
      accusation.routes.js

    services/
      gemini.service.js
      mystery.service.js
      evidence.service.js
      validation.service.js

    prompts/
      scenarioAnalyzer.prompt.js
      mysteryGenerator.prompt.js
      evidenceGenerator.prompt.js
      consistencyChecker.prompt.js
      solutionExplainer.prompt.js

    middleware/
      errorHandler.js
      validateRequest.js

    validators/
      mystery.schema.js

    utils/
      generateCaseId.js
      responseFormatter.js

    app.js
    server.js

  .env
  package.json

## 9.3 Frontend Folder Structure

frontend/

  src/

    assets/

    components/
      Navbar.jsx
      Button.jsx
      LoadingScreen.jsx
      SuspectCard.jsx
      EvidenceCard.jsx
      Timeline.jsx
      WhatsAppViewer.jsx
      CCTVViewer.jsx
      ImageViewer.jsx
      NotesPanel.jsx
      ConfirmationModal.jsx

    pages/
      Home.jsx
      CreateMystery.jsx
      InvestigationRoom.jsx
      Verdict.jsx
      NotFound.jsx

    services/
      api.js
      mysteryService.js

    context/
      MysteryContext.jsx

    hooks/

    utils/

    App.jsx
    main.jsx
    index.css

  package.json

---

# 10. DATABASE DESIGN

Use MongoDB with Mongoose.

## 10.1 Mystery Collection

Each mystery document should contain:

{
  caseId: String,
  caseTitle: String,
  scenario: String,
  difficulty: String,
  status: String,

  incident: {
    type: String,
    location: String,
    date: String,
    time: String
  },

  suspects: [Object],

  timeline: [Object],

  evidence: [Object],

  solution: {
    culpritId: String,
    motive: String,
    explanation: String,
    decisiveEvidenceIds: [String],
    suspectEliminations: [Object]
  },

  playerProgress: {
    examinedEvidenceIds: [String],
    notes: String,
    selectedSuspectId: String,
    isSubmitted: Boolean,
    isCorrect: Boolean,
    completedAt: Date
  },

  createdAt: Date,
  updatedAt: Date
}

The actual Mongoose schema must define field types, enums, required properties, nested validation, and indexes.

## 10.2 Data Security

The application must never return the complete Mystery document to the frontend.

Create separate response serializers:

**Public Mystery Response**
- Case details.
- Suspects.
- Timeline.
- Evidence.
- Public investigation information.

**Private Solution Data**
- Actual culprit ID.
- Internal solution.
- Hidden clues.
- Final reasoning.

Only the accusation submission endpoint may access the private solution to evaluate the user's answer.

The solution endpoint may reveal the information after the investigation is completed.

---

# 11. REST API SPECIFICATION

Base URL:

`/api/v1`

## 11.1 Generate Mystery

POST `/mysteries`

Request:

{
  "scenario": "A diamond disappeared during a party.",
  "difficulty": "MEDIUM",
  "suspectCount": 4
}

Response:

{
  "success": true,
  "caseId": "CASE-12345",
  "message": "Mystery generated successfully",
  "data": {
    "caseTitle": "The Missing Diamond",
    "status": "ACTIVE"
  }
}

## 11.2 Get Mystery

GET `/mysteries/:caseId`

Returns:
- Public case information.
- Suspects.
- Timeline.
- Investigation status.

Must not return the culprit or solution before submission.

## 11.3 Get Evidence

GET `/mysteries/:caseId/evidence`

Returns public evidence belonging to the requested investigation.

## 11.4 Get Individual Evidence

GET `/mysteries/:caseId/evidence/:evidenceId`

Returns the requested evidence item.

## 11.5 Update Investigation Progress

PATCH `/mysteries/:caseId/progress`

Request:

{
  "examinedEvidenceIds": ["E001", "E002"],
  "notes": "The timeline seems suspicious."
}

## 11.6 Submit Accusation

POST `/mysteries/:caseId/accusation`

Request:

{
  "suspectId": "S002"
}

Backend operations:

1. Verify the investigation exists.
2. Check that it is active.
3. Check that the suspect belongs to the investigation.
4. Check that no accusation was previously submitted.
5. Compare the submitted suspect ID with the stored culprit ID.
6. Save the result.
7. Mark the investigation completed.
8. Return the outcome.

Response:

{
  "success": true,
  "data": {
    "isCorrect": true,
    "status": "COMPLETED"
  }
}

## 11.7 Reveal Solution

GET `/mysteries/:caseId/solution`

Only available after the investigation has been completed.

Returns:
- Actual culprit.
- Motive.
- Final explanation.
- Decisive evidence.
- Suspect elimination reasoning.

---

# 12. STATE MANAGEMENT

The frontend should maintain the following states:

**Global State**
- Current case ID.
- Mystery details.
- Suspects.
- Evidence.
- Investigation status.
- Examined evidence.
- User notes.
- Selected suspect.
- Submission result.

**Local UI State**
- Active evidence category.
- Selected evidence.
- Modal visibility.
- Loading state.
- Sidebar visibility.

The application must restore an active investigation after page refresh.

For the MVP, use the backend as the source of truth for persisted investigation progress. Avoid storing the actual culprit or private solution in localStorage, sessionStorage, or frontend state.

---

# 13. ERROR HANDLING

The application must handle:

| Scenario | Expected Behavior |
|---|---|
| Empty scenario | Display validation message |
| Scenario too short | Request more details |
| Gemini API failure | Display retry option |
| Invalid AI JSON | Validate and regenerate |
| Inconsistent mystery | Run consistency validation and retry |
| MongoDB unavailable | Display server error |
| Invalid case ID | Display case not found |
| Invalid suspect ID | Reject accusation |
| Duplicate accusation | Reject second submission |
| Evidence unavailable | Display friendly error |
| Network failure | Display retry option |

AI generation should have bounded retries.

Never create an investigation with incomplete or invalid data.

---

# 14. SECURITY REQUIREMENTS

1. Store API keys in environment variables.
2. Never expose Gemini API credentials in React.
3. Validate all incoming API requests.
4. Sanitize user-provided text.
5. Use Helmet for Express security headers.
6. Configure CORS appropriately.
7. Add request rate limiting.
8. Limit scenario input size.
9. Prevent unauthorized solution access.
10. Ensure one accusation per investigation.
11. Use parameterized database operations through Mongoose.
12. Set reasonable AI request timeouts.
13. Do not trust client-side accusation results.
14. Avoid storing sensitive personal information.

Since the project generates fictional investigations, all generated messages, images, and recordings must be clearly labeled as fictional AI-generated evidence.

Do not present generated content as genuine police records, actual CCTV footage, or real private conversations.

---

# 15. NON-FUNCTIONAL REQUIREMENTS

## Performance
- Landing page should load quickly.
- API requests should provide appropriate loading feedback.
- Evidence navigation should feel responsive.
- AI generation should run asynchronously from the user's perspective.

## Reliability
- Invalid AI output must not enter the database.
- The predetermined culprit must remain unchanged.
- Completed cases must preserve their verdict.
- Refreshing the page must not lose saved progress.

## Scalability
- Use modular services.
- Separate AI generation from API controllers.
- Keep media storage independent of the MongoDB document where practical.
- Support future authentication and multiplayer extensions.

## Maintainability
- Use reusable React components.
- Maintain clear backend separation.
- Keep prompts outside controller files.
- Use consistent API response formats.
- Define schemas and shared constants.

---

# 16. MVP DEVELOPMENT PRIORITIES

The following features define the first working version.

## Phase 1: Project Foundation

- Set up React + Vite.
- Set up Express.
- Connect MongoDB.
- Configure Gemini API.
- Establish frontend/backend communication.
- Implement routing.

## Phase 2: Mystery Generation

- Build scenario input page.
- Implement Gemini integration.
- Generate suspects.
- Generate a predetermined culprit.
- Generate timeline.
- Generate evidence.
- Generate final solution.
- Validate AI output.
- Save mystery in MongoDB.

## Phase 3: Investigation Interface

- Build investigation dashboard.
- Display suspects.
- Display evidence categories.
- Implement WhatsApp evidence viewer.
- Implement image evidence viewer.
- Implement CCTV-style evidence viewer.
- Implement witness statements.
- Implement investigation timeline.
- Implement notes panel.

## Phase 4: Investigation Logic

- Implement evidence examination tracking.
- Implement suspect selection.
- Implement final accusation.
- Validate accusation on backend.
- Reveal the solution.
- Display investigation results.

## Phase 5: Polish and Testing

- Responsive design.
- Animations.
- Loading states.
- Error handling.
- API testing.
- Security testing.
- End-to-end testing.

---

# 17. FEATURES EXCLUDED FROM MVP

Do not implement these unless the core application is completed and stable.

1. User authentication.
2. Subscription and payment systems.
3. Multiplayer investigations.
4. Live collaborative investigation rooms.
5. Leaderboards.
6. AI-generated video using external video-generation APIs.
7. Voice-based interrogation.
8. Real-time AI suspect conversations.
9. Public mystery sharing.
10. Social networking features.

These features may be introduced in later versions.

---

# 18. TESTING AND ACCEPTANCE CRITERIA

The application will be considered MVP-complete only when the following conditions are satisfied.

### Mystery Generation
- [ ] User can enter a custom scenario.
- [ ] User can select difficulty.
- [ ] User can generate a mystery.
- [ ] Gemini generates structured investigation data.
- [ ] Every investigation has 3–6 suspects.
- [ ] Exactly one culprit exists.
- [ ] Evidence is logically connected to the story.
- [ ] The investigation is saved in MongoDB.

### Investigation Room
- [ ] User can open a generated investigation.
- [ ] All suspects are displayed.
- [ ] Evidence categories are displayed.
- [ ] User can inspect individual evidence.
- [ ] WhatsApp evidence is rendered correctly.
- [ ] Image evidence is displayed correctly.
- [ ] CCTV-style evidence is displayed correctly.
- [ ] Timeline is visible.
- [ ] User can write investigation notes.

### Accusation
- [ ] User can select a suspect.
- [ ] User can submit the accusation.
- [ ] Backend validates the suspect ID.
- [ ] Correct accusations are evaluated correctly.
- [ ] Incorrect accusations are evaluated correctly.
- [ ] Duplicate submissions are prevented.
- [ ] The solution is hidden until submission.

### Final Result
- [ ] Actual culprit is revealed.
- [ ] Motive is explained.
- [ ] Decisive evidence is highlighted.
- [ ] Final solution is logically explained.
- [ ] User can start another investigation.

### Quality
- [ ] No API keys are exposed.
- [ ] No critical errors in the browser console.
- [ ] Backend errors are handled.
- [ ] Website works on desktop and mobile.
- [ ] Investigation state survives page refresh.

---

# 19. IMPORTANT DEVELOPMENT RULES FOR CODEX

Codex must treat this document as the single source of truth.

Follow these instructions throughout development:

1. Read and understand the complete specification before writing code.
2. Do not change the MERN stack.
3. Use Gemini as the primary AI provider.
4. Follow the specified folder structure unless a technical reason requires a documented adjustment.
5. Do not skip core MVP features.
6. Do not replace actual functionality with static mock data.
7. Do not hardcode mystery scenarios, suspects, or culprits.
8. Every mystery must be generated dynamically from user input.
9. Keep AI prompts in separate files.
10. Use structured JSON output and validate it.
11. Never expose the actual culprit before the final accusation.
12. Keep the culprit fixed throughout an investigation.
13. Generate evidence from the predetermined mystery storyline.
14. Implement proper backend validation and error handling.
15. Use reusable React components.
16. Maintain responsive design.
17. Use environment variables for secrets.
18. Write clean, modular, maintainable code.
19. Do not introduce unnecessary dependencies.
20. Do not implement excluded features without approval.

## Development Execution Instructions

Build the application incrementally.

**Step 1:** Establish the complete project structure and environment configuration.

**Step 2:** Implement the backend and verify MongoDB and Gemini connectivity.

**Step 3:** Implement the mystery-generation pipeline and validate its JSON output.

**Step 4:** Implement public mystery APIs and protected solution data.

**Step 5:** Build the frontend pages and investigation dashboard.

**Step 6:** Connect the frontend to the backend.

**Step 7:** Implement evidence examination and accusation submission.

**Step 8:** Implement verdict and solution reveal.

**Step 9:** Test the complete user journey.

After completing each phase:
- Verify that the code runs.
- Test the relevant APIs.
- Fix errors before continuing.
- Maintain the existing working features.
- Update the project documentation if implementation decisions change.

Do not generate the entire application in one uncontrolled code-generation step.

---

# 20. FINAL PRODUCT DEFINITION

AI Mystery Room is an AI-powered fictional detective investigation platform that transforms user-provided scenarios into interactive mystery experiences.

The system combines generative AI, structured storytelling, fictional multimedia evidence, and logical reasoning to create unique investigation challenges.

The user is not simply reading a mystery story. They are actively participating in the investigation, examining evidence, identifying inconsistencies, connecting clues, and making the final accusation.

**The core product principle:**

"Every mystery must have a predetermined truth, every piece of evidence must belong to that truth, and every user must have a fair opportunity to discover it."

**MVP Definition of Done:**

A user can enter any valid fictional scenario, generate a complete mystery through Gemini, investigate AI-generated evidence, select a culprit, submit an accusation, and receive a logically consistent final verdict.

END OF SPECIFICATION

---

**Document Version:** 1.0  
**Project:** AI Mystery Room  
**Status:** Ready for Codex Implementation