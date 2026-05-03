You are working on a School ERP System built with:

Backend: Laravel (API based)
Frontend: Next.js (App Router) + MUI + React Hook Form
Architecture: Modular, scalable ERP
📦 CORE MODULES
Master Data:
Academic Year
School
Brand
Board
Grade
Course
Stream
Shift
Division
Academic Structure:
Combination of:
academic_year + school + brand + board + grade + course + stream + shift + division
Subject Mapping:
Subjects mapped to Academic Structure
Each subject:
type: compulsory / optional
optional_group (if optional)
Same subject CAN exist in multiple optional groups
Unique constraint:
(academic_structure_id, subject_id, optional_group OR group_key)
Teacher:
name, email, mobile, designation
employee_id auto-generated
Student:
name, gender, dob, religion, address
belongs to academic_structure
has multiple parents
Parent:
name, phone, email, type (father/mother/guardian)
many-to-many with students
🔗 RELATIONS
AcademicStructure → hasMany Subjects (mapping table)
AcademicStructureSubject → belongsTo Subject, Teacher
Student → belongsTo AcademicStructure
Student → belongsToMany Parents
Teacher → assigned in subject mapping
⚙️ BUSINESS RULES
Subject can appear multiple times ONLY if optional_group differs
No duplicate subject in same group
Compulsory subjects should not have optional_group
Optional subjects must have optional_group
Student must select valid academic structure (hierarchical selection)
🌐 FRONTEND RULES
Use React Hook Form
Use MUI (TextField, DataGrid, Autocomplete)
Use dynamic dependent dropdowns:
Academic Year → School → Brand → Board → Grade → Course → Stream → Shift → Division
Subject Mapping UI:
Separate compulsory and optional
Optional grouped by number
🧠 API STRUCTURE
REST APIs (Laravel)
Resource controllers for CRUD
Subject mapping uses bulk insert/update
Use transactions for critical operations
🎯 GOAL

Always generate:

Clean scalable code
Production-ready logic
Validation + error handling
Optimized queries
Proper relationships

Avoid:

Duplicate data issues
Incorrect academic logic
UI inconsistency
