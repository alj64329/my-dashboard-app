## Backend Routes

- [Compnay Routes](#company-routes)
- [User Routes](#user-routes)
- [Project Routes](#project-routes)
- [Team Routes](#team-routes)
- [ExpenseRequest Routes](#expenserequest-routes)
- [LeaveRequest Routes](#leaverequest-routes)
- [Todo Routes](#todo-routes)
- [OTP Routes](#otp-routes)

### Company Routes

| Method | Endpoint | Description | Body |
|------|----------|------------|------------|
| GET | `/companies` | Get all companies | |
| GET | `/companies/:id` | Get company by ID ||
| PUT | `/companies/search?company_code=:COMPANY_CODE` | Find Compnay by company_code ||
| PUT | `/companies/registered/search?company_name=:company_name&email=:email` | Find Compnay by name and admin email (space: %20) ||
| POST | `/companies` | Create a company|`{company_name}`|
| PUT | `/companies/:id` | Update Compnay | |
| DELETE | `/companies/:id` | Delete company | |

---
### User Routes

| Method | Endpoint | Description | Body |
|------|----------|------------|------------|
| GET | `/users` | Get all users ||
| GET | `/users/:id` | Get user by ID | |
| GET | `/users/search?companyId=:companyId` | Find user by companyId | |
| GET | `/users/search?email=:email` | Find user by email | |
| POST | `/users/signup` | Create a user |`{name,companyId, email, password, role}`|
| POST | `/users/login` | Loing and set cookies with user associating company item |`{email, password}`|
| POST | `/users/checkAuth` | Check session ||
| GET | `/users/logout` | logout( clear cookies) ||
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |
---
### Project Routes

| Method | Endpoint | Description | Body |
|------|----------|------------|------------|
| GET | `/projects` | Get all projects ||
| GET | `/projects/:id` | Get project by ID | |
| GET | `/projects/search?companyId=:companyId` | Find projects by companyId | |
| GET | `/projects/search?companyId=:companyId&status=:status` | Find projects by companyId and status | |
| POST | `/projects` | Create a project |`{project_name,status, email, companyId}`| 
| PUT | `/projects/:id` | Update project |
| DELETE | `/projects/:id` | Delete project |
---
### Team Routes

| Method | Endpoint | Description | Body |
|------|----------|------------|------------|
| GET | `/teams` | Get all teams ||
| GET | `/teams/:id` | Get teams by ID | |
| GET | `/teams/search?companyId=:companyId` | Get projects with members by companyId | |
| GET | `/teams/search?userId=:userId` | Find teams by userId (my projects) | |
| GET | `/teams/search?projectId=:projectId` | Find teams by projectsId (List teammates)| |
| POST | `/teams` | Create a project |`{userId, projectId, projectRole, startDate, state}`| 
| PUT | `/teams/:id` | Update project |
| DELETE | `/teams/:id` | Delete project |
---
### ExpenseRequest Routes

| Method | Endpoint | Description | Body |
|------|----------|------------|------------|
| GET | `/expense-requests` | Get all Expense requests ||
| GET | `/expense-requests/:id` | Get Expense requests by ID | |
| GET | `/expense-requests/search?companyId=:companyId` | Get Expense requests by companyId | |
| GET | `/expense-requests/search?companyId=:companyId&approvalStatus=:approvalStatus` | Find Expense requests by status and compnayId | |
| GET | `/expense-requests/search?userId=:userId` | Find Expense requests by userId| |
| POST | `/expense-requests` | Create a Expense requests |`{userId,projectId, projectRole, state}`| 
| PUT | `/expense-requests/:id` | Update Expense requests |
| DELETE | `/expense-requests/:id` | Delete Expense requests |
---
### LeaveRequest Routes

| Method | Endpoint | Description | Body |
|------|----------|------------|------------|
| GET | `/leave-requests` | Get all leave requests ||
| GET | `/leave-requests/:id` | Get leave requests by ID | |
| GET | `/leave-requests/search?companyId=:companyId` | Get leave requests by companyId | |
| GET | `/leave-requests/search?companyId=:companyId&approvalStatus=:approvalStatus` | Find leave requests by status and compnayId | |
| GET | `/leave-requests/search?userId=:userId` | Find leave requests by userId| |
| POST | `/leave-requests` | Create a leave requests |`{fromDate,toDate,leaveType,userId,companyId}`| 
| PUT | `/leave-requests/:id` | Update leave requests |
| DELETE | `/leave-requests/:id` | Delete leave requests |
---
### Todo Routes

| Method | Endpoint | Description | Body |
|------|----------|------------|------------|
| GET | `/todos` | Get all todos ||
| GET | `/todos/:id` | Get todo by ID | |
| GET | `/todos/search?userId=:userId` | Get todos by userId | |
| GET | `/todos/search?userId=:userId&status=:status` | Find todos by status and userId | |
| POST | `/todos` | Create a todo |` {title, userId,desc, status, priority, due }`| 
| PUT | `/todos/:id` | Update todos |
| DELETE | `/todos/:id` | Delete todos |
---
### OTP Routes

| Method | Endpoint | Description | Body |
|------|----------|------------|------------|
| POST | `otp/generate-otp` | generate and send otp |`{email}`|
| POST | `otp/verify-otp` | verify otp |`{email, otp}` |
