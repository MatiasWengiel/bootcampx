const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryTeachers =  `SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM assistance_requests
JOIN students ON students.id = student_id
JOIN teachers ON teachers.id = teacher_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
ORDER BY teacher;`;

const cohortName = process.argv[2]  || 'JUL02';
const values = [`%${cohortName}%`];
pool.query(queryTeachers, values)
  .then(result => {
    result.rows.forEach(row => {
      console.log(`${row.cohort}: ${row.teacher}`);
    });
  })
  .catch(err => console.error('query error', err.stack)
  );