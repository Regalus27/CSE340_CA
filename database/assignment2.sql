-- 5.1
INSERT INTO account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- 5.2
UPDATE account
SET account_type = 'Admin'
WHERE account_id = 1;

--5.3
DELETE FROM account
WHERE account_id = 1;

--5.4
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'the small interiors', 'a huge interior')
WHERE inv_id = 10;

--5.5
SELECT
	classification_name AS Category,
	inv_make AS Make,
	inv_model AS Model
FROM classification
INNER JOIN inventory
	ON classification.classification_id = inventory.classification_id
	AND classification.classification_id = 2;

--5.6
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
	inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');