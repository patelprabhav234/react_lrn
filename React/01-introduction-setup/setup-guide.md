# Detailed Setup Guide

**Code was generated using AI assistance**

## Step-by-Step Installation

### Windows Setup

#### Node.js Installation
1. Visit https://nodejs.org/
2. Download the LTS version
3. Run the installer
4. Verify: `node --version` and `npm --version`

#### PostgreSQL Installation
1. Visit https://www.postgresql.org/download/windows/
2. Download the installer
3. During installation:
   - Remember the password you set for the `postgres` user
   - Note the port (default: 5432)
4. Verify: `psql --version`

### Mac Setup

#### Node.js Installation
```bash
# Using Homebrew
brew install node

# Or download from nodejs.org
```

#### PostgreSQL Installation
```bash
brew install postgresql
brew services start postgresql
```

### Linux Setup

#### Node.js Installation
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Or use package manager
sudo apt-get install nodejs npm
```

#### PostgreSQL Installation
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

## PostgreSQL Initial Setup

### Create Database

1. Access PostgreSQL:
```bash
psql -U postgres
```

2. Create database:
```sql
CREATE DATABASE resume_screening;
```

3. Verify:
```sql
\l
```

4. Exit:
```sql
\q
```

## VS Code Extensions

Recommended extensions:
- ESLint
- Prettier - Code formatter
- PostgreSQL
- Thunder Client (for API testing)
- GitLens

## Verification Checklist

- [ ] Node.js installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] PostgreSQL installed (`psql --version`)
- [ ] Database created
- [ ] VS Code with extensions
- [ ] Project directory created

## Troubleshooting

### Node.js Issues
- If `node` command not found, restart terminal
- Check PATH environment variable

### PostgreSQL Issues
- Ensure PostgreSQL service is running
- Check firewall settings for port 5432
- Verify user permissions

### Port Conflicts
- If port 3000 is in use, change in `.env`
- If port 5432 is in use, configure different port

## Next Steps

Once setup is complete, proceed to Topic 2: Node.js Fundamentals

