# MiniCRM – React Technical Challenge

A small CRM-style app to manage **Leads** and **Prospects**, with simulated validations and a testable architecture using plain **JavaScript + JSX**.

## Live Test: https://addi-crm-e81cb.web.app/

---

## Overview

MiniCRM lets you:

- Add new **Leads**.
- Run a 3-step validation pipeline on each lead:
  - National registry
  - Judicial records
  - Internal scoring
- Promote leads that pass all validations into **Prospects**.
- See an **activity log** of operations.

---

## Tech Stack

- **React** (functional components + hooks)
- **react-dom / react-scripts**
- **Jest** + **@testing-library/react** + **@testing-library/jest-dom** for tests
- **Plain CSS + inline styles**

---


## Project Structure

```bash
src/
  app/
    MiniCRM.jsx                 # Page-level container (main feature)

  components/
    layout/
      Card.jsx                  # Generic card layout
    ui/
      Button.jsx                # Reusable button with variants
      Modal.jsx                 # Generic modal dialog
      Input.jsx                 # Styled input with label
      Pill.jsx                  # Status/score pill
    validation/
      ValidationStatus.jsx      # Shows per-step validation status
    leads/
      LeadsSection.jsx          # Leads panel: header + list + actions
      LeadCard.jsx              # Lead row/card
      NewLeadForm.jsx           # Form to create a new lead
    prospects/
      ProspectsSection.jsx      # Prospects panel
      ProspectCard.jsx          # Prospect row/card

  hooks/
    useLeadValidation.js        # Orchestrates validations + busy/status maps
    useLogs.js                  # Centralized logging with useReducer

  services/
    validationService.js        # Pure functions simulating external validations

  theme/
    useTheme.js                 # Design tokens (colors, radii, spacing, typography)

  styles/
    globals.css                 # Page-level + layout utilities
    components.css              # Placeholder for shared component styles

  index.js                      # React entry point
  App.jsx                       # Mounts MiniCRM
```


## How State Is Managed

1. **Page-Level State (MiniCRM.jsx)**

- MiniCRM is the primary state owner:

- leads: list of lead objects.
- prospects: list of prospect objects.
- isNewLeadOpen: controls the “Add New Lead” modal visibility.

- jsxconst [leads, setLeads] = useState(initialLeads);
- const [prospects, setProspects] = useState([]);
- const [isNewLeadOpen, setIsNewLeadOpen] = useState(false);

**MiniCRM also:**
- Integrates validation logic via useLeadValidation(log).
- Integrates logging via useLogs().
- Owns the domain transitions:
    - On validation success: move lead to prospects.
    - On validation failure: increment validationFailures.

**Design decision:**
- Keep domain data (leads, prospects) at the page/container level instead of spreading it across contexts or multiple hooks. This keeps the data flow explicit and easy to trace.


2. **Validation State (useLeadValidation.js)**
- useLeadValidation encapsulates all validation-related state:
    - busyMap: { [leadId]: "idle" | "validating" }
    - validationStatus: { [leadId]: { nationalOk, judicialOk, scoringOk, running } }
    - anyValidating: derived boolean to disable buttons / show “Validating…”

- jsconst [busyMap, setBusyMap] = useState({});
- const [validationStatus, setValidationStatus] = useState({});

**API:**
- jsconst { busyMap, validationStatus, anyValidating, validateLead } = useLeadValidation(log);
- validateLead(lead, onSuccess, onFailure):

**Calls pure service functions:**
- nationalRegistryCheck(lead)
- judicialRecordsCheck(lead)
- internalScoring({ nationalOk, judicialOk })
- Manages busy/status state internally.
- Delegates domain updates to onSuccess / onFailure callbacks.


**Design decision:**
- Validation hook does not touch leads/prospects directly. This separation keeps business rules (promotion, failure counters) in MiniCRM and makes useLeadValidation a reusable orchestrator.


3. **Logs State (useLogs.js)**
- Logging uses useReducer for predictable updates:
    - jsconst [logLines, dispatch] = useReducer(logsReducer, []);

**API:**
- jsconst { logLines, log, clearLogs } = useLogs();

- log(msg) prefixes messages with timestamps.
- clearLogs() clears all entries.

MiniCRM passes log into useLeadValidation, so validations can log without directly importing the logger.

**Design decision:**
- Logging is decoupled from the domain and validation logic. Hooks & services can log via callbacks, improving testability and composability.


4. **Form State (NewLeadForm.jsx)**
- NewLeadForm keeps local component state for form fields and synchronous validation errors:
    - jsxconst [form, setForm] = useState({
        nationalId: "",
        birthdate: "",
        firstName: "",
        lastName: "",
        email: "",
    });
    const [errors, setErrors] = useState({});

**On submit:**
- Validate that all fields are non-empty.
- Call props.onSubmit(form).
- Actual lead creation is handled in MiniCRM (handleAddLead).

**Design decision:**
- Form state is local and the component is “dumb” regarding domain logic. Parent owns the list mutations and ID generation.


5. **UI & Presentation State**

- useTheme provides design tokens; no business logic.
- Input tracks a small focused state to apply focus styles.
- All other UI components (Button, Card, Pill, Modal, ValidationStatus) are stateless/controlled by props.

**Design decision:**
- Keep UI components as pure and reusable as possible, focusing on styling and minimal behavior.


## Testing Strategy

