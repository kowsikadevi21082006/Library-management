-- =========================================
-- QUERY 1
-- Get all books that have never been borrowed
-- =========================================

SELECT 
    b.book_name,
    b.author
FROM Book b
LEFT JOIN Issuance i
ON b.id = i.book_id
WHERE i.book_id IS NULL;



-- =========================================
-- QUERY 2
-- List outstanding books
-- =========================================

SELECT
    m.name,
    b.book_name,
    i.issued_date,
    i.target_return_date,
    b.author
FROM Issuance i
JOIN Member m
ON i.member_id = m.id
JOIN Book b
ON i.book_id = b.id
WHERE i.returned = false;



-- =========================================
-- QUERY 3
-- Top 10 most borrowed books
-- =========================================

SELECT
    b.book_name,
    COUNT(i.id) AS times_borrowed,
    COUNT(DISTINCT i.member_id) AS members_borrowed
FROM Issuance i
JOIN Book b
ON i.book_id = b.id
GROUP BY b.book_name
ORDER BY times_borrowed DESC
LIMIT 10;