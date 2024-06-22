-- users.sql
INSERT INTO "user" (user_name, user_email, user_phone) VALUES
('Alice', 'alice@example.com', '1234567890'),
('Bob', 'bob@example.com', '0987654321'),
('Charlie', 'charlie@example.com', '1122334455');

-- rooms.sql
INSERT INTO room (room_name, room_description, total_rows, total_columns) VALUES
('Sala A', 'Sala de conferencias', 5, 5),
('Sala B', 'Sala de reuniones', 3, 3);

-- workspaces.sql
INSERT INTO workspace (room_id, "row", "column", workspace_status) VALUES
(1, '1', '1', 'available'),
(1, '1', '2', 'available'),
(1, '1', '3', 'occupied'),
(1, '1', '4', 'available'),
(1, '1', '5', 'occupied'),
(2, '1', '1', 'available'),
(2, '1', '2', 'occupied'),
(2, '1', '3', 'available');

-- sessions.sql
INSERT INTO "session" (room_id, start_time, duration, session_description) VALUES
(1, '2024-06-21 09:00:00', '1 hour', 'Morning Session'),
(2, '2024-06-21 14:00:00', '2 hours', 'Afternoon Session');

-- reservations.sql
INSERT INTO reservation (user_id, workspace_id, session_id, reservation_status) VALUES
(1, 3, 1, 'confirmed'),
(2, 5, 1, 'confirmed'),
(2, 7, 2, 'confirmed');