Jest and React Testing Library.
- What is Tested:
    - Services (validationService.js)
        - Success/failure conditions for each API.
    - Hooks
        - useLeadValidation:
            - Happy path (all validations pass).
            - Failure path (scoring fails or errors thrown).
            - Busy state & anyValidating.
            - Guard for null/undefined lead.        
        - useLogs:
            - Adding & clearing logs.
            - Timestamped format.
    - UI Primitives
        - Button:
            - Click behavior.
            - Disabled behavior.
            - Hover behavior & variants.


        - Input:
            - Label wiring.
            - Value changes.
            - Focus/blur styling.

    - Modal, Pill, Card, ValidationStatus:
        - Basic rendering and semantics.

    - Domain Components. LeadCard, LeadsSection, NewLeadForm, ProspectCard, ProspectsSection:
        - Render expected fields and statuses.
        - Fire callbacks (validate, add lead, open modal, etc).
        - Handle empty states.


    - Page-level Integration:
        - Renders both sections.
        - Opens/closes new lead modal.
        - Adds a new lead through the form.
        - Runs “Validate All” and logs activity.

**Current Coverage**
Sample coverage:
- Overall: ~80–85% statements.
- High coverage for:
    - Components (most are ~90–100% lines).
    - useTheme, Card, Pill, Modal, ValidationStatus.
    - More complex areas with intentionally lower branch coverage:
- MiniCRM (integration complexity).
- validationService.

**Assumption:**
- For a challenge-sized project, ~80–90% coverage with focused tests on business logic & critical flows is a good balance between thoroughness and time.


## Key Design Decisions
1. **No Context (Yet):**
    Choice: Keep leads, prospects, and validation state in MiniCRM and hooks rather than using React Context.
    Why:
    - Single-page app; state usage is local to that tree.
    - Prop chains are shallow and easy to follow.
    - Avoid extra complexity and provider boilerplate for a small project.
    - Tests are simpler (no custom providers).

2. **Plain JS + JSX, No TypeScript:**
    Choice: Follow the requirement for plain JS/JSX.
    Why:
    - Aligns with the challenge spec.
    - Easier to drop into any React setup.
    - Keeps the focus on architecture and behavior rather than typing.

    **Future improvement:** Add TypeScript once the domain stabilizes: Lead, Prospect, and validation result types would significantly improve safety.

3. **Pure Validation Services + Orchestration Hook**
    Choice: Split validation into:
    - validationService.js: pure async functions with delays, randomness, and error simulation.
    - useLeadValidation.js: React-facing orchestration.
    Why:
    - Testability: services can be tested in isolation with deterministic options.
    - Separation of concerns: services simulate APIs; hook deals with React state.
    - Reusability: the same services could back another UI or even a Node script.

4. **UI Layer vs Domain Layer**
    Choice: Separate “domain” components from generic UI primitives.
    - UI: Button, Input, Modal, Card, Pill, ValidationStatus.
    - Domain: LeadCard, LeadsSection, NewLeadForm, ProspectCard, ProspectsSection.
    - Container: MiniCRM.
    Why:
    - Makes reuse easier (UI primitives can be used by any feature).
    - Reduces coupling between domain logic and styling.
    - Simplifies tests—domain components can be tested without worrying about styling internals.

5. **Styling Strategy**
    Choice: Use:
    - useTheme + inline styles for most component styling.
    - globals.css for layout helpers and media queries.
    - No Tailwind or CSS-in-JS library.
    Why:
    - Keeps all design tokens in one place.
    - Easy to read/modify for a small project.
    - Avoids extra dependencies and config as requested in the challenge.

    **Future improvement:** extract repetitive inline CSS into class-based styles in components.css or migrate to a CSS-in-JS solution if the design system grows more complex.

    **Assumptions**
    - No real backend: all validation APIs are mocked via validationService.js using timeouts and RNG.
    - Lead/Prospect shapes are stable for this challenge:
    - No additional fields like phone, address, tags, etc.

    **Validation rules:**
    - Passing all 3 checks is sufficient to promote a Lead into a Prospect.
    - Score threshold is fixed (e.g. score > 60 is “ok”).
    - Single user / single session:
    - No auth, no multi-user persistence, no backend persistence.


## Possible Improvements
1. **Introduce TypeScript:**
    Add TS/TSX to describe: Lead, Prospect, validation result shapes.
    Benefits:
    - Safer refactors.
    - Better IDE support.
    - Stronger contracts between services, hooks, and UI.

2. **Context or State Management Library (When Needed)**
    If app grows beyond one page:
    - Introduce a CRMContext (or Zustand/Redux Toolkit) to manage: leads, prospects, logLines, validationStatus.
    Benefit:
    - Avoid prop drilling across multiple routes/layout components.
    - Centralize business logic and domain rules.

3. **Better Error Handling & UX**
    Currently:
    - Failures increment validationFailures and log a message, but no detailed “why” is shown to the user.

    Improvements:
    - Show a summary of reasons (e.g. national registry mismatch, judicial hit, low score).
    - Add per-step error messages in ValidationStatus.
    - Allow retry with clearer feedback.


4. **UI Enhancements**
    - Sorting and filtering of leads/prospects.
    - Pagination or virtualized lists for large data sets.
    - Inline editing of lead data prior to validation.
    - Status filters (e.g. “failed validations > 0”).


## Running The Project
- Install: npm install
- Start Dev Server: npm start
- Run Tests: npm test