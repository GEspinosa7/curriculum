CREATE DATABASE curriculum;

CREATE TABLE IF NOT EXISTS admin_user(
    id SERIAL NOT NULL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    pass TEXT NOT NULL
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
    institution VARCHAR(150),
    issue_date DATE,
    expiration_date DATE,
    credential_key TEXT,
    credential_url TEXT      
); 

CREATE TABLE IF NOT EXISTS medias (
    id SERIAL NOT NULL PRIMARY KEY,
    link TEXT NOT NULL,
    image_name VARCHAR(150) NOT NULL
); 

CREATE TABLE IF NOT EXISTS academic_degrees (
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(150),
    institution_name VARCHAR(150),
    institution_web_site TEXT DEFAULT NULL,
    ad_start_date DATE NOT NULL,
    ad_end_date DATE DEFAULT NULL,
    ad_description TEXT
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
    activities TEXT
); 

CREATE TABLE IF NOT EXISTS contacts (
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
  	cpf TEXT NOT NULL UNIQUE 	
);

CREATE TABLE IF NOT EXISTS persona_skills(
    id SERIAL NOT NULL PRIMARY KEY,
    skill_id INTEGER NOT NULL,
    FOREIGN KEY(skill_id) REFERENCES skills(id),
    persona_id INTEGER NOT NULL,
    FOREIGN KEY(persona_id) REFERENCES persona(id)
);

CREATE TABLE IF NOT EXISTS persona_languages (
    id SERIAL NOT NULL PRIMARY KEY,
    languages_id INTEGER NOT NULL,
    FOREIGN KEY(languages_id) REFERENCES languages(id),
    persona_id INTEGER NOT NULL,
    FOREIGN KEY(persona_id) REFERENCES persona(id)
); 

CREATE TABLE IF NOT EXISTS persona_certificates (
    id SERIAL NOT NULL PRIMARY KEY,
    certificates_id INTEGER NOT NULL,
    FOREIGN KEY(certificates_id) REFERENCES certificates(id),
    persona_id INTEGER NOT NULL,
    FOREIGN KEY(persona_id) REFERENCES persona(id)    
); 

CREATE TABLE IF NOT EXISTS persona_academic_degrees (
    id SERIAL NOT NULL PRIMARY KEY,
    academic_degrees_id INTEGER NOT NULL,
    FOREIGN KEY(academic_degrees_id) REFERENCES academic_degrees(id),
    persona_id INTEGER NOT NULL,
    FOREIGN KEY(persona_id) REFERENCES persona(id)   
); 


CREATE TABLE IF NOT EXISTS persona_experience (
    id SERIAL NOT NULL PRIMARY KEY,
    experience_id INTEGER NOT NULL,
    FOREIGN KEY(experience_id) REFERENCES experience(id),
    persona_id INTEGER NOT NULL,
    FOREIGN KEY(persona_id) REFERENCES persona(id)  
); 

CREATE TABLE IF NOT EXISTS persona_projects (
    id SERIAL NOT NULL PRIMARY KEY,
    projects_id INTEGER NOT NULL,
    FOREIGN KEY(projects_id) REFERENCES projects(id),
    persona_id INTEGER NOT NULL,
    FOREIGN KEY(persona_id) REFERENCES persona(id)  
); 

CREATE TABLE IF NOT EXISTS persona_contacts (
    id SERIAL NOT NULL PRIMARY KEY,
    contact_id INTEGER NOT NULL,
    FOREIGN KEY(contact_id) REFERENCES contact(id),
    persona_id INTEGER NOT NULL,
    FOREIGN KEY(persona_id) REFERENCES persona(id)  
);

CREATE TABLE IF NOT EXISTS projects_medias (
    id SERIAL NOT NULL PRIMARY KEY,
    medias_id INTEGER NOT NULL,
    FOREIGN KEY(medias_id) REFERENCES medias(id),
    projects_id INTEGER NOT NULL,
    FOREIGN KEY(projects_id) REFERENCES projects(id)  
);

CREATE TABLE IF NOT EXISTS academic_degrees_medias (
    id SERIAL NOT NULL PRIMARY KEY,
    medias_id INTEGER NOT NULL,
    FOREIGN KEY(medias_id) REFERENCES medias(id),
    academic_degrees_id INTEGER NOT NULL,
    FOREIGN KEY(academic_degrees_id) REFERENCES academic_degrees(id)  
);