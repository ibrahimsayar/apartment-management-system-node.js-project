# Apartment Management System - REST API

Apartment management system REST API made with Node.js express library

---

**Version**: 0.0.0.1\
**Constituent**: İbrahim Sayar <ibrahim.sayar@naylalabs.com>\
**Email**: ibrahim.sayar@naylalabs.com

What you can do with this project?

### Apartments
- Creating an apartment.
- Listing the apartments.
- Showing the details of the apartment.
- Update apartment information.
- Remove the apartment.

### Users
- Creating a user.
- List users.
- Show user detail information.
- Update user information.
- Remove the user.

### Transactions
1. Bill
- Creating an Invoice to the user. 
- Invoice removal from user.
- Update invoice payment status.
2. User
- View the user's invoices.
- View the user's total paid invoice amount
- View the user's total outstanding invoice amount
3. Apartment
- List the bills of the apartment.
- View the total debt of the apartment

#### Dependencies
- **Node.js** (v16.13.0+)
- **Npm** (v8.1.0)

### Notes
In the project, there is the MongoDB collection of the project in the collections folder.
Again, there is the postman's collection in the postman folder.

### Install & Run

```bash
# We download the repo.
git clone https://github.com/ibrahimsayar/apartment-management-system-node.js-project.git
cd apartment-management-system-node.js-project/

# We install Node.js packages.
npm install

# We start the application.
# http://127.0.0.1:3000/
npm start
```

### Test

```bash
# If you want to be tested
npm test
```