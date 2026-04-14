# Kanji N4 Learning App - PRD

## Problem Statement
Perbaiki website Kanji agar responsif di perangkat HP/smartphone atau PC/laptop. Tambahkan fitur: pelacakan progress, contoh kalimat per Kanji, dan kuis adaptif.

## Architecture
- **Frontend**: Vite + React 19 + TypeScript + Tailwind CSS 4 + Framer Motion
- **Data**: Static TypeScript arrays (kanjiList, jukugoList, sentenceList, exampleSentences)
- **Storage**: localStorage untuk progress tracking
- **Styling**: CSS custom properties for theming (light/dark)
- **PWA**: Configured via vite-plugin-pwa
- **Hosting**: Cloudflare Pages (static, no backend)

## User Personas
- Indonesian learners studying JLPT N4 Kanji
- Mobile-first users who study on-the-go
- Desktop users for longer study sessions

## Core Requirements
- [x] Responsive design for mobile (375px+) and desktop (1024px+)
- [x] Bottom navigation bar on mobile
- [x] Sidebar navigation on desktop  
- [x] Dark/Light theme toggle
- [x] Kanji Dictionary with search and lesson filter
- [x] Flashcards with flip animation
- [x] Multiple choice quiz (Kanji + Jukugo)
- [x] Typing quiz (hardcore recall)
- [x] Sentence fill-in-the-blank quiz
- [x] Horizontal scrolling lesson selector on mobile

## What's Been Implemented

### Phase 1 - Responsive Redesign (Jan 2026)
1. Complete Responsive Redesign - Washi & Ink aesthetic with high contrast
2. Mobile Bottom Navigation - 5-tab persistent nav bar
3. Horizontal Lesson Selector - Scrollable pills
4. Flashcard Fix - max-h-[60vh] with aspect-ratio
5. Typography System - DM Sans + Noto Sans JP
6. Theme System - Clean light/dark themes
7. Touch-Friendly Buttons - All targets >= 48px
8. data-testid Attributes on all interactive elements

### Phase 2 - Learning Features (Jan 2026)
1. **Progress Tracking (localStorage)** - Tracks correct/wrong per Kanji, calculates mastery levels (new/learning/reviewing/mastered), shows progress bar with accuracy stats, colored mastery dots on each Kanji card, reset option
2. **Example Sentences (248 Kanji)** - 1-2 example sentences per Kanji with Japanese text, reading (hiragana), and Indonesian translation. Expandable/collapsible UI in Daftar Kanji
3. **Adaptive Quiz** - Uses weighted random selection based on progress data. Kanji answered wrong more often appear more frequently. New kanji have medium priority, learning kanji highest priority, mastered kanji lowest priority

## Key Files
- `/app/src/hooks/useProgress.ts` - Progress tracking hook & adaptive selection logic
- `/app/src/exampleSentences.ts` - Example sentences data for 248 Kanji
- `/app/src/components/KanjiList.tsx` - Kanji list with progress indicators & expandable sentences
- `/app/src/components/AdvancedQuiz.tsx` - Quiz with adaptive selection & progress recording
- `/app/src/components/TypingQuiz.tsx` - Typing quiz with adaptive selection & progress recording

## Backlog / Future Features
- P1: Audio pronunciation for Kanji readings
- P1: Stroke order animation
- P2: Study statistics dashboard (daily/weekly charts)
- P2: Vocabulary/word compounds per Kanji
- P3: Export/import progress data
- P3: Study reminders/notifications
