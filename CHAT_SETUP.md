# Chat Bot Setup Instructions

## Overview
The portfolio now includes an AI-powered chat bot that allows visitors to ask questions about Kushal's background, projects, skills, and experience. The chat bot uses Google's Gemini AI to provide intelligent, contextual responses.

## Features
- **Floating Chat Interface**: A minimalist chat bubble that expands into a full chat window
- **Contextual AI Responses**: The AI knows detailed information about Kushal's projects, skills, and experience
- **Smooth Animations**: Built with Framer Motion for elegant transitions
- **Consistent Design**: Matches the portfolio's glass morphism and GeistMono aesthetic
- **Mobile Responsive**: Works seamlessly on all device sizes

## Setup Instructions

### 1. Get a Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Configure Environment Variables
1. Open the `.env.local` file in the project root
2. Replace `your_gemini_api_key_here` with your actual API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

### 3. Test the Chat Bot
1. Start the development server: `npm run dev`
2. Open the portfolio in your browser
3. Scroll to the "Chat with Me" section or look for the floating chat icon
4. Click the chat icon to open the chat interface
5. Try asking questions like:
   - "What projects has Kushal worked on?"
   - "What are his technical skills?"
   - "Tell me about his experience"
   - "What achievements does he have?"

## Technical Implementation

### Components Added
- **ChatBot.tsx**: Main chat interface component with floating design
- **API Route**: `/app/api/chat/route.ts` handles Gemini AI integration
- **Chat Section**: New section added to the main page between achievements and contact

### Key Features
- **Smart Context**: The AI has detailed knowledge about Kushal's background
- **Error Handling**: Graceful fallbacks if the API is unavailable
- **Loading States**: Visual feedback during message processing
- **Message History**: Maintains conversation context within the session

### Design Consistency
- Uses the same glass morphism effects (`bg-white/70 backdrop-blur-sm`)
- Consistent typography with GeistMono font
- Matches the existing color scheme and spacing
- Smooth scroll integration with other sections

## Customization

### Updating AI Context
To modify what the AI knows about Kushal, edit the `KUSHAL_CONTEXT` variable in `/app/api/chat/route.ts`.

### Styling Changes
The chat interface styling can be customized in `/components/ChatBot.tsx` while maintaining design consistency.

### Adding Features
- Message persistence (requires database integration)
- File sharing capabilities
- Voice messages
- Multi-language support

## Troubleshooting

### Common Issues
1. **API Key Not Working**: Ensure the key is correctly set in `.env.local` and restart the dev server
2. **Chat Not Appearing**: Check browser console for JavaScript errors
3. **Slow Responses**: Gemini API response times can vary; this is normal

### Error Messages
- "Sorry, I'm having trouble connecting right now" - Usually indicates API key issues or network problems
- Component not rendering - Check for TypeScript errors in the console

## Security Notes
- Never commit your actual API key to version control
- The `.env.local` file is already in `.gitignore`
- API calls are made server-side to protect the API key
- Consider implementing rate limiting for production use
