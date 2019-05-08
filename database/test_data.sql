
INSERT INTO "measurementuser" (id, username, email) VALUES (1, 'Test1', 'tester@test.fi');
INSERT INTO "measurementuser" (id, username, email) VALUES (2, 'Test2', 'tester2@test.fi');
INSERT INTO "measurementuser" (id, username, email) VALUES (3, 'Test3', 'tester3@test.fi');
INSERT INTO "measurementuser" (id, username, email) VALUES (4, 'Test4', 'tester4@test.fi');

INSERT INTO "team"
  (id, title, info)
VALUES
  (1, 'Testteam1', 'We want to share our measurements results');
INSERT INTO "team"
  (id, title, info)
VALUES
  (2, 'Testteam2', 'We want to share our mood results');


INSERT INTO "teammember" (id, is_admin, team_id, measurementuser_id) VALUES (1, true, 1, 1);
INSERT INTO "teammember" (id, is_admin, team_id, measurementuser_id) VALUES (2, true, 2, 2);
INSERT INTO "teammember" (id, is_admin, team_id, measurementuser_id) VALUES (3, false, 1, 3);
INSERT INTO "teammember" (id, is_admin, team_id, measurementuser_id) VALUES (4, false, 2, 4);


INSERT INTO "teaminvitation"
  (id, response, team_id, inviter_id, invited_id)
VALUES
  (1, '', 2, 2, 1);
INSERT INTO "teaminvitation"
  (id, response, team_id, inviter_id, invited_id)
VALUES
  (2, 'declined', 1, 1, 2);


INSERT INTO "measure"
  (measurementuser_id,id, name, type, low_limit, high_limit)
VALUES
  (-1, 1, 'Mood', 'slider', 0, 100 );
INSERT INTO "measure"
  (measurementuser_id,id, name, type, low_limit, high_limit)
VALUES
  (-1, 2, 'Energy', 'slider', 0, 100 );


INSERT INTO "teammeasure" (id, measure_id, team_id) VALUES (1, 1, 1);
INSERT INTO "teammeasure" (id, measure_id, team_id) VALUES (2, 2, 1);
INSERT INTO "teammeasure" (id, measure_id, team_id) VALUES (3, 1, 2);



INSERT INTO "measurement"
  (measurementuser_id,measure_id,stamp,val)
VALUES
  (1, 1, '2019-01-21 17:36:41', 89),
  (1, 1, '2019-01-31 21:16:51', 56),
  (1, 1, '2019-01-02 11:41:04', 39),
  (1, 1, '2019-01-13 18:44:35', 16),
  (1, 1, '2019-02-02 03:19:00', 17),
  (1, 1, '2019-01-16 14:12:01', 36),
  (1, 1, '2019-01-27 05:35:20', 56),
  (1, 1, '2019-01-23 17:00:08', 51),
  (1, 1, '2019-01-13 11:18:25', 74),
  (1, 1, '2019-01-23 08:41:23', 70);
INSERT INTO "measurement"
  (measurementuser_id,measure_id,stamp,val)
VALUES
  (1, 2, '2019-01-18 21:51:37', 49),
  (1, 2, '2019-01-24 14:50:35', 59),
  (1, 2, '2019-01-31 21:33:56', 45),
  (1, 2, '2019-02-24 03:34:37', 26),
  (1, 2, '2019-01-31 14:38:02', 48),
  (1, 2, '2019-02-04 02:32:43', 43),
  (1, 2, '2019-01-02 11:38:51', 88),
  (1, 2, '2019-02-02 15:11:01', 40),
  (1, 2, '2019-02-05 14:46:53', 76),
  (1, 2, '2019-01-21 02:40:22', 55);
INSERT INTO "measurement"
  (measurementuser_id,measure_id,stamp,val)
VALUES
  (1, 1, '2019-01-11 04:47:41', 47),
  (1, 1, '2019-02-04 09:04:49', 72),
  (1, 1, '2019-01-15 14:05:38', 84),
  (1, 1, '2019-01-10 11:28:57', 59),
  (1, 1, '2019-01-23 09:20:24', 41),
  (1, 1, '2019-01-07 11:04:37', 52),
  (1, 1, '2019-02-08 10:31:11', 34),
  (1, 1, '2019-01-12 21:03:00', 26),
  (1, 1, '2019-01-21 06:15:47', 97),
  (1, 1, '2019-02-25 03:59:05', 46);
INSERT INTO "measurement"
  (measurementuser_id,measure_id,stamp,val)
