SET CHARACTER_SET_CLIENT = 'utf8mb4';
SET CHARACTER_SET_CONNECTION = 'utf8mb4';
SET CHARACTER_SET_DATABASE = 'utf8mb4';
SET CHARACTER_SET_RESULTS = 'utf8mb4';
SET CHARACTER_SET_SERVER = 'utf8mb4';
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS character_data (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  image VARCHAR(100) NOT NULL,
  age SMALLINT(2) NOT NULL,
  weight INT NOT NULL,
  history TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL,
  deleted_at TIMESTAMP NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB
DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS media_type (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB
DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS media (
  id INT NOT NULL AUTO_INCREMENT,
  id_media_type INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  image VARCHAR(100) NOT NULL,
  creationDate DATE NOT NULL,
  score DOUBLE(3, 2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL,
  deleted_at TIMESTAMP NULL,
  PRIMARY KEY (id),
  INDEX fk_media_media_type1_idx (id_media_type ASC),
  CONSTRAINT fk_media_media_type1 FOREIGN KEY (id_media_type) REFERENCES media_type (id) ON DELETE NO ACTION ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS media_character (
  media_id INT NOT NULL,
  character_id INT NOT NULL,
  PRIMARY KEY (media_id, character_id),
  INDEX fk_media_has_character_character1_idx (character_id ASC),
  INDEX fk_media_has_character_media1_idx (media_id ASC),
  CONSTRAINT fk_media_has_character_media1 FOREIGN KEY (media_id) REFERENCES media (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT fk_media_has_character_character1 FOREIGN KEY (character_id) REFERENCES character_data (id) ON DELETE NO ACTION ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS genre (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  image VARCHAR(100) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL,
  deleted_at TIMESTAMP NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB
DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS media_genre (
  media_id INT NOT NULL,
  genre_id INT NOT NULL,
  PRIMARY KEY (media_id, genre_id),
  INDEX fk_media_has_genre_genre1_idx (genre_id ASC),
  INDEX fk_media_has_genre_media1_idx (media_id ASC),
  CONSTRAINT fk_media_has_genre_media1 FOREIGN KEY (media_id) REFERENCES media (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT fk_media_has_genre_genre1 FOREIGN KEY (genre_id) REFERENCES genre (id) ON DELETE NO ACTION ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS user (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL,
  deleted_at TIMESTAMP NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX email_UNIQUE (email ASC))
ENGINE = InnoDB
DEFAULT CHARSET=utf8mb4;

ALTER TABLE character_data ADD INDEX idx_name (name);
ALTER TABLE character_data ADD INDEX idx_age (age);
ALTER TABLE character_data ADD INDEX idx_weight (weight);
ALTER TABLE character_data ADD FULLTEXT idx_history (history);

ALTER TABLE media ADD INDEX idx_title (title);
ALTER TABLE media ADD INDEX idx_creationDate (creationDate);

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO media_type (id, name) VALUES 
(1, 'Movie'),
(2, 'Serie');

INSERT INTO character_data (id, name, image, age, weight, history) VALUES
(1, 'Mickey Mouse', '1-mickey.png', 92, 10, 'The iconic cartoon character created by Walt Disney and Ub Iwerks.'),
(2, 'Minnie Mouse', '2-minnie.png', 92, 8, 'Animated character known for her sweet disposition and large head bows.'),
(3, 'Donald Duck', '3-donald.png', 86, 15, 'He is known for his fiery temper and humorous voice.'),
(4, 'Goofy', '4-goofy.png', 88, 25, 'A funny-animal cartoon character created in 1932.'),
(5, 'Pluto', '5-pluto.png', 90, 20, 'A very special dog with a strong sense of loyalty.'),
(6, 'Elsa', '6-elsa.png', 24, 55, 'Queen of Arendelle who has the power to control ice and snow.'),
(7, 'Anna', '7-anna.png', 21, 50, 'The fearless and optimistic princess of Arendelle.'),
(8, 'Olaf', '8-olaf.png', 5, 10, 'A friendly snowman who loves warm hugs.'),
(9, 'Simba', '9-simba.png', 15, 70, 'A lion who becomes king of the Pride Lands.'),
(10, 'Nala', '10-nala.png', 15, 65, 'A lioness who is Simbas childhood friend and later his queen.'),
(11, 'Woody', '11-woody.png', 50, 25, 'A cowboy doll that is profoundly loyal to his kid.'),
(12, 'Buzz Lightyear', '12-buzz.png', 25, 30, 'A space ranger action figure, part of the Toy Story universe.'),
(13, 'Ariel', '13-ariel.png', 16, 50, 'A young mermaid who is curious about the human world.'),
(14, 'Belle', '14-belle.png', 20, 55, 'Known for her love of books and her ability to see past appearances.'),
(15, 'Rapunzel', '15-rapunzel.png', 18, 48, 'Known for her long, magical hair.'),
(16, 'Cinderella', '16-cinderella.png', 19, 48, 'A kind-hearted young woman living in unfortunate circumstances.'),
(17, 'Aladdin', '17-aladdin.png', 20, 60, 'A former street rat who becomes a prince.'),
(18, 'Jasmine', '18-jasmine.png', 18, 50, 'A princess of Agrabah known for her beauty and strong will.'),
(19, 'Mulan', '19-mulan.png', 18, 55, 'A brave woman who disguised herself as a man to join the army.'),
(20, 'Pocahontas', '10-pocahontas.png', 20, 50, 'A Native American woman known for her association with a colonial settlement.');

INSERT INTO media (id, id_media_type, title, image, creationDate, score) VALUES
(1, 1, 'Frozen', '1-frozen.jpg', '2013-11-27', 3.8),
(2, 1, 'The Lion King', '2-lion_king.jpg', '1994-06-15', 4.5),
(3, 1, 'Toy Story', '3-toy_story.jpg', '1995-11-22', 4.3),
(4, 1, 'The Little Mermaid', '4-little_mermaid.jpg', '1989-11-17', 3.6),
(5, 1, 'Beauty and the Beast', '5-beauty_beast.jpg', '1991-11-22', 4.0),
(6, 1, 'Tangled', '6-tangled.jpg', '2010-11-24', 3.7),
(7, 1, 'Cinderella', '7-cinderella.jpg', '1950-03-04', 3.3),
(8, 1, 'Aladdin', '8-aladdin.jpg', '1992-11-25', 4.0),
(9, 1, 'Mulan', '9-mulan.jpg', '1998-06-19', 3.6),
(10, 1, 'Pocahontas', '10-pocahontas.jpg', '1995-06-23', 3.7),
(11, 2, 'Mickey Mouse Clubhouse', '11-mickey_clubhouse.jpg', '2006-05-05', 3.9),
(12, 2, 'DuckTales', '12-ducktales.jpg', '2017-08-12', 4.2),
(13, 2, 'The Adventures of the Gummi Bears', '13-gummi_bears.jpg', '1985-09-14', 3.5),
(14, 2, 'TaleSpin', '14-talespin.jpg', '1990-09-07', 3.6),
(15, 2, 'Darkwing Duck', '15-darkwing_duck.jpg', '1991-09-08', 3.9),
(16, 2, 'Goof Troop', '16-goof_troop.jpg', '1992-09-05', 3.8),
(17, 2, 'Recess', '17-recess.jpg', '1997-09-13', 2.9),
(18, 2, 'The Little Mermaid Series', '18-little_mermaid_series.jpg', '1992-09-11', 2.8),
(19, 2, 'Aladdin Series', '19-aladdin_series.jpg', '1994-09-05', 3.9),
(20, 2, 'Lilo & Stitch: The Series', '20-lilo_stitch_series.jpg', '2003-09-20', 2.7);

INSERT INTO media_character (media_id, character_id) VALUES
(1, 6), (1, 7), (1, 8), -- Frozen characters to Frozen movie
(2, 9), (2, 10), -- The Lion King characters to The Lion King movie
(3, 11), (3, 12), -- Toy Story characters to Toy Story movie
(4, 13), -- The Little Mermaid characters to The Little Mermaid movie
(5, 14), -- Beauty and the Beast characters to Beauty and the Beast movie
(6, 15), -- Tangled characters to Tangled movie
(7, 16), -- Cinderella characters to Cinderella movie
(8, 17), (8, 18), -- Aladdin characters to Aladdin movie
(9, 19), -- Mulan characters to Mulan movie
(10, 20), -- Pocahontas characters to Pocahontas movie
(11, 1), (11, 2), (11, 4), -- Mickey Mouse Clubhouse series
(12, 3), -- DuckTales series
(13, 3), -- The Adventures of the Gummi Bears series
(14, 3), -- TaleSpin series
(15, 3), -- Darkwing Duck series
(16, 4), -- Goof Troop series
(17, 4), -- Recess series
(18, 13), -- The Little Mermaid Series series
(19, 17), (19, 18), -- Aladdin Series series
(20, 13); -- Lilo & Stitch: The Series series

INSERT INTO genre (id, name, image) VALUES
(1, 'Animation', '1-animation.jpg'),
(2, 'Adventure', '2-adventure.jpg'),
(3, 'Family', '3-family.jpg'),
(4, 'Fantasy', '4-fantasy.jpg'),
(5, 'Action', '5-action.jpg'),
(6, 'Drama', '6-drama.jpg'),
(7, 'Comedy', '7-comedy.jpg'),
(8, 'Musical', '8-musical.jpg'),
(9, 'Romance', '9-romance.jpg'),
(10, 'Sci-Fi', '10-sci_fi.jpg');

INSERT INTO media_genre (media_id, genre_id) VALUES
(1, 1), (1, 3), (1, 4), -- Frozen: Animation, Family, Fantasy
(2, 1), (2, 2), (2, 3), -- The Lion King: Animation, Adventure, Family
(3, 1), (3, 3), (3, 7), -- Toy Story: Animation, Family, Comedy
(4, 1), (4, 4), (4, 8), -- The Little Mermaid: Animation, Fantasy, Musical
(5, 1), (5, 4), (5, 9), -- Beauty and the Beast: Animation, Fantasy, Romance
(6, 1), (6, 4), (6, 8), -- Tangled: Animation, Fantasy, Musical
(7, 1), (7, 8), -- Cinderella: Animation, Musical
(8, 1), (8, 2), (8, 8), -- Aladdin: Animation, Adventure, Musical
(9, 1), (9, 2), (9, 6), -- Mulan: Animation, Adventure, Drama
(10, 1), (10, 2), (10, 6), -- Pocahontas: Animation, Adventure, Drama
(11, 1), (11, 7), -- Mickey Mouse Clubhouse: Animation, Comedy
(12, 1), (12, 2), -- DuckTales: Animation, Adventure
(13, 1), (13, 2), -- The Adventures of the Gummi Bears: Animation, Adventure
(14, 1), (14, 2), -- TaleSpin: Animation, Adventure
(15, 1), (15, 7), -- Darkwing Duck: Animation, Comedy
(16, 1), (16, 7), -- Goof Troop: Animation, Comedy
(17, 1), (17, 7), -- Recess: Animation, Comedy
(18, 1), (18, 4), -- The Little Mermaid Series: Animation, Fantasy
(19, 1), (19, 2), -- Aladdin Series: Animation, Adventure
(20, 1), (20, 5); -- Lilo & Stitch: The Series: Animation, Sci-Fi
