INSERT INTO User (firstName, lastName, isActive, loginId, password, createdAt, updatedAt)
VALUES (
           'your_first_name',
           'your_last_name',
           true, -- 혹은 1로 대체 (1은 true, 0은 false)
           'test',
           '1234',
           NOW(), -- 현재 날짜와 시간
           NOW()  -- 현재 날짜와 시간
       );
