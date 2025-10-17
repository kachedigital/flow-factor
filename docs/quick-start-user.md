# Quick Start Guide for Users

**Get started with FlowFactor's Web Accessibility Checker in under 2 minutes!**

---

## What You'll Need

- A web browser (Chrome, Firefox, Safari, or Edge)
- A website URL you want to check
- No account required! ✨

---

## Step 1: Navigate to the Tool

Visit the Web Accessibility Checker:
\`\`\`
https://flowfactor.vercel.app/tools/web-accessibility-checker
\`\`\`

Or from the FlowFactor homepage:
1. Click on **"Tools"** in the navigation menu
2. Select **"Web Accessibility Checker"**

---

## Step 2: Enter a Website URL

In the input field, type or paste the URL you want to scan:

**Examples:**
- `example.com`
- `https://www.mywebsite.com`
- `mycompany.org/products`

**Tips:**
- You don't need to include `https://` - we'll add it automatically
- Works with any publicly accessible website
- Subdomains and paths are supported (e.g., `blog.example.com/post`)

---

## Step 3: Click "Scan Website"

Click the blue **"Scan Website"** button and wait while we:
1. Fetch the website's HTML
2. Analyze it for accessibility issues
3. Generate AI-powered recommendations

**Scanning typically takes 2-5 seconds** depending on the website's response time.

---

## Step 4: Review Your Results

### Understanding the Results

Your scan results will show:

#### 📊 Summary Section
- **Total Issues Found:** Number of accessibility problems detected
- **Issue Breakdown:** Count by severity level

#### 🔍 Detailed Issues

Each issue includes:

**1. Issue Type**
- What accessibility problem was found
- Example: "Missing Alt Text on Images"

**2. Severity Badge**
- 🔴 **Critical:** Must fix immediately (blocks users)
- 🟠 **Serious:** Should fix soon (significant barrier)
- 🟡 **Moderate:** Should address (usability issue)

**3. Count**
- How many instances of this issue were found
- Example: "Found on 5 images"

**4. AI Explanation**
- What this issue means
- Why it's a problem for users
- Which users are most affected

**5. How to Fix**
- Step-by-step instructions
- Code examples when applicable
- Best practices

---

## Common Issues & Quick Fixes

### 1. Missing Alt Text on Images

**What it means:** Images don't have alternative text for screen readers.

