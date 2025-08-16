# Mini-React ⚛️

<div align="center" style="display: flex; justify-content: space-around">
	<img height="64" width="64" src="https://cdn.simpleicons.org/typescript" />
	<img height="64" width="64" src="https://cdn.simpleicons.org/vite" />
	<img height="64" width="64" src="https://cdn.simpleicons.org/react" />
	<img height="64" width="64" src="https://cdn.simpleicons.org/tailwindcss" />
	<img height="64" width="64" src="https://cdn.simpleicons.org/express/black/white" />
	<img height="64" width="64" src="https://cdn.simpleicons.org/supabase" />
	<img height="64" width="64" src="https://cdn.simpleicons.org/postgresql" />
	<img height="64" width="64" src="https://cdn.simpleicons.org/vercel/black/white" />
</div>

<br />

Mini-React is a personal mini-project used to practice Fullstack development using
<span><img height="12" width="12" src="https://cdn.simpleicons.org/react" /> React</span>
for frontend,
<span><img height="12" width="12" src="https://cdn.simpleicons.org/express/white" /> Express</span>
for backend, and
<span><img height="12" width="12" src="https://cdn.simpleicons.org/supabase" /> Supabase</span>
for database. Additionally, the
<span><img height="12" width="12" src="https://cdn.simpleicons.org/TypeScript" /> TypeScript</span>
language ensures better data integrity. Designed for PaaS platforms like
<span><img height="12" width="12" src="https://cdn.simpleicons.org/vercel/white" /> Vercel</span>.

Current version: **1.0.0**

*What can you do?*

- Create a user, log in, delete account.
- Create, rate, report posts.

## Getting Started 🎯

### Dependencies / Requirements 🗃️

#### Requirements

- ``Node.js``: v18+

#### Dependencies

- ``@tailwindcss/vite``: v4.1+
- ``dayjs``: v1.1+
- ``react``: v19.1+
- ``react-dom``: v19.1+
- ``react-feather``: v2.0+
- ``zustand``: v5.0+
- ``@supabase/supabase-js``: v2.52+
- ``argon2"``: v0.43+
- ``cookie-parser``: v1.4+
- ``cors``: v2.8+
- ``csrf-csrf``: v4.0+
- ``dayjs`` v1.11.+
- ``dotenv``:  v17.2+
- ``express``: v5.1+
- ``helmet``: v8.1+
- ``jsonwebtoken``: v9.0+

### Download ⬇️

*No download required.*

### Installing ⚙️

*No installation required.*

## Run/Build yourself 🛠️

### Configuration

#### .env

The project requires specific settings in the <span><img height="12" width="12" src="https://cdn.simpleicons.org/dotenv" /> ``.env``</span> file located at ``/server/.env``

Expected content:

```js
SUPABASE_KEY = STRING
SUPABASE_URL = URL
JWT_SECRET = STRING		// <= Use random hex data, longer is better
PORT = 3000
```

#### Supabase

> [!WARNING] The database has a normalization level of degree 2
> During development, a controlled denormalization was implemented to avoid refactoring all frontend code (using triggers). THIS SHOULDN'T CAUSE ISSUES. Future updates will modify this. Check the repository's ``schema.sql`` file for changes.

Please see the [schema.md](docs/schema.md) file (a complete ``schema.sql`` file will be added soon).

> [!WARNING]
>
> Before building or running, you must add an
<span><img height="12" width="12" src="https://cdn.simpleicons.org/dotenv" /> ``.env``</span>
> file with your
<span><img height="12" width="12" src="https://cdn.simpleicons.org/supabase" /> Supabase</span>
> credentials
>
> Jump to the [Configuration](#configuration) section

### Run

1. Clone the repository:

   `git clone https://github.com/hppsrc/mini-react.git`

2. Navigate to the project directory:

   `cd mini-react`

3. Install dependencies:

   `npm install`


> [!TIP]
>
> For faster installation, use PNPM:
>
> `pnpm install`

4. Run locally:

   `node src/server.js`

> [!TIP]
>
> For better performance, use BUN:
>
> `bun run app-bun`

5. Open in your browser:

   `http://localhost:5173/`

### Build

*Build instructions coming soon*

### Using Mini-React 💻

> [!NOTE]
> This section will be updated as new features are added.

## Help ❓

Check the **Wiki** section in the GitHub repository:
[GitHub Wiki](https://github.com/hppsrc/mini-react/wiki)
Contributions to the wiki are welcome!

## License 🔑

This project is licensed under the GNU General Public License v3.

## TODO ✔️

- [ ] Responsive design
- [ ] Improve server security
- [ ] Code cleanup
- [ ] Post editing
- [ ] Add more features
- [ ] QOL updates.

## Known Errors 🐞

Report issues in the **Issues** section:
[GitHub Issues](https://github.com/hppsrc/mini-react/issues)

Open a new issue for bugs or support requests.
