Title: AI-Guided Excel Learning Simulator
 
Design an interactive web application that teaches students Microsoft Excel through AI-guided simulations instead of traditional tutorials.
 
The product should simulate the Microsoft Excel environment and allow students to learn by solving realistic tasks with guidance from an AI chatbot tutor.
 
Target users are students and beginner to intermediate professionals learning Excel for school or work.
 
The goal is to create a situated learning experience where students interact with a simulated Excel environment to solve problems similar to real workplace tasks rather than following step-by-step instructions.
 
Core Concept
 
Users enter or select a learning scenario such as:
"Calculate monthly sales totals and identify the top performing product."
The application loads a simulated spreadsheet environment containing realistic data. An AI tutor provides contextual guidance, hints, and feedback while the user interacts with the spreadsheet.
 
The experience should mimic how someone learns Excel in a real workplace.
 
Primary Interface Layout
Create a three-panel layout.
 
Left Panel — Scenario & Objectives
 
Displays the learning assignment and context.
Elements:
	•	Scenario title
	•	Business context description
	•	Task objectives
	•	Progress checklist
	•	Hint button
	•	Show solution button (optional)
Example scenario:
"You are a sales analyst. Use Excel to calculate total monthly revenue for each region and determine the best performing region."
 
Center Panel — Simulated Excel Workspace
 
Replicate a simplified Excel interface where users interact directly with the spreadsheet.
Interface elements:
	•	Spreadsheet grid with rows and columns
	•	Column headers (A, B, C)
	•	Row numbers
	•	Editable cells
	•	Active cell highlighting
	•	Formula bar
	•	Sheet tabs
	•	Basic Excel toolbar
Toolbar items may include:
	•	Insert
	•	Formulas
	•	Sort
	•	Filter
	•	Format
The spreadsheet should feel like a real Excel workspace but simplified for learning.
 
Interactive Spreadsheet Behavior
The simulated Excel workspace must support user interaction and data manipulation.
Users must be able to:
	•	Click into spreadsheet cells
	•	Enter numeric values and text
	•	Enter formulas using the formula bar
	•	Select cell ranges
	•	Copy formulas across cells
	•	Sort columns
	•	Filter rows
	•	Highlight selected ranges
Include UI behaviors such as:
	•	active cell highlighting
	•	range selection shading
	•	formula preview
	•	inline error indicators
Example formula interactions:
User types:
=SUM(
The interface suggests selecting a range.
User selects:
B2:B10
Formula becomes:
=SUM(B2:B10)
 
Dynamic Data Scenarios
Each learning scenario should load a dataset into the spreadsheet automatically.
Example datasets include:
 
Sales Dataset
Columns:
	•	Product
	•	Region
	•	Units Sold
	•	Unit Price
	•	Revenue
Example tasks:
	•	Calculate total revenue
	•	Find the highest selling product
	•	Identify best performing region
 
Budget Dataset
Columns:
	•	Category
	•	Budget
	•	Actual
	•	Variance
Example tasks:
	•	Calculate variance
	•	Identify over-budget categories
 
Inventory Dataset
Columns:
	•	Item Name
	•	Stock Level
	•	Reorder Threshold
	•	Supplier
Example tasks:
	•	Identify low inventory items
	•	Create conditional alerts
 
Right Panel — AI Learning Coach
Create a conversational AI assistant that helps guide the student.
Interface elements:
	•	Chat window
	•	Suggested prompts
	•	Hint button
	•	Explain concept button
	•	Check my work button
	•	Show solution option (optional)
Example AI guidance messages:
"Try using the SUM function to total the revenue column."
"If you want to find the highest value, consider using the MAX function."
"Would you like a hint or the full explanation?"
The AI should act as a coach rather than simply giving answers.
 
AI Response to User Actions
The AI tutor should respond to what the user does inside the spreadsheet.
Examples:
If a student types:
=SUM(
The AI suggests:
"You're on the right track. Try selecting the cells that contain the revenue values."
If a student references the wrong column:
"You may want to check which column contains the revenue data."
If the student is inactive:
"Need a hint? Look at the Unit Price and Units Sold columns."
The AI should teach with clear explanations, worked examples, and actionable steps. Provide a hint when it helps the learner practice, and include a direct answer when that best supports understanding.
 
Feedback and Validation
The system should detect whether the student solved the task correctly.
Include a Check My Work button.
Possible feedback:
Correct solution:
"Great work. Your SUM formula correctly totals the revenue column."
Incorrect solution:
"It looks like your formula references the wrong column. Check the Units Sold column."
Provide suggestions rather than revealing answers.
 
Learning Mechanics
Include progressive difficulty levels.
 
Beginner
Skills:
	•	SUM
	•	AVERAGE
	•	Basic formatting
 
Intermediate
Skills:
	•	IF statements
	•	VLOOKUP
	•	Conditional formatting
 
Advanced
Skills:
	•	Nested formulas
	•	Pivot tables
	•	Data analysis tasks
 
Practice Mode — User Data Entry
Include a Practice Mode that allows users to work with their own data.
Users can:
	•	Upload a CSV file
	•	Paste spreadsheet data
	•	Create a new dataset manually
 
The AI tutor should generate learning challenges based on the uploaded dataset.
Example:
User uploads a dataset of expenses.
AI suggests:
"Try calculating total monthly spending by category."
 
Gamification Elements
Include motivational learning features.
Examples:
	•	XP points
	•	Progress bar
	•	Skill badges
	•	Scenario completion rating
	•	Learning streak tracking
 
Key Screens to Design
Create designs for the following screens:
	1	Learning dashboard
	2	Scenario selection screen
	3	Excel simulation workspace
	4	AI tutor interaction panel
	5	Task completion feedback screen
	6	Skill progress tracker
 
Visual Design
Style should feel modern, educational, and professional.
Design inspiration:
	•	Microsoft Fluent Design
	•	modern learning platforms
	•	productivity tools
Visual elements:
	•	light background
	•	spreadsheet grid styling
	•	clear data hierarchy
	•	approachable AI assistant avatar
 
Advanced Interaction (Optional)
Enhance learning with deeper AI assistance.
Possible features:
	•	AI highlights relevant cells
	•	Suggests formulas visually
	•	Explains Excel concepts interactively
	•	Step replay showing how the problem was solved
 
Product Concept
This product should feel like an AI-guided spreadsheet sandbox where students have the ability to ask questions to the AI and learn Excel by doing real tasks instead of watching tutorials.
The experience should combine:
	•	spreadsheet interaction
	•	AI tutoring
	•	scenario-based learning
	•	real data manipulation
