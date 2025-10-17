# Web Accessibility Checker - User Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [How to Use](#how-to-use)
3. [Understanding Results](#understanding-results)
4. [Common Issues](#common-issues)
5. [Best Practices](#best-practices)
6. [FAQ](#faq)

---

## Getting Started

The Web Accessibility Checker is a free tool that helps you identify accessibility issues on your website. It scans your pages and provides detailed reports with actionable recommendations.

### What You'll Need
- A website URL to scan
- Internet connection
- Modern web browser (Chrome, Firefox, Safari, or Edge)

### Accessing the Tool
1. Navigate to [FlowFactor Tools](https://flowfactor.vercel.app/tools)
2. Click on "Web Accessibility Checker"
3. You'll see a simple form with a URL input field

---

## How to Use

### Step 1: Enter Your URL

In the URL field, enter the web address you want to scan. You can enter it with or without "https://":

**Examples:**
- `example.com` ✅
- `https://example.com` ✅
- `www.example.com` ✅
- `example.com/about` ✅

### Step 2: Start the Scan

Click the **"Scan Website"** button. The tool will:
1. Validate your URL
2. Fetch the webpage
3. Follow any redirects automatically
4. Analyze the HTML for accessibility issues
5. Generate an AI-powered report

**⏱️ Scanning typically takes 2-5 seconds**

### Step 3: Review Your Results

Once the scan completes, you'll see:
- **AI Coach Summary** - Overview of your website's accessibility
- **Issue Count** - Number of issues by severity
- **Detailed Issues List** - Each issue with explanation and fix suggestion

---

## Understanding Results

### Severity Levels

Issues are categorized into four severity levels:

#### 🔴 Critical
**Impact:** Blocks access for users with disabilities  
**Priority:** Fix immediately  
**Examples:**
- Images without alt text
- Forms without labels
- Missing page title

#### 🟠 Serious
**Impact:** Makes content very difficult to access  
**Priority:** Fix soon  
**Examples:**
- Missing language attribute
- Poor heading structure

#### 🟡 Moderate
**Impact:** Causes inconvenience but not complete blockage  
**Priority:** Fix when possible  
**Examples:**
- Insufficient heading hierarchy
- Missing ARIA landmarks

#### 🟢 Minor
**Impact:** Minor inconvenience  
**Priority:** Nice to have  
**Examples:**
- Non-standard HTML structure
- Missing optional attributes

### Issue Details

Each issue includes:

1. **Description** - What's wrong
2. **Why It Matters** - Impact on users
3. **How to Fix It** - Specific code example
4. **Learn More** - Link to WCAG documentation

**Example Issue:**

\`\`\`
🔴 Critical: Image missing alternative text

Why it matters:
Images without alt text are invisible to screen readers, preventing 
visually impaired users from understanding the image content.

How to fix it:
<img src="logo.png" alt="Company Logo">

Learn more: WCAG 1.1.1 Non-text Content
\`\`\`

---

## Common Issues

### Issue #1: Missing Alt Text on Images

**What it is:** Images without `alt` attributes

**Who it affects:** Blind and visually impaired users using screen readers

**How to fix:**
\`\`\`html
 ❌ Bad 
<img src="photo.jpg">

 ✅ Good 
<img src="photo.jpg" alt="Team meeting in conference room">

 ✅ Also good (decorative images) 
<img src="decorative.jpg" alt="">
\`\`\`

**Tips:**
- Describe what's in the image
- Be concise but informative
- Use `alt=""` for purely decorative images
- Don't start with "Image of..." or "Picture of..."

---

### Issue #2: Missing Form Labels

**What it is:** Input fields without associated labels

**Who it affects:** Screen reader users, users with motor impairments

**How to fix:**
\`\`\`html
 ❌ Bad 
<input type="email" placeholder="Email">

 ✅ Good 
<label for="email">Email Address</label>
<input id="email" type="email">

 ✅ Also good 
<label>
  Email Address
  <input type="email">
</label>
\`\`\`

**Tips:**
- Every input needs a visible label
- Use `for` and `id` attributes to connect them
- Don't rely on placeholder text as labels

---

### Issue #3: Empty or Vague Link Text

**What it is:** Links with text like "click here" or "read more"

**Who it affects:** Screen reader users navigating by links

**How to fix:**
\`\`\`html
 ❌ Bad 
<a href="/article">Click here</a>

 ✅ Good 
<a href="/article">Read our accessibility guide</a>

 ❌ Bad 
Learn more about our services <a href="/services">here</a>

 ✅ Good 
<a href="/services">Learn more about our services</a>
\`\`\`

**Tips:**
- Link text should make sense out of context
- Describe where the link goes
- Avoid "click here", "read more", "learn more"

---

### Issue #4: Missing Page Title

**What it is:** No `<title>` tag in the HTML

**Who it affects:** All users, especially screen reader users

**How to fix:**
\`\`\`html
 ❌ Bad 
<head>
  <meta charset="UTF-8">
</head>

 ✅ Good 
<head>
  <meta charset="UTF-8">
  <title>About Us - FlowFactor</title>
</head>
\`\`\`

**Tips:**
- Every page needs a unique, descriptive title
- Put the page name first, site name second
- Keep it under 60 characters for search engines

---

### Issue #5: Missing Language Attribute

**What it is:** No `lang` attribute on the `<html>` tag

**Who it affects:** Screen reader users, translation tools

**How to fix:**
\`\`\`html
 ❌ Bad 
<html>

 ✅ Good 
<html lang="en">

 ✅ Good (for Spanish) 
<html lang="es">
\`\`\`

**Tips:**
- Always specify the primary language
- Use ISO 639-1 language codes (en, es, fr, etc.)
- Changes how screen readers pronounce text

---

### Issue #6: Poor Heading Structure

**What it is:** Missing headings or improper heading hierarchy

**Who it affects:** Screen reader users navigating by headings

**How to fix:**
\`\`\`html
 ❌ Bad - Skipping levels 
<h1>Main Title</h1>
<h3>Subsection</h3>

 ✅ Good - Proper hierarchy 
<h1>Main Title</h1>
<h2>Section</h2>
<h3>Subsection</h3>

 ❌ Bad - Multiple h1s 
<h1>Page Title</h1>
<h1>Another Title</h1>

 ✅ Good - One h1 per page 
<h1>Page Title</h1>
<h2>Section Title</h2>
\`\`\`

**Tips:**
- Use only one `<h1>` per page
- Don't skip heading levels
- Headings create document outline
- Use headings for structure, not styling

---

## Best Practices

### Before Scanning
1. **Start with your homepage** - It's usually the most visited page
2. **Scan key pages** - Login, checkout, contact forms
3. **Test during development** - Catch issues early
4. **Scan regularly** - After major updates or redesigns

### After Scanning
1. **Prioritize critical issues** - Fix red flags first
2. **Test your fixes** - Scan again to verify
3. **Document improvements** - Track your progress
4. **Educate your team** - Share results with developers and designers

### General Tips
- **Don't rely solely on automated tools** - Manual testing is important
- **Test with real assistive technology** - Use screen readers if possible
- **Consider all disabilities** - Visual, motor, cognitive, hearing
- **Follow WCAG guidelines** - Aim for Level AA compliance
- **Make accessibility part of your process** - Not an afterthought

---

## FAQ

### How accurate are the results?

The tool checks for 6 common WCAG Level A issues with ~95% accuracy. However:
- Some issues require manual testing (e.g., color contrast, keyboard navigation)
- AI suggestions are helpful but should be reviewed by developers
- Complex accessibility issues may not be detected

### What does the tool NOT check?

Currently, the tool does NOT check:
- Color contrast ratios
- Keyboard navigation
- Focus indicators
- ARIA attribute validity
- JavaScript-rendered content
- Video captions or audio transcripts
- Complex interactive widgets

### Can I scan password-protected pages?

No, the tool can only scan publicly accessible URLs. For authenticated pages, you'll need to:
- Make a temporary public version for testing, or
- Use browser extensions for manual testing

### Why did my scan fail?

Common reasons for failed scans:
- **Connection timeout** - Site took longer than 15 seconds to respond
- **DNS error** - Domain doesn't exist or is unreachable
- **Too many redirects** - More than 5 redirects detected
- **Bot protection** - Site is blocking automated requests
- **Not HTML** - URL points to PDF, image, or other non-HTML content

### How often should I scan my website?

Recommended scanning frequency:
- **During development** - Before launching new features
- **After major updates** - When redesigning or adding content
- **Monthly** - For actively maintained sites
- **Quarterly** - For stable, low-traffic sites

### Is my data stored or shared?

No. The tool:
- Does NOT store scan results
- Does NOT share URLs with third parties
- Does NOT track individual users
- Processes everything server-side and discards after response

### Can I export or save results?

Not currently, but we're working on:
- PDF report generation
- CSV export for spreadsheets
- Scan history for logged-in users
- Scheduled automated scans

### Do you have an API?

Not yet, but an API is planned for future release. It will allow:
- Integration with CI/CD pipelines
- Automated testing workflows
- Batch scanning of multiple URLs
- Custom reporting and analytics

### How can I learn more about accessibility?

Great resources:
- [WebAIM](https://webaim.org/) - Comprehensive accessibility guides
- [W3C WAI](https://www.w3.org/WAI/) - Official WCAG documentation
- [A11y Project](https://www.a11yproject.com/) - Community-driven checklist
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility) - Developer guides

### Can I contribute or provide feedback?

Yes! We welcome:
- Feature requests
- Bug reports
- Accessibility suggestions
- Documentation improvements

Contact us at [support@flowfactor.io](mailto:support@flowfactor.io)

---

## Need Help?

If you encounter issues or have questions:

1. **Check this guide** - Most common questions are answered here
2. **Review error messages** - They often explain what went wrong
3. **Try a different URL** - Test with a simple page like `example.com`
4. **Contact support** - [support@flowfactor.io](mailto:support@flowfactor.io)

---

**Last Updated:** January 16, 2025  
**Version:** 1.0.0
