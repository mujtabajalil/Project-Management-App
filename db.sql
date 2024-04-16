CREATE TABLE user (
    id INT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE project (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    team_lead_id INT,
    FOREIGN KEY (team_lead_id) REFERENCES user(id)
);

CREATE TABLE version (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    project_id INT,
    release_date DATE,
    FOREIGN KEY (project_id) REFERENCES project(id)
);

CREATE TABLE board (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    project_id INT,
    FOREIGN KEY (project_id) REFERENCES project(id)
);

CREATE TABLE issue (
    id INT PRIMARY KEY,
    issue_type VARCHAR(255) NOT NULL,
    summary VARCHAR(255) NOT NULL,
    description TEXT,
    assignee_id INT,
    current_state VARCHAR(255) NOT NULL,
    priority VARCHAR(255) NOT NULL,
    due_date DATE,
    project_id INT,
    sprint_id INT,
    workflow_id INT,
    FOREIGN KEY (assignee_id) REFERENCES user(id),
    FOREIGN KEY (project_id) REFERENCES project(id),
    FOREIGN KEY (sprint_id) REFERENCES sprint(id),
    FOREIGN KEY (workflow_id) REFERENCES workflow(id)
);

CREATE TABLE sprint (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    project_id INT,
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (project_id) REFERENCES project(id)
);

CREATE TABLE workflow (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
