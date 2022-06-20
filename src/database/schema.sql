CREATE DATABASE curriculum;

CREATE TABLE IF NOT EXISTS admin_user(
    id SERIAL NOT NULL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    pass TEXT NOT NULL,
    persona_id INTEGER NOT NULL,
    FOREIGN KEY(persona_id) REFERENCES persona(id) 
);

CREATE TABLE IF NOT EXISTS skills (
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(100)
); 

CREATE TABLE IF NOT EXISTS languages (
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(100),
    fluency VARCHAR(100)
); 

CREATE TABLE IF NOT EXISTS certificates (
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(150),
    link TEXT,
    company VARCHAR(150),
    issue_date DATE,
    expiration_date DATE,
    credential_key TEXT,
    credential_url TEXT      
); 

CREATE TABLE IF NOT EXISTS medias (
    id SERIAL NOT NULL PRIMARY KEY,
    link TEXT
); 

CREATE TABLE IF NOT EXISTS academic_degrees (
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(150),
    institution_name VARCHAR(150),
    institution_web_site TEXT DEFAULT NULL,
    ad_start_date DATE NOT NULL,
    ad_end_date DATE DEFAULT NULL,
    ad_description TEXT, 
    medias_id INTEGER NOT NULL,
    FOREIGN KEY(medias_id) REFERENCES medias(id) 
); 


CREATE TABLE IF NOT EXISTS experience (
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    company VARCHAR(150) NOT NULL,
    company_city VARCHAR(100),
    company_country VARCHAR(150),
    is_current_job BOOLEAN NOT NULL,
    ex_start_date DATE NOT NULL,
    ex_end_date DATE DEFAULT NULL,
    ex_description TEXT,
    job_type VARCHAR(100)
); 

CREATE TABLE IF NOT EXISTS projects (
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(200),
    p_description TEXT,
    activities TEXT,
    medias_id INTEGER NOT NULL,
    FOREIGN KEY(medias_id) REFERENCES medias(id) 
); 

CREATE TABLE IF NOT EXISTS contact (
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(150),
    link TEXT
);

CREATE TABLE IF NOT EXISTS persona(
    id SERIAL NOT NULL PRIMARY KEY,
    p_name VARCHAR(50) NOT NULL,
    birthday DATE NOT NULL,
    city VARCHAR(100),
    country VARCHAR(100),
    job VARCHAR(120),
    about TEXT, 
  	cpf TEXT NOT NULL UNIQUE,
    skills_id INTEGER,
    FOREIGN KEY(skills_id) REFERENCES skills(id), 	
    languages_id INTEGER,
    FOREIGN KEY(languages_id) REFERENCES languages(id), 	
    certificates_id INTEGER,
    FOREIGN KEY(certificates_id) REFERENCES certificates(id), 	
    academic_degrees_id INTEGER,
    FOREIGN KEY(academic_degrees_id) REFERENCES academic_degrees(id), 	
    experience_id INTEGER,
    FOREIGN KEY(experience_id) REFERENCES experience(id),
    projects_id INTEGER,
    FOREIGN KEY(projects_id) REFERENCES projects(id),
    contact_id INTEGER,
    FOREIGN KEY(contact_id) REFERENCES contact(id)   	
);

INSERT INTO contact (title, link)
VALUES
('email', 'teste@email.com');

INSERT INTO medias (link)
VALUES
('image-test.png');

INSERT INTO projects (title, p_description, activities, medias_id)
VALUES
('curriculum', 'site para praticar', 'praticando js', 1);

INSERT INTO experience (title, company, company_city, company_country, ex_start_date, ex_end_date, ex_description, job_type)
VALUES
('dev', 'empresa_x', 'campos', 'brazil','2020-05-22', '2022-08-20', 'desevenvolve', 'full');

INSERT INTO academic_degrees
(title, institution_name, institution_web_site, ad_start_date, ad_end_date,ad_description, medias_id)
VALUES
('dev', 'generic insit', 'generic-link.com', '2020-05-22', '2022-08-20', 'programming study', 1);

INSERT INTO certificates (title, link, company, issue_date, expiration_date, credential_key, credential_url)
VALUES
('certificate_ex', 'generic-company.com', 'company-x', '2020-05-22', '2022-08-20', 'aslufhdwe78fhdw', 'credential.com/aslufhdwe78fhdw');

INSERT INTO languages (title, fluency)
VALUES
('portuguese','native');

INSERT INTO skills (title)
VALUES
('js');

INSERT INTO admin_user (email, pass)
VALUES
('admin@email.com', 'pass124');

INSERT INTO persona (p_name, birthday, city, country, job, about, skills_id, languages_id, certificates_id, academic_degrees_id, experience_id, projects_id, contact_id)
VALUES
('persona-x', '1998-04-22', 'camposx', 'brazil', 'dev', 'junior developer', 1, 1, 1, 2, 1, 1, 1);