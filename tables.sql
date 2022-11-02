
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
	id uuid DEFAULT uuid_generate_v4(),
	first_name VARCHAR NOT NULL,
	last_name VARCHAR NOT NULL,
	phone VARCHAR NOT NULL,
	email VARCHAR NOT NULL,
	created_at timestamp DEFAULT current_timestamp,
	updated_at timestamp DEFAULT current_timestamp,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS quizzes (
	id uuid DEFAULT uuid_generate_v4(),
	name TEXT NOT NULL,
	time_limit BIGINT NULL,
	created_at timestamp DEFAULT current_timestamp,
	updated_at timestamp DEFAULT current_timestamp,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS quiz_questions (
	id uuid DEFAULT uuid_generate_v4(),
	quiz_id uuid NOT NULL,
	content TEXT NOT NULL,
	created_at timestamp DEFAULT current_timestamp,
	updated_at timestamp DEFAULT current_timestamp,
	PRIMARY KEY (id),
	FOREIGN KEY(quiz_id) REFERENCES quizzes(id)
);

CREATE TABLE IF NOT EXISTS quiz_answers (
	id uuid DEFAULT uuid_generate_v4(),
	quiz_id uuid NOT NULL,
	question_id uuid NOT NULL,
	content TEXT NOT NULL,
	is_correct BOOLEAN NOT NULL DEFAULT FALSE,
	created_at timestamp DEFAULT current_timestamp,
	updated_at timestamp DEFAULT current_timestamp,
	PRIMARY KEY (id),
	FOREIGN KEY(quiz_id) REFERENCES quizzes(id),
	FOREIGN KEY(question_id) REFERENCES quiz_questions(id)
);

CREATE TABLE IF NOT EXISTS quiz_attempts (
	id uuid DEFAULT uuid_generate_v4(),
	user_id uuid NOT NULL,
	quiz_id uuid NOT NULL,
	score INT NOT NULL DEFAULT 0,
	started_at timestamp NULL,
	finished_at timestamp NULL,
	created_at timestamp DEFAULT current_timestamp,
	updated_at timestamp DEFAULT current_timestamp,
	PRIMARY KEY (id),
	FOREIGN KEY(user_id) REFERENCES users(id),
	FOREIGN KEY(quiz_id) REFERENCES quizzes(id)
);

CREATE TABLE IF NOT EXISTS quiz_attempt_answers (
	id uuid DEFAULT uuid_generate_v4(),
	attempt_id uuid NOT NULL,
	question_id uuid NOT NULL,
	answer_id uuid NULL,
	created_at timestamp DEFAULT current_timestamp,
	updated_at timestamp DEFAULT current_timestamp,
	PRIMARY KEY (id),
	FOREIGN KEY(attempt_id) REFERENCES quiz_attempts(id),
	FOREIGN KEY(question_id) REFERENCES quiz_questions(id),
	FOREIGN KEY(answer_id) REFERENCES quiz_answers(id),
	UNIQUE (attempt_id, question_id)
)