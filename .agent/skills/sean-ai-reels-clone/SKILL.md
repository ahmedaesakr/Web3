---
name: sean-ai-reels-clone
description: Builds a cinematic, responsive video grid inspired by @seanaiux's Instagram profile. Use for implementing high-end video gallery features with smooth animations and dark mode aesthetics.
---

# Sean AI Reels Clone

## Overview
This skill provides a complete implementation guide for replicating the high-end, cinematic video grid seen on the Instagram profile of @seanaiux. It features a responsive layout (3-column desktop, single-column mobile), smooth hover interactions, and seamless video playback.

## Features
- **Responsive Grid**: Automatically adjusts from 3 columns on desktop to 1 column on mobile devices.
- **Cinematic Aesthetics**: Dark mode default, minimal UI elements, and focus on content.
- **Interactive Thumbnails**:
    - **Hover**: Subtle zoom, data overlay (views, likes), and audio fade-in.
    - **Click**: Opens full-screen modal or navigates to detail view.
- **Performance Optimized**: Uses efficient video loading strategies and lazy loading for smooth scrolling.

## Instructions

### 1. Component Implementation

Use the provided React components in `assets/` to build the grid.

**Core Components:**
- `ReelsGrid.jsx`: Main container that handles layout and data mapping.
- `ReelCard.jsx`: Individual video item with interaction logic.

### 2. Styling

Apply the following CSS principles (see `assets/styles.css` for reference):
- **Aspect Ratio**: maintain a strict 9:16 aspect ratio for all video containers.
- **Grid Layout**: Use CSS Grid with `repeat(auto-fill, minmax(300px, 1fr))` for responsiveness.
- **Transitions**: Use `transform` and `opacity` for high-performance animations (GPU accelerated).

### 3. Data Structure

Expect a data array of reel objects:
```json
[
  {
    "id": "reel-1",
    "videoUrl": "/videos/reel-1.mp4",
    "thumbnailUrl": "/images/reel-1-thumb.jpg",
    "views": "1.2M",
    "likes": "45K",
    "caption": "Cinematic AI workflow..."
  }
]
```

## Resources

- **ReelsGrid Component**: `assets/ReelsGrid.jsx`
- **ReelCard Component**: `assets/ReelCard.jsx`
- **Styles**: `assets/styles.css`
