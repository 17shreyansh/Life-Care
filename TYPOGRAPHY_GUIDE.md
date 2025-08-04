# Typography System - S S Psychologist Life Care

## Overview

This document outlines the comprehensive typography system implemented for the S S Psychologist Life Care platform. The system provides consistent, accessible, and responsive typography across all components and pages.

## Key Features

- **Mobile-first responsive design**
- **Consistent type scale**
- **Accessibility compliant**
- **Modern font stack with Inter**
- **Semantic HTML structure**
- **Print-optimized styles**

## Font Family

```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
```

Inter is chosen for its excellent readability, modern appearance, and comprehensive character set.

## Type Scale

### Mobile (< 768px)
- **text-xs**: 12px
- **text-sm**: 14px
- **text-base**: 16px
- **text-lg**: 18px
- **text-xl**: 20px
- **text-2xl**: 24px
- **text-3xl**: 30px
- **text-4xl**: 36px
- **text-5xl**: 48px
- **text-6xl**: 60px

### Desktop (≥ 768px)
- **text-xs**: 12px
- **text-sm**: 14px
- **text-base**: 16px
- **text-lg**: 18px
- **text-xl**: 20px
- **text-2xl**: 24px
- **text-3xl**: 32px
- **text-4xl**: 40px
- **text-5xl**: 56px
- **text-6xl**: 72px

## Font Weights

- **Light (300)**: `.font-light` - Rarely used, for decorative purposes
- **Regular (400)**: `.font-normal` - Body text default
- **Medium (500)**: `.font-medium` - Buttons, labels, emphasis
- **Semibold (600)**: `.font-semibold` - Subheadings, card titles
- **Bold (700)**: `.font-bold` - Main headings
- **Extra Bold (800)**: `.font-extrabold` - Display headings

## Line Heights

- **None (1.0)**: `.leading-none` - Display headings
- **Tight (1.25)**: `.leading-tight` - Headings
- **Snug (1.375)**: `.leading-snug` - Subheadings
- **Normal (1.5)**: `.leading-normal` - Default
- **Relaxed (1.625)**: `.leading-relaxed` - Body text
- **Loose (2.0)**: `.leading-loose` - Special cases

## Letter Spacing

- **Tighter (-0.05em)**: `.tracking-tighter` - Large display text
- **Tight (-0.025em)**: `.tracking-tight` - Headings
- **Normal (0em)**: `.tracking-normal` - Default
- **Wide (0.025em)**: `.tracking-wide` - Labels
- **Wider (0.05em)**: `.tracking-wider` - Small caps
- **Widest (0.1em)**: `.tracking-widest` - Uppercase text

## Heading Hierarchy

### Display Headings
```html
<h1 class="display-1">Hero Headlines</h1>
<h2 class="display-2">Major Section Titles</h2>
<h3 class="display-3">Feature Highlights</h3>
<h4 class="display-4">Subsection Headers</h4>
```

### Regular Headings
```html
<h1 class="h1">Page Titles</h1>
<h2 class="h2">Section Headings</h2>
<h3 class="h3">Subsection Headings</h3>
<h4 class="h4">Component Titles</h4>
<h5 class="h5">Card Titles</h5>
<h6 class="h6">Labels & Categories</h6>
```

## Body Text

### Lead Text
```html
<p class="lead">Introductory paragraphs and important statements</p>
```

### Regular Text
```html
<p>Standard body text for content</p>
<p class="text-lg">Slightly larger text for emphasis</p>
<p class="text-sm text-muted">Secondary information and captions</p>
```

## Component-Specific Classes

### Section Typography
```html
<h6 class="section-subtitle">SECTION CATEGORY</h6>
<h2 class="section-title">Main Section Title</h2>
<p class="section-description">Section description text</p>
```

### Feature Typography
```html
<h5 class="feature-title">Feature Name</h5>
<p class="feature-description">Feature description</p>
```

### Card Typography
```html
<h5 class="card-title">Card Title</h5>
<h6 class="card-subtitle">Card Subtitle</h6>
<p class="card-text">Card content</p>
```

### Testimonial Typography
```html
<p class="testimonial-text">"Quote text"</p>
<p class="testimonial-author">Author Name</p>
<p class="testimonial-role">Author Role</p>
```

## Responsive Typography

### Mobile-Specific Classes
```html
<h1 class="display-2 mobile-h1">Responsive Heading</h1>
<p class="text-lg mobile-text-base">Responsive Text</p>
```

### Breakpoint Behavior
- Text sizes automatically scale down on mobile
- Line heights adjust for better mobile readability
- Letter spacing optimizes for smaller screens

## Usage Guidelines

### Do's
- Use semantic HTML elements (h1, h2, p, etc.)
- Apply typography classes for consistent styling
- Test on multiple screen sizes
- Maintain proper heading hierarchy
- Use appropriate contrast ratios

### Don'ts
- Skip heading levels (h1 → h3)
- Use headings for styling only
- Override font family without good reason
- Use too many font weights in one design
- Ignore mobile responsiveness

## Accessibility Features

- **Minimum 16px base font size** for readability
- **Sufficient color contrast** (WCAG AA compliant)
- **Reduced motion support** for users with vestibular disorders
- **High contrast mode** support
- **Print optimization** for better printing experience
- **Semantic structure** for screen readers

## Implementation

### Import the Typography System
```css
/* In your main CSS file */
@import './styles/typography.css';
```

### Using Classes
```html
<!-- Section Example -->
<section>
  <h6 class="section-subtitle">WHY CHOOSE US</h6>
  <h2 class="section-title mobile-h2">Why <span class="text-gradient">Our Platform</span></h2>
  <p class="section-description">Comprehensive mental health support platform.</p>
</section>

<!-- Feature Card Example -->
<div class="card">
  <div class="card-body">
    <h5 class="feature-title">Secure Sessions</h5>
    <p class="feature-description">End-to-end encrypted video calls.</p>
  </div>
</div>
```

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Android Chrome 60+

## Performance Considerations

- **Font loading optimization** with `font-display: swap`
- **Subset fonts** to reduce file size
- **Preload critical fonts** for better performance
- **CSS custom properties** for efficient styling

## Maintenance

### Adding New Typography
1. Define new variables in `:root`
2. Create utility classes
3. Update this documentation
4. Test across all breakpoints

### Updating Existing Typography
1. Update CSS custom properties
2. Test all components
3. Update documentation
4. Verify accessibility compliance

## Testing Checklist

- [ ] All text is readable on mobile devices
- [ ] Proper contrast ratios maintained
- [ ] Heading hierarchy is logical
- [ ] Print styles work correctly
- [ ] High contrast mode supported
- [ ] Reduced motion preferences respected
- [ ] Cross-browser compatibility verified

## Examples

View the typography guide component at `/components/shared/TypographyGuide.jsx` for live examples of all typography classes and their usage.

---

For questions or suggestions regarding the typography system, please refer to the development team or create an issue in the project repository.