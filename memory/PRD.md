# Kanji N4 Learning App - PRD

## Problem Statement
Perbaiki website Kanji agar responsif di perangkat HP/smartphone atau PC/laptop. Fitur utama: Daftar Kanji, Flashcards, Latihan Kuis, Kuis Ketik, dan Kalimat Rumpang.

## Architecture
- **Frontend**: Vite + React 19 + TypeScript + Tailwind CSS 4 + Framer Motion
- **Data**: Static TypeScript arrays (kanjiList, jukugoList, sentenceList)
- **Styling**: CSS custom properties for theming (light/dark)
- **PWA**: Configured via vite-plugin-pwa
- **No backend required** - purely frontend app

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

## What's Been Implemented (Jan 2026)
1. **Complete Responsive Redesign** - Washi & Ink aesthetic with high contrast
2. **Mobile Bottom Navigation** - 5-tab persistent nav bar replacing sidebar
3. **Horizontal Lesson Selector** - Scrollable pills instead of wrapping grid
4. **Flashcard Fix** - max-h-[60vh] with aspect-ratio to prevent viewport overflow
5. **Typography System** - DM Sans for UI, Noto Sans JP for Japanese text
6. **Theme System** - Clean light (warm white) and dark (#0A0A0A) themes
7. **Touch-Friendly Buttons** - All interactive targets ≥48px
8. **data-testid Attributes** - On all interactive elements

## Backlog / Future Features
- P1: Spaced Repetition System (SRS) tracking
- P1: User progress persistence (localStorage or backend)
- P2: Audio pronunciation for Kanji readings
- P2: Stroke order animation
- P3: Vocabulary/example sentences per Kanji
- P3: Study statistics and streak tracking
