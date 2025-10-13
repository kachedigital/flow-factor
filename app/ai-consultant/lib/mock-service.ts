// This file is kept for reference but is no longer used in the application
// The application now uses the OpenAI API directly through ai-service.ts

import type { AIResponse } from "../types"

// Sample responses for common ergonomic questions
const SAMPLE_RESPONSES: Record<string, string> = {
  // Sample responses remain for reference
  "desk height":
    "# Optimal Desk Height\n\nThe ideal desk height is typically **28-30 inches (71-76 cm)** from the floor. Your elbows should be at a 90-degree angle when typing.\n\n## Adjustments to Try:\n\n- If your desk isn't adjustable, consider using a keyboard tray to lower your keyboard\n- Raise your chair if your desk is too high\n- Use a footrest if your feet don't reach the floor after adjusting your chair\n\n> **Quick Tip:** The height of your desk should allow your forearms to be parallel to the floor when typing.",

  chair:
    "# Ergonomic Chair Setup\n\nA good ergonomic chair should have adjustable height, lumbar support, and armrests.\n\n## Ideal Configuration:\n\n1. **Seat height:** Feet flat on floor, knees at 90°\n2. **Lumbar support:** Positioned to maintain natural spine curve\n3. **Armrests:** Adjusted so shoulders are relaxed\n4. **Seat depth:** 2-4 finger widths between seat edge and back of knees\n\n> **Remember:** Even the best chair requires you to take regular standing breaks!",

  monitor:
    "# Monitor Positioning\n\nYour monitor should be at eye level, about **20-30 inches (50-75 cm)** from your face.\n\n## Proper Setup:\n\n- Top of screen at or slightly below eye level\n- Directly in front of you (not angled)\n- Tilted slightly upward (10-20°)\n- Positioned to avoid glare from windows or lights\n\n> **For Multiple Monitors:** Place your primary monitor directly in front of you and secondary monitors to the side at the same height and distance.",

  keyboard:
    "# Keyboard Placement\n\nYour keyboard should be positioned so your elbows are at 90° and wrists are straight.\n\n## Recommendations:\n\n- Place keyboard directly in front of you\n- Keep wrists in a neutral position (not bent up or down)\n- Consider a split keyboard for wider shoulder positioning\n- Use a keyboard with minimal height to reduce wrist extension\n\n> **If You Experience Wrist Pain:** Try a wrist rest and ensure you're not resting your wrists while typing—hover instead.",

  mouse:
    "# Mouse Ergonomics\n\nYour mouse should be positioned close to your keyboard to avoid reaching.\n\n## Best Practices:\n\n- Keep mouse at the same height as your keyboard\n- Use your entire arm to move the mouse, not just your wrist\n- Consider a vertical mouse or trackball if you have wrist pain\n- Adjust mouse sensitivity to reduce necessary movement\n\n> **Tip:** Alternate your mouse hand occasionally if possible, and learn keyboard shortcuts to reduce mouse use.",

  posture:
    "# Proper Sitting Posture\n\n## The Ideal Seated Position:\n\n1. **Back:** Straight against chair backrest\n2. **Shoulders:** Relaxed, not hunched\n3. **Elbows:** At 90° angle, close to body\n4. **Feet:** Flat on floor or footrest\n5. **Knees:** At or slightly below hip level\n\n> **Remember the 90-90-90 Rule:** Aim for 90° angles at your elbows, hips, and knees.\n\n## Dynamic Posture:\nChange positions frequently—the best posture is your next posture!",

  breaks:
    "# Taking Effective Breaks\n\n## The 20-20-20 Rule:\nEvery 20 minutes, look at something 20 feet away for 20 seconds.\n\n## Movement Breaks:\n- Stand up every 30-60 minutes\n- Stretch your neck, shoulders, and back\n- Take a short walk when possible\n\n## Micro-Breaks:\nEven 30-second breaks to roll your shoulders and look away from your screen can help reduce fatigue.\n\n> **Set Reminders:** Use a timer or app to remind you to take regular breaks.",

  lighting:
    "# Workspace Lighting\n\nProper lighting reduces eye strain and headaches.\n\n## Optimal Setup:\n\n- Position monitor perpendicular to windows\n- Use blinds or curtains to control natural light\n- Ensure ambient lighting is about half the brightness of typical office lighting\n- Add task lighting for documents\n\n## Screen Settings:\n- Adjust brightness to match your environment\n- Use night mode or blue light filters in evening hours\n\n> **Check for Glare:** If you can see reflections on your screen, adjust your lighting or screen position.",

  "standing desk":
    "# Standing Desk Best Practices\n\n## Proper Setup:\n- Adjust desk height so elbows are at 90° when typing\n- Position monitor at eye level\n- Use an anti-fatigue mat to reduce foot and leg fatigue\n\n## Healthy Usage Pattern:\n1. Start with 30-minute standing intervals\n2. Gradually increase to 1-2 hours\n3. Aim for a 1:1 or 2:1 sitting-to-standing ratio\n\n> **Important:** Standing all day is not better than sitting all day—variation is key!",

  "wrist pain":
    "# Addressing Wrist Pain\n\n## Immediate Actions:\n1. Check wrist position—should be neutral, not bent\n2. Ensure keyboard and mouse are at proper height\n3. Take more frequent breaks\n\n## Equipment Adjustments:\n- Try a wrist rest (but don't rest wrists while typing)\n- Consider an ergonomic or split keyboard\n- Test a vertical mouse or trackball\n\n## Stretches:\n- Gently extend and flex wrists\n- Rotate wrists in circles\n- Stretch fingers wide, then make a fist\n\n> **If pain persists** for more than a week, consult a healthcare professional.",

  "neck pain":
    "# Relieving Neck Pain\n\n## Common Causes:\n- Monitor too low or too high\n- Looking down at documents or devices\n- Phone cradled between ear and shoulder\n\n## Solutions:\n1. Raise monitor to eye level\n2. Use a document holder next to your screen\n3. Use speakerphone or headset for calls\n\n## Helpful Stretches:\n- Gentle neck rolls\n- Chin tucks\n- Shoulder rolls\n\n> **Quick Relief:** Apply heat to relax muscles or ice to reduce inflammation (15 minutes at a time).",

  "back pain":
    "# Managing Back Pain\n\n## Workspace Adjustments:\n1. Ensure chair provides proper lumbar support\n2. Sit all the way back in your chair\n3. Keep feet supported on floor or footrest\n\n## Movement Strategies:\n- Stand up every 30 minutes\n- Take short walking breaks\n- Change sitting positions frequently\n\n## Strengthening Exercises:\n- Gentle back extensions\n- Core strengthening\n- Hip stretches\n\n> **Remember:** Back pain often results from overall sitting time, not just posture.",

  "eye strain":
    "# Reducing Eye Strain\n\n## The 20-20-20 Rule:\nEvery 20 minutes, look at something 20 feet away for 20 seconds.\n\n## Screen Setup:\n- Position monitor arm's length away\n- Top of screen at eye level\n- Adjust brightness to match environment\n- Increase text size if straining to read\n\n## Environment:\n- Reduce glare with proper lighting\n- Consider computer glasses with blue light filtering\n- Maintain proper humidity to prevent dry eyes\n\n> **Don't forget to blink!** We blink less when using screens, which contributes to dry eyes.",

  headache:
    "# Workspace-Related Headaches\n\n## Common Causes:\n- Poor lighting (too bright or too dim)\n- Screen glare\n- Improper monitor height\n- Dehydration\n- Eye strain\n\n## Solutions:\n1. Adjust lighting—neither too bright nor too dark\n2. Eliminate screen glare with proper positioning\n3. Ensure monitor is at eye level\n4. Stay hydrated throughout the day\n5. Take regular vision breaks\n\n> **Quick Check:** If you can see reflections on your screen, adjust to eliminate glare.",

  default:
    "# Ergonomic Workspace Basics\n\n## Key Elements of a Healthy Workspace:\n\n1. **Chair Setup**\n   - Adjust height so feet are flat on floor\n   - Ensure lumbar support aligns with lower back\n   - Set armrests to support arms with shoulders relaxed\n\n2. **Monitor Position**\n   - Top of screen at eye level\n   - About arm's length away\n   - Positioned to avoid glare\n\n3. **Keyboard & Mouse**\n   - Keep at elbow height with wrists neutral\n   - Position directly in front of you\n   - Minimize reaching\n\n4. **Movement & Breaks**\n   - Change positions frequently\n   - Take short breaks every 30 minutes\n   - Follow the 20-20-20 rule for eye relief\n\n> **For more specific advice**, please share details about your workspace setup or any discomfort you're experiencing.",
}

// Function to find the most relevant sample response
function findRelevantResponse(query: string): string {
  // Implementation remains for reference
  query = query.toLowerCase()

  // Check for exact matches first
  for (const [key, response] of Object.entries(SAMPLE_RESPONSES)) {
    if (query.includes(key)) {
      return response
    }
  }

  // If no exact match, return default response
  return SAMPLE_RESPONSES.default
}

export async function generateMockResponse(prompt: string, image?: File): Promise<AIResponse> {
  console.warn("Mock service is being called but should no longer be used")

  return {
    text: "This is a mock response. The application should be using the OpenAI API instead.",
    image: null,
  }
}
