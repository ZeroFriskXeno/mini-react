## Tables

> [!WARNING] The database has a normalization level of degree 2
> During development, a controlled denormalization was implemented to avoid refactoring all frontend code, hence the triggers. NOTHING BAD SHOULD HAPPEN. This will be modified again in the future. Check the repository's ``schema.sql`` file for changes.

### `users` Table
| Column    | Type        | Constraints                          | Default Value |
|-----------|-------------|--------------------------------------|---------------|
| id        | bigint      | PRIMARY KEY, GENERATED ALWAYS AS IDENTITY | -          |
| username  | text        | NOT NULL, UNIQUE                     | -             |
| password  | text        | NOT NULL                             | -             |
| status    | bigint      | NOT NULL                             | -             |

---

### `posts` Table
| Column    | Type                     | Constraints                          | Default Value                  |
|-----------|--------------------------|--------------------------------------|--------------------------------|
| id        | bigint                   | PRIMARY KEY, GENERATED ALWAYS AS IDENTITY | -                         |
| user_id   | bigint                   | NOT NULL, FOREIGN KEY (users.id)     | -                             |
| username  | text                     | NOT NULL                             | -                             |
| post_time | timestamp with time zone | NOT NULL                             | `(now() AT TIME ZONE 'utc'::text)` |
| content   | text                     | NOT NULL                             | -                             |
| likes     | bigint                   | NOT NULL                             | `0`                            |
| reports   | bigint                   | NOT NULL                             | `0`                            |

---

### `likes` Table
| Column    | Type                     | Constraints                          | Default Value |
|-----------|--------------------------|--------------------------------------|---------------|
| id        | bigint                   | PRIMARY KEY, GENERATED ALWAYS AS IDENTITY | -          |
| user_id   | bigint                   | NOT NULL, FOREIGN KEY (users.id)     | -             |
| post_id   | bigint                   | NOT NULL, FOREIGN KEY (posts.id)     | -             |
| like_time | timestamp with time zone | NOT NULL                             | `now()`       |

> [!NOTE] Composite primary key (id, post_id)

---

### `reports` Table
| Column      | Type                     | Constraints                          | Default Value |
|-------------|--------------------------|--------------------------------------|---------------|
| id          | bigint                   | PRIMARY KEY, GENERATED ALWAYS AS IDENTITY | -          |
| user_id     | bigint                   | NOT NULL, FOREIGN KEY (users.id)     | -             |
| post_id     | bigint                   | NOT NULL, FOREIGN KEY (posts.id)     | -             |
| report_time | timestamp with time zone | NOT NULL                             | `now()`       |
| reason      | text                     | -                                    | -             |

> [!NOTE] Composite primary key (id, post_id)

---

### `test` Table
| Column | Type   | Constraints                          | Default Value |
|--------|--------|--------------------------------------|---------------|
| id     | bigint | PRIMARY KEY, GENERATED ALWAYS AS IDENTITY | -          |

## Functions

### get_trending_posts

```SQL
SELECT
    id,
    user_id,
    username,
    content,
    likes,
    reports,
    post_time,
    (likes - reports) AS score
FROM posts
WHERE likes >= 10
ORDER BY score DESC, reports ASC, post_time DESC
LIMIT 5;
```

### update_post_reports

```SQL
BEGIN
    IF (TG_OP = 'INSERT') THEN
        UPDATE posts
        SET reports = (
            SELECT COUNT(*) FROM reports WHERE post_id = NEW.post_id
        )
        WHERE id = NEW.post_id;

    ELSIF (TG_OP = 'DELETE') THEN
        UPDATE posts
        SET reports = (
            SELECT COUNT(*) FROM reports WHERE post_id = OLD.post_id
        )
        WHERE id = OLD.post_id;
    END IF;

    RETURN NULL;
END;
```

### get_random_posts

```SQL
SELECT
    id,
    user_id,
    username,
    content,
    likes,
    reports,
    post_time
FROM posts
ORDER BY RANDOM()
LIMIT 5;
```

### update_post_likes

```SQL
BEGIN
    IF (TG_OP = 'INSERT') THEN
        UPDATE posts
        SET likes = (
            SELECT COUNT(*) FROM likes WHERE post_id = NEW.post_id
        )
        WHERE id = NEW.post_id;

    ELSIF (TG_OP = 'DELETE') THEN
        UPDATE posts
        SET likes = (
            SELECT COUNT(*) FROM likes WHERE post_id = OLD.post_id
        )
        WHERE id = OLD.post_id;
    END IF;

    RETURN NULL;
END;
```

### get_liked_posts

```SQL
BEGIN
    RETURN QUERY
    SELECT
        p.id,
        p.user_id,
        p.username,
        p.content,
        p.post_time,
        p.reports,
        COUNT(l.id)::bigint AS likes
    FROM posts p
    LEFT JOIN likes l ON p.id = l.post_id
    GROUP BY p.id
    ORDER BY likes DESC
    LIMIT 5;
END;
```

## Triggers

### update_likes

```SQL
CREATE TRIGGER update_likes
AFTER INSERT OR DELETE ON public.likes
FOR EACH ROW EXECUTE FUNCTION update_post_likes();
```

### update_reports

```SQL
CREATE TRIGGER update_reports
AFTER INSERT OR DELETE ON public.reports
FOR EACH ROW EXECUTE FUNCTION update_post_reports();
```