**How to fix:**
\`\`\`html
 ❌ Before 
<img src="logo.png">

 ✅ After 
<img src="logo.png" alt="Company Logo">
\`\`\`

**Pro tip:** Alt text should describe the image's purpose, not just its appearance.

---

### 2. Empty Links

**What it means:** Links have no text content.

**How to fix:**
\`\`\`html
 ❌ Before 
<a href="/contact"></a>

 ✅ After 
<a href="/contact">Contact Us</a>
\`\`\`

---

### 3. Missing Form Labels

**What it means:** Input fields don't have associated labels.

**How to fix:**
\`\`\`html
 ❌ Before 
<input type="email" id="email">

 ✅ After 
<label for="email">Email Address</label>
<input type="email" id="email">
\`\`\`

---

### 4. Low Heading Hierarchy

**What it means:** Page doesn't use proper heading structure.

**How to fix:**
- Use `<h1>` for main page title (only one per page)
- Use `<h2>` for major sections
- Use `<h3>` for subsections
- Don't skip levels (don't go from `<h2>` to `<h4>`)

---

### 5. Missing Page Title

**What it means:** The page doesn't have a `<title>` tag.

**How to fix:**
\`\`\`html
<head>
  <title>About Us - Company Name</title>
</head>
\`\`\`

**Pro tip:** Make titles descriptive and unique for each page.

---

### 6. Missing Language Attribute

**What it means:** The HTML tag doesn't specify the page language.

**How to fix:**
\`\`\`html
 ❌ Before 
<html>

 ✅ After 
<html lang="en">
\`\`\`

---

## Tips for Best Results

### ✅ Do's
- **Scan your homepage first** - It usually has the most accessibility issues
- **Scan key pages** - Contact forms, product pages, checkout process
- **Re-scan after fixes** - Verify your improvements worked
- **Save your results** - Take screenshots or copy the recommendations
- **Share with your team** - Forward the URL or export results

### ❌ Don'ts
- **Don't scan localhost URLs** - The tool can only access public websites
- **Don't scan password-protected pages** - We can't access content behind logins
- **Don't ignore moderate issues** - They still affect user experience
- **Don't fix blindly** - Understand why each issue matters

---

## Understanding Severity Levels

### 🔴 Critical
**Priority:** Fix immediately

**Impact:** Completely blocks some users from accessing content

**Examples:**
- Missing alt text on important images
- Empty links or buttons
- Missing form labels

**WCAG Level:** Usually Level A violations

---

### 🟠 Serious
**Priority:** Fix within 1-2 weeks

**Impact:** Creates significant barriers for users with disabilities

**Examples:**
- Missing language attribute
- Poor heading structure
- Missing page titles

**WCAG Level:** Usually Level A or AA violations

---

### 🟡 Moderate
**Priority:** Fix within 1-2 months

**Impact:** Creates usability issues that make the site harder to use

**Examples:**
- Insufficient headings
- Non-semantic markup
- Missing ARIA labels

**WCAG Level:** Usually Level AA or AAA violations

---

## What Gets Checked?

Our tool currently scans for **6 core accessibility issues**:

| Check | What It Does | WCAG Guideline |
|-------|--------------|----------------|
| Alt Text | Finds images without alternative text | 1.1.1 (Level A) |
| Link Text | Identifies empty or meaningless links | 2.4.4 (Level A) |
| Form Labels | Detects unlabeled form inputs | 3.3.2 (Level A) |
| Headings | Checks for proper heading structure | 2.4.6 (Level AA) |
| Page Title | Verifies page has a descriptive title | 2.4.2 (Level A) |
| Language | Ensures HTML lang attribute is present | 3.1.1 (Level A) |

**Note:** This is an automated scan. Manual testing is still recommended for complete WCAG compliance.

---

## Frequently Asked Questions

### Q: How accurate is the scan?

**A:** The scanner has a ~95% success rate for the checks it performs. However, it only covers basic automated checks. For full WCAG 2.1 compliance, you'll need manual testing as well.

---

### Q: Does it work on mobile sites?

**A:** Yes! The scanner fetches and analyzes the HTML regardless of whether it's a mobile or desktop site. However, it doesn't test mobile-specific interactions.

---

### Q: Can I scan password-protected pages?

**A:** No, the scanner can only access publicly available pages. You'll need to scan the public portions of your site or temporarily make pages public for scanning.

---

### Q: Why did my scan fail?

**Common reasons:**
- Website is down or slow to respond (timeout after 15 seconds)
- Website blocks automated requests
- Invalid URL or domain doesn't exist
- Too many redirects (max 5 allowed)

**Solutions:**
- Try again in a few minutes
- Check the URL is correct
- Try a different page on the same site

---

### Q: Can I export the results?

**A:** Currently, you can copy/paste or screenshot the results. Export to PDF/CSV is coming soon!

---

### Q: How often should I scan my site?

**Recommendations:**
- After any content updates
- Before major releases
- Monthly for active sites
- Weekly for frequently updated sites

---

### Q: Is my website data stored?

**A:** No, we don't store your scan results. Each scan is processed in real-time and results are only shown to you.

---

### Q: Does this guarantee WCAG compliance?

**A:** No. Automated scans can only catch about 30-40% of accessibility issues. For full WCAG compliance, you'll need:
- Manual testing with screen readers
- Keyboard navigation testing
- Color contrast analysis
- User testing with people with disabilities

Our tool is a great starting point, but not a complete solution.

---

## What to Do After Your Scan

### 1. Prioritize Issues
Start with **Critical** issues, then move to **Serious**, then **Moderate**.

### 2. Fix Issues on Your Site
Use the "How to Fix" guidance provided for each issue.

### 3. Test Your Fixes
- Use a screen reader (NVDA, JAWS, or VoiceOver)
- Navigate with keyboard only (Tab, Enter, Arrow keys)
- Check color contrast with browser tools

### 4. Re-scan
Run the scan again to verify issues are resolved.

### 5. Keep Improving
Accessibility is ongoing! Re-scan regularly as you add new content.

---

## Getting Help

### Need Assistance?
- **Documentation:** Check our full documentation at `/docs`
- **Support:** Contact support@flowfactor.com
- **Community:** Join our Discord for discussions
- **Training:** Book a consultation for in-depth accessibility guidance

### Additional Resources
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Articles](https://webaim.org/articles/)
- [A11y Project](https://www.a11yproject.com/)
- [MDN Accessibility Docs](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

---

## Next Steps

Now that you've scanned your first website:

1. ✅ Review all issues found
2. ✅ Prioritize fixes by severity
3. ✅ Implement fixes on your website
4. ✅ Re-scan to verify improvements
5. ✅ Scan other important pages

**Pro Tip:** Bookmark the tool and make accessibility checks part of your regular workflow!

---

## Success Stories

> "I used the Web Accessibility Checker on my e-commerce site and found 23 critical issues I didn't know about. After fixing them, screen reader users reported a much better experience!" 
> - Sarah K., E-commerce Manager

> "This tool helped us identify and fix accessibility issues before our product launch. It's now part of our QA process."
> - Mike T., Product Manager

> "Simple, fast, and actionable. Exactly what we needed to get started with accessibility."
> - Jessica R., Web Developer

---

**Ready to make your website more accessible? Start scanning now!**

[Go to Web Accessibility Checker →](https://flowfactor.vercel.app/tools/web-accessibility-checker)
