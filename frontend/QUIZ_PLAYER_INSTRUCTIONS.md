# Quiz Reviewer - Frontend Master Instructions (v1.1)

This document defines the requirements for the Quiz Review interface, designed for teachers (paper preparation) and students (study aid).

## 🎯 Objective
Create a clear, high-visibility "Question Bank" view where users can review generated content, toggle answers for study, and prepare for exams.

## 🏗️ UI/UX Requirements

### 1. Sequential Study Layout
- **Container**: A vertical, scrollable list of questions.
- **Card Focus**: Use high-contrast typography. The question text should be large and easy to read.
- **Question Numbering**: Ensure every question is clearly numbered (e.g., "Question 01").

### 2. "Reveal" Answer Logic
- **No Inputs**: Users should NOT enter answers. The interface is for reading and review.
- **Show Answer Toggle**: Each question card must have a "Show Answer" or "Reveal Solution" button.
- **Answer Display**: 
    - When revealed, show the correct answer clearly (e.g., in a highlighted box).
    - For MCQs, highlight the correct option in green.
    - Show the **Explanation** alongside the answer to provide context.
- **Global Toggle**: (Optional) Add a button in the sticky header to "Show All Answers" or "Hide All Answers" for quick scanning.

### 3. Preparation Tools
- **Copy Feature**: Add a "Copy Question" button to each card for easy pasting into word processors.
- **Sticky Header**: Show the Quiz Title and a "Print/Export" action (future feature).

## 🛠️ Implementation Details

### API Integration
- **Endpoint**: `GET /api/quiz/{id}`.
- **Data Mapping**: Display `QuestionType` (MCQ, Short, Long) as a badge.

### Components (shadcn/ui)
- `Accordion` or `Collapsible`: Can be used for the Answer/Explanation section.
- `Card`: For the main question container.
- `Badge`: To label question types.
- `Tooltip`: For "Copy to Clipboard" feedback.

## 📜 Coding Standards
- **Clarity First**: Use generous padding and whitespace. Teachers often use these as templates; the layout should reflect a formal "Question Paper" feel.
- **Transitions**: Use simple, fast transitions (0.2s) for revealing answers to keep the experience snappy.