VALUES
  (1, 2, '2019-01-07 06:16:58', 57),
  (1, 2, '2019-02-24 00:32:24', 11),
  (1, 2, '2019-01-15 12:08:20', 36),
  (1, 2, '2019-01-23 15:57:18', 97),
  (1, 2, '2019-02-19 09:34:08', 27),
  (1, 2, '2019-01-20 04:07:32', 64),
  (1, 2, '2019-02-06 18:37:06', 67),
  (1, 2, '2019-02-11 10:21:39', 58),
  (1, 2, '2019-02-12 11:52:20', 63),
  (1, 2, '2019-02-04 05:25:32', 58);
INSERT INTO "measurement"
  (measurementuser_id,measure_id,stamp,val)
VALUES
  (1, 1, '2019-01-18 04:09:33', 38),
  (1, 1, '2019-01-22 13:54:40', 55),
  (1, 1, '2019-02-20 07:22:37', 54),
  (1, 1, '2019-02-06 08:13:51', 10),
  (1, 1, '2019-01-05 01:33:22', 0),
  (1, 1, '2019-02-23 07:59:51', 64),
  (1, 1, '2019-01-24 23:48:04', 57),
  (1, 1, '2019-02-06 06:31:24', 67),
  (1, 1, '2019-01-26 22:46:15', 99),
  (1, 1, '2019-02-08 18:06:36', 80);
INSERT INTO "measurement"
  (measurementuser_id,measure_id,stamp,val)
VALUES
  (1, 2, '2019-02-23 21:50:16', 34),
  (1, 2, '2019-02-21 19:02:31', 23),
  (1, 2, '2019-02-17 16:53:33', 19),
  (1, 2, '2019-01-05 12:42:51', 22),
  (1, 2, '2019-01-22 12:58:12', 63),
  (1, 2, '2019-02-10 17:18:40', 0),
  (1, 2, '2019-02-03 06:12:36', 38),
  (1, 2, '2019-02-23 15:11:26', 10),
  (1, 2, '2019-02-26 01:54:25', 71),
  (1, 2, '2019-01-11 23:40:32', 63);
INSERT INTO "measurement"
  (measurementuser_id,measure_id,stamp,val)
VALUES
  (1, 1, '2019-01-08 13:57:18', 87),
  (1, 1, '2019-02-19 13:29:10', 79),
  (1, 1, '2019-01-02 08:50:00', 81),
  (1, 1, '2019-01-23 22:35:47', 44),
  (1, 1, '2019-01-18 00:58:24', 48),
  (1, 1, '2019-01-23 20:36:14', 18),
  (1, 1, '2019-01-08 15:15:00', 70),
  (1, 1, '2019-01-03 04:13:25', 44),
  (1, 1, '2019-01-14 04:24:13', 11),
  (1, 1, '2019-02-09 12:04:49', 36);
INSERT INTO "measurement"
  (measurementuser_id,measure_id,stamp,val)
VALUES
  (1, 2, '2019-01-05 08:37:14', 58),
  (1, 2, '2019-01-27 11:01:22', 74),
  (1, 2, '2019-01-25 03:42:35', 55),
  (1, 2, '2019-02-13 20:47:41', 49),
  (1, 2, '2019-01-23 14:37:34', 71),
  (1, 2, '2019-01-10 03:06:17', 13),
  (1, 2, '2019-02-14 23:35:33', 50),
  (1, 2, '2019-02-13 22:10:45', 62),
  (1, 2, '2019-02-25 12:49:41', 24),
  (1, 2, '2019-01-09 10:34:34', 40);
INSERT INTO "measurement"
  (measurementuser_id,measure_id,stamp,val)
VALUES
  (1, 1, '2019-01-15 12:44:23', 41),
  (1, 1, '2019-01-16 20:18:03', 41),
  (1, 1, '2019-01-01 20:05:06', 85),
  (1, 1, '2019-02-16 04:21:30', 40),
  (1, 1, '2019-02-22 15:00:08', 36),
  (1, 1, '2019-02-09 08:36:42', 39),
  (1, 1, '2019-01-13 03:11:51', 73),
  (1, 1, '2019-01-08 21:55:10', 50),
  (1, 1, '2019-02-18 03:18:50', 86),
  (1, 1, '2019-01-12 07:53:23', 45);
INSERT INTO "measurement"
  (measurementuser_id,measure_id,stamp,val)
VALUES
  (1, 2, '2019-01-11 00:50:36', 55),
  (1, 2, '2019-01-19 06:43:57', 95),
  (1, 2, '2019-01-27 21:33:25', 53),
  (1, 2, '2019-01-22 05:04:30', 80),
  (1, 2, '2019-01-08 13:39:40', 89),
  (1, 2, '2019-02-03 12:39:53', 65),
  (1, 2, '2019-01-12 19:25:45', 54),
  (1, 2, '2019-01-12 20:08:10', 36),
  (1, 2, '2019-01-26 02:04:24', 65),
  (1, 2, '2019-01-02 04:50:25', 63);
