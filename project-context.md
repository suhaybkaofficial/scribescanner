# AI Writing Style Checker Project Blueprint

## Project Overview
The AI Writing Style Checker is an intelligent web application designed to assist users in enhancing their writing skills. By providing actionable suggestions for tone adjustments, grammar corrections, and readability improvements, the tool caters to students, professionals, and writers seeking to refine their written communication. The primary goal is to empower users to produce high-quality text that aligns with their intended audience and purpose, thus addressing common writing challenges.

## Core Functionalities
1. **Text Input Options**
   - **Paste Text**: Users can directly paste their text into a text box for analysis.
   - **Upload Document**: Users can upload documents (e.g., .txt, .docx) for automatic text extraction and analysis.

2. **AI Suggestions**
   - **Tone Adjustments**: Using OpenAI GPT-4 API, the tool analyzes the submitted text and provides suggestions to modify the tone (e.g., formal, informal, persuasive).
   - **Grammar Corrections**: Integrate with Grammarly API or LanguageTool API to identify and suggest corrections for grammatical errors.
   - **Readability Improvements**: Offer enhancements for sentence structure and complexity to ensure clarity and fluency.

3. **Scoring System**
   - Implement a scoring mechanism that evaluates writing quality based on grammar, tone appropriateness, and readability. Display scores to users to help them gauge their writing effectiveness.

4. **Output Options**
   - **Download Edited Text**: Allow users to download the revised text as a .txt or .docx file.
   - **Copy to Clipboard**: Provide a button for users to easily copy the edited text for immediate use.

## User Interface & Experience
### Main Screens or Pages
- **Home Page**: Introduction to the tool, user instructions, and an input area for text submission.
- **Analysis Result Page**: Displays the original text, AI suggestions, scoring metrics, and options to download or copy the edited text.

### User Interaction Flows
1. **Text Submission**: Users paste text or upload a document.
2. **Analysis Process**: Upon submission, the tool processes the text and displays analysis results, highlighting suggestions.
3. **Review Suggestions**: Users can review and apply suggestions, see their writing score, and make further edits.
4. **Output Options**: Users choose to download or copy the improved text.

### Mobile Responsiveness
- Ensure the interface is mobile-friendly with a responsive design that adapts to different screen sizes, maintaining usability on smartphones and tablets.

## Project Structure
### Component Structure
- **Components Folder**: All new components will be placed in the `/components` directory.
  - Example components:
    - `TextInput.tsx`: For handling text input and upload functionality.
    - `ResultDisplay.tsx`: For showcasing analysis results and suggestions.
    - `ScoreCard.tsx`: For displaying the scoring metrics.

### Pages
- **Home Page**: Located in `/app/home/page.tsx`.
- **Analysis Result Page**: Located in `/app/result/page.tsx`.

### Data Fetching and State Management
- All data fetching will be performed in server components and passed down as props.
- Client components will manage local state with hooks and will include loading states and error handling during API calls.

### Server-Side API Calls
- Create dedicated API routes in `/app/api/analysis/route.ts` for handling:
  - Grammar and style analysis using the selected external API.
  - Tone analysis and suggestions using OpenAI GPT-4 API.
  
### Environment Variables
- Store all API keys and sensitive data in environment variables, accessed only in server-side code.
- Use a `.env.local` file for local development, ensuring it is included in `.gitignore`.

## References & Docs
- **Grammarly API Documentation**: [Grammarly API](https://developer.grammarly.com/)
- **LanguageTool API Documentation**: [LanguageTool API](https://languagetool.org/http-api/swagger-ui/#!/default/post_check)
- **OpenAI API Documentation**: [OpenAI API](https://platform.openai.com/docs/api-reference/introduction)
- **Next.js Documentation**: [Next.js](https://nextjs.org/docs)
- **Tailwind CSS Documentation**: [Tailwind CSS](https://tailwindcss.com/docs)
